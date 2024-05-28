import { OpenAI } from "openai";

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

export default openai;