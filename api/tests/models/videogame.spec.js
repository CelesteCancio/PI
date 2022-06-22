const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      // it('should throw an error if name is null', (done) => {
      //   Videogame.create({})
      //     .then(() => done(new Error('It requires a valid name')))
      //     .catch(() => done());
      // });
      it('should work when its a valid name, description and platforms', () => {
        Videogame.create({ 
          name: 'Cars',
          description: 'A game about cars',
          platforms:'I do not know what goes here' });
      });
      it('should should not create a videogame if name is not sent', (done) => {
        Videogame.create({
          description: 'A game about cars',
          platforms:'I do not know what goes here'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should should not create a videogame if description is not sent', (done) => {
        Videogame.create({
          name: 'Cars race',
          platforms:'I do not know what goes here'})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should should not create a videogame if platforms is not sent', (done) => {
        Videogame.create({
          name: 'Cars race',
          description: 'A game about cars'})
          .then(() => done(new Error('It requires a valid platform')))
          .catch(() => done());
      });
    });
  });
});
