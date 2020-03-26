import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

import User, { IUser } from '../models/User'
import config from '../config/config'

const errorHandler = (error:any) => {
    // console.log(error)
    // this.setStatus(500)
    return error
    // {
    //     message: 'Internal Server Error'
    // }
}

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    })
}

export const getUsers = async (req:Request, res:Response): Promise<any> => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return errorHandler(error)
    }
}

export const getUser = async (req:Request, res:Response): Promise<any> => {
    try {
        const email = req.params.email
        const user = await User.findOne({email})
        return res.status(200).json(user)
    } catch (error) {
        return errorHandler(error)
    }
}

export const createUser = async (req:Request, res:Response): Promise<any> => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(200).json({msg: 'User created'})
    } catch (error) {
        return errorHandler(error)
    }
}

export const deleteUser = async (req:Request, res:Response): Promise<any> => {
    try {
        const email = req.params.email
        await User.findOneAndDelete({email})
        return res.status(200).json({msg: 'User deleted'})
    } catch (error) {
        return errorHandler(error)
    }
}

export const updateUser = async (req:Request, res:Response): Promise<any> => {
    try {
        const email = req.params.email
        const updatedUser = new User(req.body)
        // await User.findOneAndUpdate({url}, updatedUser)
        const user = await User.findOne({email})
        if (user != null) {
            await user.update(updatedUser)            
        }
        // await User.updateOne({url}, updatedUser)
        return res.status(200).json({msg: 'User updated'})
    } catch (error) {
        return errorHandler(error)
    }
}

export const signUp = async (req:Request, res:Response): Promise<Response> => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({msg: 'Please send your Email and Password'})
        }

        const user = await User.findOne({email: req.body.email})
        if (user){
            // return res.status(400).json({msg: 'The user already exists'})
            return res.status(403).json({msg: 'Email already taken'})
        }

        const newUser = new User(req.body)
        await newUser.save()

        return res.status(201).json(newUser)

    } catch (error) {
        return errorHandler(error)
    }
}


export const signIn = async (req:Request, res:Response): Promise<Response> => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({msg: 'Please send your Email and Password'})
        }

        const user = await User.findOne({email: req.body.email})
        if (!user){
            // return res.status(401).json({msg: 'The user doesnt exist'})
            return res.status(401).json({msg: 'Bad email, not found in DB'})
        }

        const isMatch = await user.comparePassword(req.body.password)
        if (isMatch) {
            return res.status(200).json({token: createToken(user)})
            // User found and logged in successfully
        }
        // return res.status(403).json({msg: 'Email or Password are incorrect'})
        return res.status(403).json({msg: `Email and Password don't match`})
    } catch (error) {
        return errorHandler(error)
    }
}