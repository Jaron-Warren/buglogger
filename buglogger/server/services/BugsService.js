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

  async getNotesById(id) {
    const notes = await dbContext.Notes.find({ id: id }).populate('creator', 'bug')
    return notes
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator')
  }

  async edit(body) {
    const bug = await dbContext.Bugs.findById(body.id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    if (bug.closed === true) {
      throw new Forbidden('This bug entry is closed!')
    }
    // NOTE checks that the person requesting the object is the one who made it
    if (bug.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your bug entry!')
    }
    const afterUpdate = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true }).populate('creator')
    return afterUpdate
  }

  async close(id, userId) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    // NOTE checks that the person requesting the object is the one who made it
    if (bug.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your bug entry!')
    }
    bug.closed = true
    const afterUpdate = await dbContext.Bugs.findByIdAndUpdate(id, bug, { new: true })
    return afterUpdate
  }
}

export const bugsService = new BugService()
