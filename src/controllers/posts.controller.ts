import {Request, Response} from 'express'


import Post from '../models/Post'

const errorHandler = (error:any) => {
    console.log(error)
    // this.setStatus(500)
    return error
    // {
    //     message: 'Internal Server Error'
    // }
}

export const getPosts = async (req:Request, res:Response): Promise<any> => {
    try {
        const posts = await Post.find()
        return res.status(200).json(posts)
    } catch (error) {
        return errorHandler(error)
    }
}

export const getPost = async (req:Request, res:Response): Promise<any> => {
    try {
        const url = req.params.url
        const post = await Post.findOne({url})
        return res.status(200).json(post)
    } catch (error) {
        return errorHandler(error)
    }
}

export const createPost = async (req:Request, res:Response): Promise<any> => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        return res.status(200).json({msg: 'Post created'})
    } catch (error) {
        return errorHandler(error)
    }
}

export const deletePost = async (req:Request, res:Response): Promise<any> => {
    try {
        const url = req.params.url
        await Post.findOneAndDelete({url})
        return res.status(200).json({msg: 'Post deleted'})
    } catch (error) {
        return errorHandler(error)
    }
}

export const updatePost = async (req:Request, res:Response): Promise<any> => {
    try {
        const url = req.params.url
        await Post.findOneAndUpdate({url}, req.body)
        return res.status(200).json({msg: 'Post updated'})
    } catch (error) {
        console.log(error)
        return errorHandler(error)
    }
}