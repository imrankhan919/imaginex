import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const generateAndPost = async (req, res) => {

    let userId = req.user.id
    let newPost

    try {
        // Get Prompt
        const { prompt, caption } = req.body

        // Check if prompt is coming in body
        if (!prompt || !caption) {
            res.status(409)
            throw new Error("Kindly Provide Prompt To Generate Image!")
        }

        // Initialize Google Gen AI Instance
        const ai = new GoogleGenAI({})

        // Api Call To Generate Image
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: prompt,
        });

        console.log(response.candidates)

        // Loop Thorugh Correct Response
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                // Convert text to image
                const buffer = Buffer.from(imageData, "base64");
                // Save locally
                const filename = crypto.randomUUID() + ".png";
                const filePath = path.join(__dirname, "../generated-content", filename);
                // Write file into server
                fs.writeFileSync(filePath, buffer);
                // Upload to cloudinary 
                const imageLink = await uploadToCloudinary(filePath)
                // Remove Image From Server
                fs.unlinkSync(filePath)

                // Create Post
                newPost = await Post.save({
                    user: userId,
                    imageLink: imageLink,
                    caption: caption
                })

            }
        }

        res.status(201).json(newPost)


    } catch (error) {
        console.log(error.message)
        res.status(409)
        throw new Error("Post Not Created!")
    }

}


const postController = { generateAndPost }




export default postController





