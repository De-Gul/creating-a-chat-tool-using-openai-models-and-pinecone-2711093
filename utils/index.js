import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { index, openai } from "../config.js";

// Generate an ID
let currentId = 0;
export function nextId() {
  return (currentId += 1).toString();
}

export async function upsertRecords(file) {
  const data = await generateEmbeddings(file);
  const response = await index.upsert(data);
  console.log("Upserted records:", response.upsertedCount);
}

export async function splitText(document) {
  const response = await fetch(document);
  const text = await response.text();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const chunks = await splitter.createDocuments([text]);
  return chunks;
}

export async function generateEmbeddings(document) {
  const data = [];
  const text = await splitText(document);

  for (const chunk of text) {
    const mebeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.pageContent,
    });
    data.push({
      id: nextId(),
      values: mebeddingResponse.data[0].embedding,
      metadata: { content: chunk.pageContent },
    });
  }

  return data;
}
