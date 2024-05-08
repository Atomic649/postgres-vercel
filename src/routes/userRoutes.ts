import express from "express"
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from "../controller/userController"

// Create express router
const router = express.Router()

// Create Routes for Create User
router.post("/", createUser)

// Create Routes for Get All User
router.get("/", getUsers)

// Create Routes for User by ID
router.get("/:id", getUserById)

// Create Routes for Update User by ID
router.put("/:id", updateUserById)

// Create Routes for Delete User by ID
router.delete("/:id", deleteUserById)

// Export router
export default router