const MailModels = require('../models/Mail')

const controller = {}

controller.send = async (req, res) => {
  const mail = new MailModels(req.body)
  try {
    await mail.send(req)
    return res.json({
      status: 'OK'
    })
  } catch (e) {
    res.status(500).json({
      status: 'Fail',
      messageError: e
    })
  }
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
