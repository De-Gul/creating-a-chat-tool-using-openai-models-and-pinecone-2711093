import OpenAI from "openai";
import { OPENAI_API_KEY, PINECONE_API_KEY } from "./env";
import { Pinecone } from "@pinecone-database/pinecone";
// OpenAI config
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Pinecone config
export const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});
export const index = pinecone.index("lotr-index");
