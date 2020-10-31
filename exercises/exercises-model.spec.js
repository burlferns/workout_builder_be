/* eslint-disable no-undef */
const db = require('../data/db-config');
const Exercises = require('./exercises-model');
const {seedForTests} = require('../seed_for_tests.js');


describe('exercises model', () => {  
  beforeAll(seedForTests);

  test('add a exercise into the db', async () => {
    let exerciseArray;
    exerciseArray = await db('exercises');
    expect(exerciseArray).toHaveLength(7);
    await Exercises.addExercise({name:'pull ups', coach_id: 1});
    exerciseArray = await db('exercises');
    expect(exerciseArray).toHaveLength(8);
  });

  test('find exercise by id', async () => {
    let exerciseObtained = await Exercises.getExerciseById(8);
    expect(exerciseObtained.name).toBe('pull ups');
  });

  test('find all exercises for that coach', async () => {
    await Exercises.addExercise({name:'push ups',coach_id: 1});
    let exerciseObtained = await Exercises.getExercises(1);
    expect(exerciseObtained).not.toBe(undefined);
  });

  test('delete a exercise into the db', async () => {
    let exerciseArray;
    exerciseArray = await db('exercises');
    expect(exerciseArray).toHaveLength(9);
    await Exercises.deleteExercise(2);
    exerciseArray = await db('exercises');
    expect(exerciseArray).toHaveLength(8);
  });

  test('update a exercise into the db', async () => {
    await Exercises.updateExercise(1, {name:'sit ups',coach_id: 1});
    let exerciseObj = await Exercises.getExerciseById(1);
    expect(exerciseObj.name).toBe('sit ups');
  });  
});