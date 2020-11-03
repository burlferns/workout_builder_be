const db = require('../data/db-config');

module.exports = {
  getWorkoutById,
  addWorkout,
  deleteWorkout,
  getExercisesInWorkout,
  addExercisesToWorkout,
  getWorkoutByProgramId,
  getExercisesByWorkoutId
};


// The arg id is an array of ids
function getWorkoutById(id) {
  return db('workouts')
    .whereIn('id', id);
}

// The arg program_id is an integer
function getWorkoutByProgramId(program_id) {
  return db('workouts')
    .where({program_id})
    .select('id', 'name', 'description', 'day');
}

// The arg workout is one workout object
function addWorkout(workouts) {
  return db('workouts') //This is correct code - keep in final version of program
  //return db('workoutsBAD') //Bad code for test - comment out in final version of program
    .insert(workouts, 'id')
    .then(ids => {
      return getWorkoutById(ids);
    });
}


// The arg id is an integer
function deleteWorkout(id) {
  let deletedWorkout = {};
  return db('workouts')
    .where({ id })
    .first()
    .then(workout => {
      deletedWorkout = workout;
      return db('workouts')
        .where('id', id)
        .del();
    })
    .then(count => {
      if (count > 0) {
        return deletedWorkout;
      }
    });
}

//JSON body should be an array; each element in the array is { exercise_id, workout_id }
function getExercisesInWorkout(exerciseWorkout) {
  const exer_wrko = exerciseWorkout.map(el=>[el.exercise_id, el.workout_id]);
  return db('exercises_workouts')
    .whereIn(['exercise_id', 'workout_id'], exer_wrko);
}


// The arg workout_id is an integer
function getExercisesByWorkoutId(workout_id) {
  return db('exercises_workouts')
    .where({workout_id}) // This is the correct line of code to use
    // .where('workout_idAAA', workout_id) // This is code used for testing error handling should be commented out
    .select('exercise_id','order','exercise_details');
}

//JSON body should be an array; each element in the array is { exercise_id, workout_id, order, exercise_details }
function addExercisesToWorkout(exerciseWorkout) {
  return db('exercises_workouts') //This is correct code - keep in final version of program
  //return db('exercises_workoutsBAD') //Bad code for test - comment out in final version of program
    .insert(exerciseWorkout)
    .then(() => {
      return getExercisesInWorkout(exerciseWorkout);
    });
}
