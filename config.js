import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { OPENAI_API_KEY, PINECODE_API_KEY } from "./env";
// OpenAI config
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
const pc = new Pinecone({
  apiKey: PINECODE_API_KEY,
});
export const index = pinecone.index("red30-tech-conf");
