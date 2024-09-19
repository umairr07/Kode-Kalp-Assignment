import express from "express"
import dotenv from "dotenv"
import connectToDb from "./db/db.js"
import userRouter from "./routes/user.route.js"
import cors from "cors"

const app = express()
app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3000

dotenv.config()


app.use("/api/v1/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
    connectToDb()
})