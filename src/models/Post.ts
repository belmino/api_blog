import {model, Schema, Document} from 'mongoose'

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true},
    content: { type: String, required: true },
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
})


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: fulano@mail.com
 *         password: secret
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - url
 *         - content
 *         - image
 *       properties:
 *         title:
 *           type: string
 *         url:
 *           type: string
 *         content:
 *           type: string
 *         image:
 *           type: string
 *       example:
 *         title: My First Post
 *         url: my-first-post
 *         content: Lorem Ipsum
 *         image: https://myimage.com
 */

export default model('Post', PostSchema)