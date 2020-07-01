const path = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const mime = require('mime')

router.get('/download', (req, res) => {
  const staticPath = process.env.NODE_ENV !== 'production' ? 'static' : '.nuxt/dist/client'
  const docs = path.resolve(`${staticPath}/img/docs/pdf`)

  const file = docs + '/docs-pdf.rar'

  const filename = path.basename(file)
  const mimetype = mime.getType(file)

  res.setHeader('Content-disposition', 'attachment; filename=' + filename)
  res.setHeader('Content-type', mimetype)

  const filestream = fs.createReadStream(file)
  filestream.pipe(res)
})
module.exports = router
