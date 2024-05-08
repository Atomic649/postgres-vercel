import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as Joi from "joi"
import { error } from "console"

// Create instance of Prisma
const prisma = new PrismaClient()

//----------------------------------------------------------

// Interface for request body from client
interface UserInput {
    email: string
    firstName: string
    lastName: string
    social: {
        facebook?: string
        twitter?: string
        github?: string
        website?: string
    }
    
}

//------ Create New User---------------------------------
const createUser = async (req: Request, res: Response) => {
    const userInput: UserInput = req.body        

    // Validate User Input
    const schema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        social: Joi.object({
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            github: Joi.string().uri(),
            website: Joi.string().uri()
        })
    })
    // If the request body is invalid, return error 400 Bad request
    const { error } = schema.validate(userInput)
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    // Create New User
    try {
        const user = await prisma.user.create({
            data: {
                email: userInput.email,
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                social: userInput.social
            }
        })
        res.json(user)

    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Failed to create user" })
    }
}
//---Get All Users----------------------------------

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Failed to get users" })
    }
}
//-----Get User by ID---------------------------------------------

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Failed to get user by ID" })
    }
}
//----Update User by ID-----------------------------------
const updateUserById = async (req: Request, res: Response) => {
    const userID = parseInt(req.params.id)
    const userInput: UserInput = req.body

    // Validate the request body
    const schema = Joi.object({
        email: Joi.string().email(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        social: Joi.object({
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            github: Joi.string().uri(),
            website: Joi.string().uri()
        })
    })
    //If the request body is invalid, return error 400 Bad request
    const { error } = schema.validate(userInput)
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: userID
            },
            data: userInput
            
        })
        res.json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Failed to update user" })
    }

}
// --- Delete User by ID-----------------------------------
const deleteUserById = async (req: Request, res: Response) => {
    const userID = parseInt(req.params.id)
    try {
        const user = await prisma.user.delete({
            where: {
                id: userID
            }
        })
        res.json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Failed to delete user" })
    }
}
//-------------------------------------------------------


export { createUser, getUsers, getUserById, updateUserById, deleteUserById }