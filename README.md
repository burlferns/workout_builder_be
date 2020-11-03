# API Documentation

#### Backend delpoyed at [Heroku](https://labs20-workout-builder.herokuapp.com) <br>


## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Node.js with Express & Knex

- Powerful performance
- Ease of coding with JavaScript
- Perfect for scalable network applications
- Express is commonly considered the standard framework for the majority of Node.js applications
- Knex is simple and optimal for server/database interaction




Table of contents
=================

  
   * [Table of contents](#table-of-contents)
  
   * [Endpoints](#usage)
      * [Authentication Routes](#Authentication-Routes)
      * [Client Routes](#client-routes)
      * [Client-Program Routes](#client-program-routes)
      * [Exercise Routes](#exercise-routes)
      * [Program Routes](#program-routes)
      
   * [Data Models](#data-model)
   * [Actions](#actions)
   * [Environment Variables](#Environment-Variables)






## Endpoints
---

### Authentication Routes

* [Register a user](#Register-a-user)
* [Login a user](#Login-a-user)

### [Return to table of contents](#table-of-contents)
----
#### _Register a user_
 [Back to Authentication Routes List](#Authentication-Routes)
* **Method**

  `POST`

* **Endpoint**

  `/auth/register`

* **Data Params**

    ```
    {
      first_name: [string]
      last_name: [string]
      email: [string]
      password: [string]
    }
    ```

* **Success Response**
    * **Code:** 201

      **Content:** 
      ```
      { 
        token: [jwt],
        message: 'Logged In',
        first_name: [first name],
        last_name: [last name]
      }
      ```

* **Error Response**

    * **Code:** 400

    * **Reason:** Registration was done previously with email supplied, so cannot register again

----
#### _Login a user_
 [Back to Authentication Routes List](#Authentication-Routes)
* **Method**

  `POST`

* **Endpoint**

  `/auth/login`

* **Data Params**

    ```
    {
      email: [string]
      password: [string]
    }
    ```

* **Success Response**

    * **Code:** 200

      **Content:** 
      ```
      { 
        token: [jwt],
        message: 'Logged In',
        first_name: [first name],
        last_name: [last name]
      }
      ```

* **Error Response**
    * **Code:** 401

    * **Reason:** Incorrect email or password supplied, so cannot login

---

### Client Routes
* [Get all clients for a coach](#Get-all-clients-for-a-coach)
* [Get a specific client](#Get-a-specific-client)
* [Create a client](#Create-a-client)
* [Modify a client](#Modify-a-client)
* [Delete a client](#Delete-a-client)

### [Return to table of contents](#table-of-contents)

#### _Get all clients for a coach_
[Back to Client Routes List](#client-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
          "id": 1,
          "first_name": "clientFirstA",
          "last_name": "clientLastA",
          "email": "ca@mail.com",
          "coach_id": 1
        },
        {
          "id": 2,
          "first_name": "clientFirstB",
          "last_name": "clientLastB",
          "email": "cb@mail.com",
          "coach_id": 1
        },
        {
          "id": 5,
          "first_name": "clientFirstE",
          "last_name": "clientLastE",
          "email": "ce@mail.com",
          "coach_id": 1
        }
      ]
      ```

* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token

----
#### _Get a specific client_
[Back to Client Routes List](#client-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  
  The param id is the client_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 1,
        "first_name": "clientFirstA",
        "last_name": "clientLastA",
        "email": "ca@mail.com",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, invalid client_id, coach_id not associated with client_id

----

#### _Create a client_
[Back to Client Routes List](#client-routes)

* **Method**

  `POST`

* **Endpoint**

  `/clients`

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "first_name": "clientFirstD",
      "last_name": "clientLastD",
      "email": "cd@mail.com"
    }
    ```

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "clientFirstD",
        "last_name": "clientLastD",
        "email": "cd@mail.com",
        "coach_id": 1
      }
      ```
      
* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token, missing request body, bad/missing body keys, client email already in use

----

#### _Modify a client_
[Back to Client Routes List](#client-routes)

* **Method**

  `PUT`

* **Endpoint**

  `/clients/:id`

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "first_name": "new_first",
      "last_name": "new_last",
      "email": "newclient@mail.com"
    }
    ```

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the client_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "new_first",
        "last_name": "new_last",
        "email": "newclient@mail.com",
        "coach_id": 1
      }
      ```
      
      
* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, missing request body, bad/missing body keys, client email already in use, coach_id not associated with client_id  

----

#### _Delete a client_
[Back to Client Routes List](#client-routes)

* **Method**

  `DELETE`

* **Endpoint**

  `/clients/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the client_id that will be deleted.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 5,
        "first_name": "new_first",
        "last_name": "new_last",
        "email": "newclient@mail.com",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, invalid client_id, coach_id not associated with client_id 

----

### Client-Program Routes
* [Get a coach's dashboard information](#Get-dashboard-information-for-a-coach)
* [Add clients to a program](#Add-clients-to-a-program)
* [Delete a client from a program](#Delete-a-client-from-a-program)

### [Return to table of contents](#table-of-contents)

#### _Get dashboard information for a coach_

[Back to Client-Program Routes List](#client-program-routes)

* **Method**

  `GET`

* **Endpoint**

  `/clients-programs/dashboard`

* **Notes**

  ```
  This will provide a coach's list of clients on active programs, including program details.

  The token must be sent along with the request (it has the coach_id). 
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            "client_id": 1,
            "first_name": "clientFirstA",
            "last_name": "clientLastA",
            "start_date": "2020-2-17",
            "program_id": 1,
            "name": "progA",
            "length": 21,
            "phase": "strength"
        },
        {
            "client_id": 2,
            "first_name": "clientFirstB",
            "last_name": "clientLastB",
            "start_date": "2020-2-17",
            "program_id": 9,
            "name": "progC",
            "length": 21,
            "phase": "strength"
        }
      ]
      ```

* **Error Response**
    * **Code:** 400. 401

    * **Reason:** Invalid/missing token

----

#### _Add clients to a program_
[Back to Client-Program Routes List](#client-program-routes)

* **Method**

  `POST`

* **Endpoint**

  `/clients-programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "program_id": 1,
      "client_ids": [ 1, 2, 5 ]
    }
    ```

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  
  Only one program can be specified, but more than one client can be specified.
  ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
            "client_id": 1,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        },
        {
            "client_id": 2,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        },
        {
            "client_id": 5,
            "program_id": 1,
            "start_date": "2020-2-17",
            "current_day": null
        }
      ]
      ```
      
* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token, missing request body, bad/missing body keys, invalid client_id/program_id, coach_id not associated with client_id/program_id

----

#### _Delete a client from a program_
[Back to Client-Program Routes List](#client-program-routes)

* **Method**

  `DELETE`

* **Endpoint**

  `/clients-programs`

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "client_id": 5,
      "program_id": 1
    }
    ```

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id).
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      "1 item deleted successfully"
      ```

* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, missing request body, bad/missing body keys, invalid client_id/program_id, coach_id not associated with client_id/program_id 


----


### Exercise Routes
* [Create an Exercise](#Create-an-exercise)
* [Get all Exercises for a coach](#Get-all-exercise-for-a-coach)
* [Get one exercise for a coach](#Get-one-exercise-for-a-coach)
* [Update an exercise for a coach](#Update-an-exercise-for-a-coach)
* [Delete an Exercise](#Delete-an-Exercise)

### [Return to table of contents](#table-of-contents)
#### _Create an exercise_

[Back to Exercise Routes List](#exercise-routes)
* **Method**

  `POST`

* **Endpoint**

  `/exercises`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "name": "exercise",
      "type": type,
      "focal_points": "a focal point",
      "video_url":  "a url",
      "thumbnail_url": "a url",
    }
    ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 

    ```
      {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
      }
    ```
    * **Error Response**
    * **Code:** 400, 401

    * **Reason:**  Invalid/missing token, missing request body, bad/missing body keys
---

#### _Get all exercise for a coach_

[Back to Exercise Routes List](#exercise-routes)
* **Method**

  `GET`

* **Endpoint**

  `/exercises`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
      [
        {
          "id": 1,
          "name": "exerA",
          "type": null,
          "focal_points": "ex textA",
          "video_url": null,
          "thumbnail_url": null,
          "coach_id": 1
        },
        {
          "id": 2,
          "name": "exerB",
          "type": null,
          "focal_points": "ex textB",
          "video_url": null,
          "thumbnail_url": null,
          "coach_id": 1
        }
      ]
    ```
    * **Error Response**
    * **Code:** 400, 401

    * **Reason:**  Invalid/missing token
---
#### _Get one exercise for a coach_
[Back to Exercise Routes List](#exercise-routes)
* **Method**

  `GET`

* **Endpoint**

  `/exercises/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the exercise_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
        {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:**  Invalid/missing token, invalid exercise_id, coach_id not associated with exercise_id 
---
#### _Update an exercise for a coach_
[Back to Exercise Routes List](#exercise-routes)
* **Method**

  `PUT`

* **Endpoint**

  `/exercises/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the exercise_id.
  ```

* **Body of request is JSON. Example is shown below.**

    ```
    {
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
       
    }
    ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 

    ```
    {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
    }
    ```
    * **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:**  Invalid/missing token, missing request body, bad/missing body keys, invalid exercise_id, coach_id not associated with exercise_id
---
#### _Delete an Exercise_
   [Back to Exercise Routes List](#exercise-routes)
* **Method**

  `DELETE`

* **Endpoint**

  `/exercises/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the exercise_id.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 1,
        "name": "exercise",
        "type": type,
        "focal_points": "a focal point",
        "video_url":  "a url",
        "thumbnail_url": "a url",
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, invalid exercise_id, coach_id not associated with exercise_id


---
### Program Routes
* [Create program](#Create-a-program-with-workouts-and-link-workouts-to-exercises)
* [Get all programs for a coach](#Query-the-backend-for-programs-data-with-workouts-and-exercises-in-workouts)
* [Edit a program](#Modify-a-program-and-its-workouts-and-workout-links-to-exercises)
* [Delete a program](#Delete-a-program)


### [Return to table of contents](#table-of-contents)
----
#### _Create a program with workouts and link workouts to exercises_
  [Back to Program Routes List](#program-routes)

* **Method**

  `POST`

* **Endpoint**

  `/programs`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "name": "progC",
      "description": "progC desc",
      "length": 21,
      "phase": "strength",
      "workouts": [
        {
          "name": "work1", 
          "description": "work1 desc", 
          "day": 1, 
          "exercises": [
            {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
            {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
            {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
          ]
        }, 
        
        {
          "name": "work2", 
          "description": "work2 desc", 
          "day": 2, 
          "exercises": [
            {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
            {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
            {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
          ]
        }, 
      
        {
          "name": "work3", 
          "description": "work3 desc", 
          "day": 3, 
          "exercises": [
            {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
            {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
          ]
        }
      ]
    }
    ```

* **Success Response**
    * **Code:** 201

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
          id: 1, 
          name: "Program 1", 
          description: "program1 description", 
          coach_id: 1, 
          length: 10, 
          phase: "strength",
          workouts: [
            {
              id: 1, 
              name: "push day", 
              description: "push day arm workout", 
              day: 1, 
              exercises: [
                {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
              ]
            }, 
            {
              id: 2, 
              name: "pull day", 
              description: "pull day arm and back workout", 
              day: 2, 
              exercises: [
                {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
              ]
            },
            {
              id: 3, 
              name: "legs and core", 
              description: "legs and core day workout", 
              day: 3, 
              exercises: [
                {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
              ]
            },
          ],
          assigned_clients: [1, 3, 5, 7, 9]
        },   

        {
          "id": 2,
          "name": "progC",
          "description": "progC desc",
          "length": 21,
          "phase": "strength",
          "workouts": [
            {
              id: 4, 
              "name": "work1", 
              "description": "work1 desc", 
              "day": 1, 
              "exercises": [
                {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
              ]
            }, 
            
            {
              id: 5, 
              "name": "work2", 
              "description": "work2 desc", 
              "day": 2, 
              "exercises": [
                {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
              ]
            }, 
          
            {
              id: 6, 
              "name": "work3", 
              "description": "work3 desc", 
              "day": 3, 
              "exercises": [
                {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
              ]
            }
          ],
          assigned_clients: []
        }      
      ]
      ```
      
      
      
* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token, invalid exercise_id, coach_id not associated with exercise_id 

  

----

#### _Query the backend for programs data with workouts and exercises in workouts_
   [Back to Program Routes List](#program-routes)
* **Method**

  `GET`

* **Endpoint**

  `/programs`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
          id: 1, 
          name: "Program 1", 
          description: "program1 description", 
          coach_id: 1, 
          length: 10, 
          phase: "strength",
          workouts: [
            {
              id: 1, 
              name: "push day", 
              description: "push day arm workout", 
              day: 1, 
              exercises: [
                {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
              ]
            }, 
            {
              id: 2, 
              name: "pull day", 
              description: "pull day arm and back workout", 
              day: 2, 
              exercises: [
                {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
              ]
            },
            {
              id: 3, 
              name: "legs and core", 
              description: "legs and core day workout", 
              day: 3, 
              exercises: [
                {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
              ]
            },
          ],
          assigned_clients: [1, 3, 5, 7, 9]
        },


        {
          id: 2, 
          name: "Program 2", 
          description: "program2 description", 
          coach_id: 1, 
          length: 22, 
          phase: "strength light",
          workouts: [
            {
              id: 4, 
              name: "push day", 
              description: "push day arm workout", 
              day: 1, 
              exercises: [
                {exercise_id: 11, order: 1, exercise_details: "50lbs bar - 2 sets of 2"},
                {exercise_id: 12, order: 2, exercise_details: "10lbs dumbbells - 2 sets of 2"},
              ]
            }, 
            {
              id: 5, 
              name: "pull day", 
              description: "pull day arm and back workout", 
              day: 2, 
              exercises: [
                {exercise_id: 14, order: 1, exercise_details: "bodyweight - 2 sets of 4"},
                {exercise_id: 15, order: 2, exercise_details: "10lbs bar - 2 sets of 4"},
              ]
            },
            {
              id: 6, 
              name: "legs and core", 
              description: "legs and core day workout", 
              day: 3, 
              exercises: [
                {exercise_id: 17, order: 1, exercise_details: "35lbs bar - 2 sets of 5"},
                {exercise_id: 19, order: 2, exercise_details: "bodyweight - 2 sets of 5"},
              ]
            },
          ],
          assigned_clients: [2, 4, 6]
        }      
      ]
      ```

* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token

----
#### _Modify a program and its workouts and workout links to exercises_
   [Back to Program Routes List](#program-routes)
* **Method**

  `PUT`

* **Endpoint**

  `/programs`

* **Notes**

  ```
  This is for the modification of a single program for a coach. When this request 
  is received by the backend, the server will first delete all the current workouts
  and exercises_workouts records associated with the program. Then it will modify the program record 
  and then add new workouts and exercises_workouts records according to the request body. 

  The token must be sent along with the request (it has the coach_id). 
  ```

* **Body of request is JSON. Example is shown below.**

    ```
    {
      "id":7,
      "name": "progC",
      "description": "progC desc",
      "length": 21,
      "phase": "strength",
      "workouts": [
        {
          "name": "work1", 
          "description": "work1 desc", 
          "day": 1, 
          "exercises": [
            {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
            {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
            {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
          ]
        }, 
        
        {
          "name": "work2", 
          "description": "work2 desc", 
          "day": 2, 
          "exercises": [
            {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
            {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
            {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
          ]
        }, 
      
        {
          "name": "work3", 
          "description": "work3 desc", 
          "day": 3, 
          "exercises": [
            {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
            {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
          ]
        }
      ]
    }
    ```


* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      [
        {
          id: 1, 
          name: "Program 1", 
          description: "program1 description", 
          coach_id: 1, 
          length: 10, 
          phase: "strength",
          workouts: [
            {
              id: 1, 
              name: "push day", 
              description: "push day arm workout", 
              day: 1, 
              exercises: [
                {exercise_id: 1, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 2, order: 2, exercise_details: "50lbs dumbbells - 5 sets of 5"},
                {exercise_id: 3, order: 3, exercise_details: "70lbs bar - 5 sets of 5"}
              ]
            }, 
            {
              id: 2, 
              name: "pull day", 
              description: "pull day arm and back workout", 
              day: 2, 
              exercises: [
                {exercise_id: 4, order: 1, exercise_details: "bodyweight - 5 sets of 5"},
                {exercise_id: 5, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 6, order: 3, exercise_details: "30lbs dumbbells - 5 sets of 5"}
              ]
            },
            {
              id: 3, 
              name: "legs and core", 
              description: "legs and core day workout", 
              day: 3, 
              exercises: [
                {exercise_id: 7, order: 1, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 8, order: 2, exercise_details: "135lbs bar - 5 sets of 5"},
                {exercise_id: 9, order: 3, exercise_details: "bodyweight - 5 sets of 5"},
              ]
            },
          ],
          assigned_clients: [1, 3, 5, 7, 9]
        },   

        {
          "id": 2,
          "name": "progC",
          "description": "progC desc",
          "length": 21,
          "phase": "strength",
          "workouts": [
            {
              id: 4, 
              "name": "work1", 
              "description": "work1 desc", 
              "day": 1, 
              "exercises": [
                {"exercise_id": 1, "order":1, "exercise_details": "exD1_work1"}, 
                {"exercise_id": 2, "order":2, "exercise_details": "exD2_work1"}, 
                {"exercise_id": 3, "order":3, "exercise_details": "exD3_work1"} 
              ]
            }, 
            
            {
              id: 5, 
              "name": "work2", 
              "description": "work2 desc", 
              "day": 2, 
              "exercises": [
                {"exercise_id": 4, "order":1, "exercise_details": "exD4_work2"}, 
                {"exercise_id": 5, "order":2, "exercise_details": "exD5_work2"}, 
                {"exercise_id": 6, "order":3, "exercise_details": "exD6_work2"} 
              ]
            }, 
          
            {
              id: 6, 
              "name": "work3", 
              "description": "work3 desc", 
              "day": 3, 
              "exercises": [
                {"exercise_id": 1, "order":1, "exercise_details": "exD1_work3"}, 
                {"exercise_id": 6, "order":2, "exercise_details": "exD7_work3"} 
              ]
            }
          ],
          assigned_clients: []
        }      
      ]
      ```
      
      
      
* **Error Response**
    * **Code:** 400, 401

    * **Reason:** Invalid/missing token, missing request body, bad/bissing body keys, invalid exercise_id/program_id, coach_id not associated with exercise_id/program_id      


----

#### _Delete a program_
   [Back to Program Routes List](#program-routes)
* **Method**

  `DELETE`

* **Endpoint**

  `/programs/:id`

* **Notes**

  ```
  The token must be sent along with the request (it has the coach_id). 

  The param id is the program_id that will be deleted. All linked workouts and exercise_workouts records
  will also be deleted.
  ```

* **Success Response**
    * **Code:** 200

    * **Body of response is JSON. Example is shown below:** 
      ```
      {
        "id": 3,
        "name": "progC",
        "phase": "progC phase",
        "description": "progC desc",
        "length": 7,
        "coach_id": 1
      }
      ```

* **Error Response**
    * **Code:** 400, 401, 403, 404

    * **Reason:** Invalid/missing token, invalid program_id, coach_id not associated with program_id 








# Data Model
### [Return to table of contents](#table-of-contents)
#### COACHES

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Coach id |
| first_name | string | yes | no | Coach first name |
| last_name | string | yes | no | Coach last name  |
| email | string | yes | yes | Coach email (max 100 char) |
| password | string | yes | no | Coach password (max 100 char) |

```
{
  id: INTEGER
  first_name: STRING
  last_name: STRING
  email: STRING
  password: STRING
}
```

----

#### EXERCISES

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Exercise id |
| name | string | yes | no | Exercise name |
| type | string | no | no | Exercise type  |
| focal_points | string | no | no | Notes/Description/points of focus during Exercise (max 1000 char) |
| video_url | string | no | no | Exercise video (max 1000 char) |
| thumbnail_url | string | no | no | Exercise image (max 1000 char) |
| coach_id | integer | yes | no | Coach id (foreign key) |


```
{
  id: INTEGER
  name: STRING
  type: STRING
  focal_points: STRING
  video_url: STRING
  thumbnail_url: STRING
  coach_id: INTEGER
}
```

----

#### WORKOUTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Workout id |
| name | string | yes | no | Workout name |
| description | string | yes | no | Workout description (max 1000 char) |
| day | integer | yes | no | The day of the program to which this workout belongs |
| coach_id | integer | yes | no | Coach id (foreign key) |
| program_id | string | yes | no | Program id (foreign key) |

```
{
  id: INTEGER
  name: STRING
  description: STRING
  day: INTEGER
  coach_id: INTEGER
  program_id: INTEGER
}
```

----

#### EXERCISES_WORKOUTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| exercise_id | integer | yes | no | Exercise id (foreign key) |
| workout_id | integer | yes | no | Workout id (foreign key) |
| order | integer | yes | no | The order in which the exercise will be performed in the workout |
| exercise_details | string | yes | no | Sets/reps/time for an exercise in a specific workout (max 1000 char) |

```
{
  exercise_id: INTEGER
  workout_id: INTEGER
  order: INTEGER
  exercise_details: STRING
}
```

----

#### PROGRAMS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Program id |
| name | string | yes | no | Program name |
| description | string | yes | no | Program description (max 1000 char) |
| phase | string | yes | no | Type/Goal of Program |
| length | integer | yes | no | Program length in days |
| coach_id | integer | yes | no | Coach id (foreign key) |

```
{
  id: INTEGER
  name: STRING
  description: STRING
  phase: STRING
  length: INTEGER
  coach_id: INTEGER
}
```

----

#### CLIENTS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Client id |
| first_name | string | yes | no | Client first name |
| last_name | string | yes | no | Client last name |
| email | string | yes | yes | Client email |
| coach_id | integer | yes | no | Coach id (foreign key) |

```
{
  id: INTEGER
  first_name: STRING
  last_name: STRING
  email: STRING
  coach_id: INTEGER
}
```

----

#### CLIENTS_PROGRAMS

| Name | Type | Required | Unique | Description |
| ---- | ---- | -------- | ------ | ----- |
| client_id | integer | yes | no | Client id (foreign key) |
| program_id | integer | yes | no | Program id (foreign key) |
| start_date | string | yes | no | The date the program is assigned to the client |
| current_day | integer | no | no | The day of the program the client is currently on |

```
{
  client_id: INTEGER
  program_id: INTEGER
  start_date: STRING
  current_day: INTEGER
}
```

----


## Actions
### [Return to table of contents](#table-of-contents)
#### Coaches Model

`addCoach(coach)` -> Creates a new coach and returns that coach

`findCoachBy(email)` -> Returns a single coach by email

`getCoachById(id)` -> Returns a single coach by id

---

#### Exercises Model

`getExercises(coach_id)` -> Returns all exercises for given coach id

`getExerciseById(id)` -> Returns a single exercise by id

`addExercise(exercise)` -> Creates a new exercise and returns that exercise

`updateExercise(id, changes)` -> Modifies a single exercise by id and returns the modified exercise

`deleteExercise(id)` -> Deletes a single exercise by id and returns the deleted exercise

---

#### Workouts Model


`getWorkoutById(id)` -> Returns a single workout by id

`getWorkoutByProgramId(program_id)` -> Returns all workouts for given program id

`addWorkout(workouts)` -> Creates one or more new workouts and returns the workouts 

`deleteWorkout(id)` -> Deletes a single workout by id and returns the deleted workout

`getExercisesInWorkout(exerciseWorkout)` -> Returns all given exercises linked to given workouts

`getExercisesByWorkoutId(workout_id)` -> Returns all exercises for the given workout id

`addExercisesToWorkout(exerciseWorkout)` -> Adds exercises to given workout and returns them

#### Programs Model

`getPrograms(coach_id)` -> Returns all programs for given coach id

`getProgramById(id)` -> Returns a single program by id

`addProgram(program)` -> Creates a new program and returns that program

`updateProgram(id, changes)` -> Modifies a single program by id and returns the modified program

`deleteProgram(id)` -> Deletes a single program by id and returns the deleted program

#### Clients Model

`getClients(coach_id)` -> Returns all clients for given coach id

`getClientById(id)` -> Returns a single client by id

`addClient(client)` -> Creates a new client and returns that client

`updateClient(id, changes)` -> Modifies a single client by id and returns the modified client

`deleteClient(id)` -> Deletes a single client by id and returns the deleted client

`extractClientsInProgram(program_id)` -> Returns all clients assigned to the given program id

`getClientsInProgram(clientProgram)` -> Returns all given clients linked to given programs

`addClientsToProgram(clientProgram)` -> Creates one or more new client-program links and returns them

`deleteProgramForClient(clientProgram)` -> Deletes a single client-program link and returns the count

`getDashboardInfo(coach_id)` -> Returns dashboard info from many tables for the given coach id


---
## Environment Variables
### [Return to table of contents](#table-of-contents)
In order for the app to function correctly, the user must set up their own environment variables.

Note that only DB_JWTSECRET is necessary to be specified for running this project on your local computer

    *  DB_JWTSECRET - secret key for access token
    *  DATABASE_URL - URL for PostgreSQL database in Heroku deployment
    *  PORT - port value for Heroku deployment
    *  DB_CONNECT - used to set database production config for Heroku deployment
    
    




