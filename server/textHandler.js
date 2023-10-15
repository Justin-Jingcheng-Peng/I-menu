import Tesseract from "tesseract.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Import Firebase Storage SDK
import { FIREBASE_APP } from "./FirebaseConfig.js";
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); // Initialize Firebase Storage

dotenv.config();
export async function extractText() {
  try {
    // Define the image ref based on the imgPath argument
    const imageRef = ref(
      FIREBASE_STORAGE,
      "images/pa7BS7X7wogqhGkRuyJra8G2L5i1.png"
    );

    // Get the download URL
    const url = await getDownloadURL(imageRef);

    // Now use Tesseract to recognize text
    const {
      data: { text },
    } = await Tesseract.recognize(url, "eng", {
      logger: (m) => console.log(m),
    });
    return text;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function solveChatGpt(userData) {
  const extractedText = await extractText();

  const jsonString = JSON.stringify(userData, null, 2); // The 'null' and '2' arguments are for formatting

  const prompt = `
    I have extracted the following text from a restaurant menu: \n
    ${extractedText} \n
    I have some information about the me ${jsonString} \n
    Based on above information, write a paragraph to classify what food is good for me and what food is disallowed?
    Take special notice that the religious restrictions (Buddhism cannot eat meat and Muslim cannot eat pork and so on).
    Your response should not contain explaination, only include a list of food that is suitable for me and a list of food that is bad for me
  `;

  const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  // const currentTime = new Date().toISOString();
  // return currentTime;
  return chatCompletion.choices[0].message.content;
}
