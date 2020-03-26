import {model, Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


UserSchema.pre<IUser>("save", async function(next) {
    const user = this;
  
    if (!user.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
  
    next()
})


UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

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

export default model<IUser>('User', UserSchema)