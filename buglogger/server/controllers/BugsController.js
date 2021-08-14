import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.getById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // do not trust the client
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    delete req.body.closed
    req.body.creatorId = req.userInfo.id
    try {
      const bug = await bugsService.update(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
