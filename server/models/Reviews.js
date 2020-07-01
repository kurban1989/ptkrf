const uuidv4 = require('uuid/v4')
const db = require('../mysql_models')
const { mailer, testMailer } = require('../mailer')
const letter = require('../letters/templateMail')

class Reviews {
  constructor (review) {
    this.review = review
  }

  async save () {
    if (this.review.uid) {
      const resDB = await this.getByUid(this.review.uid)
      await db.updateData('reviews', this.review, resDB.id)
    } else {
      this.review.uid = uuidv4()
      await db.setData('reviews', this.review)

      try {
        await mailer(letter.letterConfirm(this.review))
      } catch (err) {
        await testMailer()
        throw new Error(err)
      }
    }
  }

  async getAll (start, limit) {
    const S = parseInt(start, 10)
    const L = parseInt(limit, 10)
    // const where = query && query.visible && query.visible === 'only' ? ' WHERE visible="1"' : ''
    const where = ' WHERE visible="1"'
    const resDB = await db.getQuery(`SELECT * FROM reviews${where} order by id desc limit ${!isNaN(S) ? S : 0}, ${!isNaN(L) ? L : 10};`)
    // const resDB = await db.getQuery(`SELECT * FROM reviews order by id desc limit ${!isNaN(S) ? S : 0}, ${!isNaN(L) ? L : 10};`)
    return resDB
  }

  async getByUid (uid) {
    const resDB = await db.getQuerySafe('reviews', 'uid', uid, 'likeAllFields')
    return resDB[0]
  }

  async totalRows () {
    const total = await db.getQuery('SELECT COUNT(1) FROM reviews')
    return total
  }
}

module.exports = Reviews
