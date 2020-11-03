/* eslint-disable no-undef */
const db = require('../data/db-config');
const Coaches = require('./coaches-model');


describe ('coaches model', () => {
  beforeAll(async () => {
    await db('coaches').truncate();
  });

  
  it('add a coach into the db', async () => {
    let coachesArray;
    coachesArray = await db('coaches');
    expect(coachesArray).toHaveLength(0);
    await Coaches.addCoach({email: 'test@mail.com', password:'Hello'});
    coachesArray = await db('coaches');
    expect(coachesArray).toHaveLength(1);
  });

  it('find a coach by email', async () => {
    let coachObtained = await Coaches.findCoachBy('test@mail.com');
    expect(coachObtained.password).toBe('Hello');
  });

  it('find coach by id', async () => {
    let coachObtained = await Coaches.getCoachById(1);
    expect(coachObtained.email).toBe('test@mail.com');
    expect(coachObtained.password).toBe('Hello');
  });
  
  //This is to enable Jest to exit properly
  afterAll( (done) =>{
    db.destroy(done);
  })


});