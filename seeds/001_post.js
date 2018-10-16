exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function() {
      // Inserts seed entries
      return knex('post').insert([
        {id: 1, title: 'My first blog post', content: 'Hello My name is Christa'},
        {id: 2, title: 'Second', content: 'Christa wuz hurr'},
        {id: 3, title: 'Third', content: 'whateva whateva'}
      ])
      .then(function() {
        // Moves id column (PK) auto-incrementer to correct value after inserts
        return knex.raw("SELECT setval('post_id_seq', (SELECT MAX(id) FROM post))")
      })
    })
}