const {Test} = require('../models/models')
const ApiError = require('../error/ApiError')


class TestController {
  async create(req, res, next) {
    try {
      const {title, OS} = req.body
      const Testvar = await Test.create({title, OS})

      return res.json(Testvar)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }
  async getAll(req, res) {
    const Testvar = await Test.findAll()
    const stat = await Test.getAttributes().OS.values

    return (res.json(Testvar)
    )
  }

  async change(req, res, next) {
    const {id, title, OS} = req.body
    try {
      const Testvar = await Test.update({
        id: id,
        title: title,
        OS: OS
      },
        {
          where: {id: id}
        }
      ).then((res) => {
        console.log(res);
      })
      return (res.json(res)
      )
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }
  }

  async getOne(req, res) {
    const {id} = req.params
    const Testvar = await Test.findOne(
      {
        where: {id}
      }
    )
    return res.json(Testvar)
  }
}

module.exports = new TestController()