import {Router} from 'express'
import passport from 'passport'

import {getPosts, getPost, createPost, deletePost, updatePost} from '../controllers/posts.controller'

const router = Router()


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */


/**
 * @swagger
 * path:
 *   /posts:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - [Posts]
 *       description: Returns all posts
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: An array of Posts
 *           schema:
 *             $ref: '#/components/schemas/Post'
 */

router.get('/', passport.authenticate('jwt', {session: false}), getPosts)

/**
 * @swagger
 * path:
 *   /posts/{url}:
 *     get:
 *       tags:
 *         - [Posts]
 *       description: Return one posts
 *       parameters:
 *         - in: path
 *           name: url
 *           schema:
 *             type: string
 *           required: true
 *           description: URL of Post
 *       responses:
 *         200:
 *           description: One Post
 *           schema:
 *             $ref: '#/components/schemas/Post'
 * 
 */
router.get('/:url', getPost)

/**
 * @swagger
 * path:
 *   /posts:
 *     post:
 *       tags:
 *         - [Posts]
 *       description: Save one post
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       responses:
 *         200:
 *           description: Post Created
 */
router.post('/', createPost)

/**
 * @swagger
 * path:
 *   /posts/{url}:
 *     delete:
 *       tags:
 *         - [Posts]
 *       description: Delete one post
 *       parameters:
 *         - in: path
 *           name: url
 *           schema:
 *             type: string
 *           required: true
 *           description: URL of Post
 *       responses:
 *         200:
 *           description: Post Deleted
 */
router.delete('/:url', deletePost)

/**
 * @swagger
 * path:
 *   /posts/{url}:
 *     put:
 *       tags:
 *         - [Posts]
 *       description: Update one post
 *       parameters:
 *         - in: path
 *           name: url
 *           schema:
 *             type: string
 *           required: true
 *           description: URL of Post
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       responses:
 *         200:
 *           description: Post Updated
 */
router.put('/:url', updatePost)

export default router