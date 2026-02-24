import express from "express"
import protect from "../middleware/authMiddleware.js"
import profileController from "../controllers/profileController.js"


const router = express.Router()


router.get("/followers", protect, profileController.getMyFollowers)
router.get("/followings", protect, profileController.getMyFollowings)


export default router