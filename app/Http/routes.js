'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');
const fetch = require('node-fetch');

// Route.on('/').render('welcome');

// async function(request, response) {
//   const res = await fetch('http://swapi.co/people/1');
//   const luke = await res.json();
//
//   console.log(luke);
// }

Route.get('/', function * (request, response) {
  const res = yield fetch('http://swapi.co/api/people/1');
  const luke = yield res.json();

  response.json(luke);
});

// lookup and use an already configured version of the database
const Database = use('Database');

// create a route listener for future 'get' requests and then
// run this function
Route.get('/restaurants', function * (request, response) {

  const items = yield Database.select().from('restaurants');
  response.send(items);
});

Route.get('/restaurants/:id', function * (request, response) {
  const id = request.param('id');

  const r = yield Database.select().from('restaurants')
    .where({ id: id })
    .limit(1)
    // this gets the first item from the result (so we don't get the array)
    .first();

    if(r === undefined) {
      return response.status(404).send({
        error: 'Not Found'
      });
    }
  response.send(r);
});

Route.post('/restaurants', function * (request, response) {
  const restaurant = {
    name: request.input('name'),
    category: request.input('category'),
    wait_time: request.input('wait_time'),
    take_out: request.input('take_out'),
    formal: request.input('formal'),
    address: request.input('address'),
    flair: request.input('flair'),
    price_level: request.input('price_level'),
  }
  yield Database.insert(restaurant).into('restaurants');
  response.send(restaurant);
});

Route.put('/restaurants/:id', function * (request, response) {
  const id = request.param('id');

  const r = yield Database.select().from('restaurants')
    .where({ id: id })
    .limit(1)
    // this gets the first item from the result (so we don't get the array)
    .first();

    if(r === undefined) {
      return response.status(404).send({
        error: 'Not Found'
      });
    }

    const input = request.only('name', 'category', 'wait_time', 'take_out', 'formal', 'address', 'flair', 'price_level');

    yield Database.table('restaurants').update(input);

    response.send({ input });

});
