const Reviews = require('../models/Reviews')

const controller = {}

controller.saveRev = async (req, res) => {
  const review = new Reviews(req.body)
  await review.save()
  return res.json({
    status: 'OK'
  })
}

controller.getAll = async (req, res) => {
  const review = new Reviews()

  return res.json({
    status: 'OK',
    data: await review.getAll(req.params.start, req.params.limit),
    total: await review.totalRows()
  })
}

module.exports = (method) => {
  return async (request, response, next) => {
    try {
      await controller[method](request, response, next)
    } catch (error) {
      next(error)
    }
  }
}
