/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('server is up check', () => {
  test('should return a 200', () => {
    return request(server)
      .get('/')
      .then(res=> {
        expect(res.status).toBe(200);
        expect(res.body.server).toBe('server is up');
      });
  });


  //This afterAll is just there to access the database at the end so that 
  //Jest does not end up with an open handle that prevents it from exiting
  //The --detectOpenHandles CLI option detects this.
  //Don't know why you need to access the database at the end to prevent this
  //situation and I don't think it matters what you access in the database 
  //The problem of open handles seems to occur when running the router tests
  //that don't access the database directly
  afterAll(async () => {
    await db('exercises').where({coach_id:1000});
  });
});

