/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('../data/db-config');
const Workouts = require('./workouts-model');
const {seedForTests} = require('../seed_for_tests.spec');

describe('workouts model', () => {
  beforeAll( async ()=>{
    await seedForTests();
  });

  describe('add workout', () => {
    it('add a workout into the db', async () => {
      let workoutArray;
      workoutArray = await db('workouts');
      expect(workoutArray).toHaveLength(4);
      await Workouts.addWorkout({name:'chest and back', description:'lots of push ups and pull ups',day: 1,coach_id: 1, program_id:1});
      workoutArray = await db('workouts');

      expect(workoutArray).toHaveLength(5);

    });
  });
  describe('find workouts by id', () => {
    it('find workouts by id', async () => {
      let workoutArray = await Workouts.getWorkoutById([5]);

      expect(workoutArray).toMatchObject([{ id: 5,
        name: 'chest and back',
        description: 'lots of push ups and pull ups',
        day: 1,
        coach_id: 1,
        program_id: 1 }]);
    });
  });
  describe('find all workouts for that Program ID', () => {
    it('find all workouts for that Program ID', async () => {

      let workoutsObtained = await Workouts.getWorkoutByProgramId(1);

      expect(workoutsObtained).not.toBe(undefined);
    });
  });
  
  describe('delete workout', () => {
    it('delete a workouts into the db', async () => {
      let workoutsArray;
      workoutsArray = await db('workouts');
      expect(workoutsArray).toHaveLength(5);
      await Workouts.deleteWorkout(5);
      workoutsArray = await db('workouts');
      expect(workoutsArray).toHaveLength(4);
    });
  });

  test('get exercise_workout record by workout id', async ()=>{
    const receivedData = await Workouts.getExercisesByWorkoutId(1);
    expect(receivedData).toEqual([
      { exercise_id: 4, order: 1, exercise_details: 'ex details1' },
      { exercise_id: 3, order: 2, exercise_details: 'ex details2' }
    ]);
  });


  


});