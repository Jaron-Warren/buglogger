import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugService {
  async getAll() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async update(body) {
    const bug = await dbContext.Bugs.findById(body.id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    // NOTE checks that the person requesting the object is the one who made it
    if (bug.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your bug entry!')
    }
    const afterUpdate = await dbContext.Bugs.findByIdAndUpdate(body.id, body, {})
    return afterUpdate
  }
}

export const bugsService = new BugService()
