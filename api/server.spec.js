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

  
  //This is to enable Jest to exit properly
  afterAll(function (done) {
    server.close(done);
  });

  //This is to enable Jest to exit properly
  afterAll( (done) =>{
    db.destroy(done);
  })

  
});

