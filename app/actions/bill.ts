'use server'

import { PrismaClient } from '@prisma/client'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server"

const prisma = new PrismaClient()
export async function uploadBill(formData: FormData) {
    console.log('Server Action: Starting bill upload process')
    
    try {
      const file = formData.get('file') as File
      if (!file) {
        console.log('Server Action: No file found in FormData')
        throw new Error('No file uploaded')
      }
  
      console.log('Server Action: File received:', {
        name: file.name,
        type: file.type,
        size: file.size
      })
  
      const apiKey = process.env.GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('Gemini API key is not configured')
      }
      const fileManager = new GoogleAIFileManager(apiKey)
    const genAI = new GoogleGenerativeAI(apiKey)
    const buffer = Buffer.from(await file.arrayBuffer())
    const tempFilePath = `/tmp/${file.name}`
    const fs = require('fs').promises
    await fs.writeFile(tempFilePath, buffer)
    console.log('Server Action: uploadding')
    const uploadResult = await fileManager.uploadFile(
      tempFilePath,
      {
        mimeType: file.type,
        displayName: file.name,
      }
    )
    console.log('Server Action: File uploaded successfully:', uploadResult.file.uri)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = "You are a receipt analyzer. Analyze this bill/receipt and return ONLY a JSON object with these exact fields:" +
                  "totalAmount (number - just the number, no currency symbols), " +
                  "date (string in YYYY-MM-DD format), " +
                  "merchantName (string), " +
                  "category (string - exactly one of: Groceries, Utilities, Entertainment, Food, Transport, Healthcare, Others). " +
                  "Do not include any explanations or markdown formatting."

    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      }
    ])

    console.log('Server Action: Received raw response from Gemini:', result.response.text())
    const analysis = parseGemResponse(result.response.text())
    console.log('Server Action: Parsed analysis:', analysis)

    if (!analysis.totalAmount || !analysis.merchantName || !analysis.category) {
        throw new Error('Incomplete analysis result')
      }

      //using a default user for now. TODO after authentiacation
      const user = await prisma.user.upsert({
        where: { username: 'default_user' },
        update: {},
        create: {
          username: 'default_user',
          name: 'Default User',
          password: 'aryan_tech' // TODO, use proper password hashing
        }
      })
      const category = await prisma.category.upsert({
        where: { name: analysis.category },
        update: {},
        create: { name: analysis.category }
      })
  
    }}