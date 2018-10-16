exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', function(table) {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments()
      table.string('title', 255).notNullable().defaultTo('')
      table.text('content').notNullable().defaultTo('')
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('post')
  }
