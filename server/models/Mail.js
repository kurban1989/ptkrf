const { mailer, testMailer } = require('../mailer')
const letter = require('../letters/templateMail')

class Mail {
  constructor (structur) {
    this.mailStructur = structur
  }

  async send (req) {
    // Шаблон письма
    const message = letter.getLetterToOwner(req.body.formCargo)
    const messageCustomer = letter.getLetterForCustomer(req.body.formCargo)
    try {
      await mailer(message)
      await mailer(messageCustomer)
    } catch (err) {
      await testMailer()
      console.error(err, '================')
      throw new Error(err)
    }
  }
}

module.exports = Mail
