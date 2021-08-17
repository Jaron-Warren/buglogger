import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await note.populate('creator', 'name picture').execPopulate()
  }

  async destroy(id, userId) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    // NOTE checks that the person requesting the object is the one who made it
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your note entry!')
    }
    const afterUpdate = await dbContext.Notes.findByIdAndDelete(id)
    return afterUpdate
  }
}

export const notesService = new NotesService()
