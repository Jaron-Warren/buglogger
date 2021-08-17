import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class NotesService {
  async getById(id) {
    try {
      const res = await api.get(`api/bugs/${id}/notes`)
      logger.log(res.data)
      AppState.notes = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async create(note) {
    try {
      const res = await api.post('api/notes', note)
      logger.log(res.data)
      AppState.notes = [...AppState.notes, res.data]
    } catch (error) {
      Pop.toast(error)
    }
  }

  async destroy(id) {
    try {
      const res = await api.delete(`api/notes/${id}`)
      // logger.log(res.data)
      AppState.notes = AppState.notes.filter(n => n.id !== id)
    } catch (error) {
      Pop.toast(error)
    }
  }
}
export const notesService = new NotesService()
