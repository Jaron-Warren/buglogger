import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs/')
      // logger.log(res.data)
      AppState.bugs = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async getById(id) {
    try {
      const res = await api.get(`api/bugs/${id}`)
      logger.log(res.data)
      AppState.activeBug = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async create(bug) {
    try {
      const res = await api.post('api/bugs', bug)
      // logger.log(res.data)
      AppState.bugs = [...AppState.bugs, res.data]
      return res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async editbug(bug, id) {
    try {
      const res = await api.put(`api/bugs/${id}`, bug)
      logger.log(res.data)
      AppState.activeBug = res.data
    } catch (err) {
      Pop.toast(err)
    }
  }

  async close(id) {
    try {
      await api.delete(`api/bugs/${id}`)
      AppState.activeBug.closed = true
    } catch (error) {
      Pop.toast(error)
    }
  }
}
export const bugsService = new BugsService()
