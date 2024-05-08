import express from "express"

// Create express app
const app = express()

// Express middleware parser Json
app.use(express.json())

// Import userRoutes 
import userRoutes from "./routes/userRoutes"

// Use userRoutes
app.use("/users", userRoutes)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})