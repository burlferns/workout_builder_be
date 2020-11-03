/* eslint-disable no-undef */
const db = require('../data/db-config');
const Clients = require('./clients-model');
const {seedForTests} = require('../seed_for_tests.js');

describe('Clients model', () => {
  
  beforeAll(seedForTests);
    
  it('add a client into the db', async () => {
    let clientArray;
    clientArray = await db('clients');
    expect(clientArray).toHaveLength(9);
    await Clients.addClient({
      first_name:'client', 
      last_name:'dude',
      email: 'client@mail.com',
      coach_id: 1
    });
    clientArray = await db('clients');
    expect(clientArray).toHaveLength(10);
  });

  it('find client by id', async () => {
    let clientObtained = await Clients.getClientById(1);
    expect(clientObtained.email).toBe('clienta@mail.com');
    expect(clientObtained.first_name).toBe('clientFirstA');
  });

  it('find all clients for that coach', async () => {
    await Clients.addClient({
      first_name:'client2', 
      last_name:'dude2',
      email: 'client2@mail.com',
      coach_id: 1
    });
    let clientObtained = await Clients.getClients(1);
    expect(clientObtained).not.toBe(undefined);
  });

  it('delete a client in the db', async () => {
    let clientArray;
    clientArray = await db('clients');
    expect(clientArray).toHaveLength(11);
    await Clients.deleteClient(2);
    clientArray = await db('clients');
    expect(clientArray).toHaveLength(10);
  });

  it('update a client in the db', async () => {
    // let clientArray;
    // clientArray = await db('clients');

    await Clients.updateClient(3, {
      first_name:'joe', 
      last_name:'bob',
      email: 'joebob@mail.com',
      coach_id: 1
    });
    let clientGot = await Clients.getClientById(3);
    expect(clientGot.first_name).toBe('joe');
  });

  //This is to enable Jest to exit properly
  afterAll( (done) =>{
    db.destroy(done);
  })


});