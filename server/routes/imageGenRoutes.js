import express from "express"
import protect from "../middleware/authMiddleware.js"
import generateImage from "../controllers/imageGenController.js"


const router = express.Router()


router.post("/generate", protect.forUser, generateImage)


export default router