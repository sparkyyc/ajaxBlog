const express = require('express')
const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
    knex('post')
        .then((rows) => {
            res.json(rows)
        })
        .catch((err) => {
            next(err)
        })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
    knex('post')
        .where('id', req.params.id)
        .then((rows) => {
            res.json(rows)
        })
        .catch((err) => {
            next(err)
        })
})
// CREATE ONE record for this table
router.post('/', (req, res, next) => {
    knex('post')
        .insert({
            "title": req.body.title,
            "content": req.body.content
        })
        .returning('*')
        .then((data) => {
            res.json(data[0])
        })
        .catch((err) => {
            next(err)
        })
})
// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
    knex('post')
        .where('id', req.params.id)
        .then((data) => {
            if (data.length > 0) {
                let record = data[0]
                if (req.body.title) record.title = req.body.title
                if (req.body.content) record.content = req.body.content

                knex('post')
                    .update(record)
                    .where('id', req.params.id)
                    .returning('*')
                    .then((update) => {
                        res.json(update)
                    })
            } else {
                throw new Error ('Post not found')
            }
        })
        .catch((err) => {
            next(err)
        })
})
// DELETE ONE record for this table
router.delete('/:id', function(req, res, next) {
    knex('post')
      .where('id', req.params.id)
      .first()
      .then((row) => {
        if(!row) return next()
        knex('post')
          .del()
          .where('id', req.params.id)
          .then(() => {
            res.send(`ID ${req.params.id} Deleted`)
          })
      })
      .catch((err) => {
        next(err)
      })
  })
module.exports = router