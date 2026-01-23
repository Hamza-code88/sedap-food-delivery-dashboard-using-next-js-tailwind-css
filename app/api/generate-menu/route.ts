import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    // 1. Check API Key
    if (!process.env.GROQ_API_KEY) {
      console.error("❌ Error: GROQ_API_KEY missing in .env.local");
      return NextResponse.json({ error: "Server Error: API Key Missing" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { foodName } = await req.json();

    if (!foodName) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const systemPrompt = `
      You are a professional chef. Given a food name, return a JSON object with:
      1. 'description' (max 20 words, catchy)
      2. 'price' (formatted like $12.00)
      3. 'calories' (e.g. 450 kcal)
      
      Only return JSON: { "description": "...", "price": "...", "calories": "..." }
    `;

    // 2. Call AI with NEW MODEL
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Food: ${foodName}` },
      ],
      // CHANGE: 'llama3-8b-8192' ki jagah latest fast model use kiya
      model: "llama-3.1-8b-instant", 
      temperature: 0.5, // Thoda creative kam, accurate zyada
    });

    // 3. Parse Response
    const content = completion.choices[0]?.message?.content || "{}";
    const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
    
    return NextResponse.json(JSON.parse(jsonStr));

  } catch (error: any) {
    console.error("🔴 AI API Error:", error.message);
    return NextResponse.json({ error: "AI Generation Failed", details: error.message }, { status: 500 });
  }
}