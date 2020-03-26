import {Router} from 'express'

import {getUsers, getUser, createUser, deleteUser, updateUser, signUp, signIn} from '../controllers/users.controller'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


/**
 * @swagger
 * path:
 *   /users/:
 *     get:
 *       tags:
 *         - [Users]
 *       summary: Returns all users
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: An array of Posts
 *           schema:
 *             $ref: '#/components/schemas/User'
 */

router.get('/', getUsers)

/**
 * @swagger
 * path:
 *   /users/{email}:
 *     get:
 *       tags:
 *         - [Users]
 *       description: Return one users
 *       parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: Email of the User
 *       responses:
 *         200:
 *           description: An array of Posts
 *           schema:
 *             $ref: '#/components/schemas/User'
 * 
 */
router.get('/:email', getUser)

/**
 * @swagger
 * path:
 *   /users/:
 *     post:
 *       summary: Create new user
 *       tags:
 *         - [Users]
 *       description: Save one user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: User created       
 */
router.post('/', createUser)

/**
 * @swagger
 * path:
 *   /users/{email}:
 *     delete:
 *       tags:
 *         - [Users]
 *       summary: Delete one user
 *       parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: Email of the User
 *       responses:
 *         200:
 *           description: User deleted
 */
router.delete('/:email', deleteUser)

/**
 * @swagger
 * path:
 *   /users/{email}:
 *     put:
 *       tags:
 *         - [Users]
 *       summary: Update one user
 *       parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: Email of the User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *       responses:
 *         200:
 *           description: User updated
 */
router.put('/:email', updateUser)

/**
 * @swagger
 * path:
 *   /users/signup:
 *     post:
 *       tags:
 *         - [Users]
 *       summary: Create a User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *       responses:
 *         201:
 *           description: User Created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         400:
 *           description: Please send your Email and Password
 *         403:
 *           description: Email already taken
 */

router.post('/signup', signUp)

/**
 * @swagger
 * path:
 *   /users/signin:
 *     post:
 *       tags:
 *         - [Users]
 *       summary: Login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: User found and logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *         400:
 *           description: Please send your Email and Password
 *         401:
 *           description: Bad email, not found in DB
 *         403:
 *           description: Email and Password don't match
 *       
 */
router.post('/signin', signIn)

export default router