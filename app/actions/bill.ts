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
    }}