'use strict'

const Schema = use('Schema')

class RestaurantsTableSchema extends Schema {

  up () {
    this.createTable('restaurants', (table) => {
      table.increments('id');
      table.string('name');
      table.string('category');
      table.string('address');

      table.integer('wait_time');
      table.integer('flair');
      table.integer('price_level');

      table.boolean('take_out');
      table.boolean('formal');

      table.timestamps();
    });
  }

  down () {
    this.dropTable('restaurants');
  }
}

module.exports = RestaurantsTableSchema
