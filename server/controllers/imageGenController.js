import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";



const generateImage = async (req, res) => {

    const { prompt } = req.body

    if (!prompt) {
        res.status(409)
        throw new Error("Kindly Provide Prompt To Generate Image!")
    }

    const ai = new GoogleGenAI({})

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
    });

    console.log(response)



    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }


    res.send("Image Generated!")
}




export default generateImage





