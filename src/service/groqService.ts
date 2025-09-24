import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "test-api-openai-founderhub-exe-lehuyvu-deptrai",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateRoadmap() {
  const prompt = `
  Hãy tạo dữ liệu roadmap phát triển sản phẩm gồm 5 giai đoạn. 
  Mỗi giai đoạn có:
  - id (số tăng dần từ 1)
  - title (ngắn gọn)
  - 4 điểm "points" mô tả chi tiết
  Trả về JSON array.
  `;

  const response = await client.chat.completions.create({
    model: "llama-3.1-70b-versatile", 
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  // Parse JSON từ AI
  try {
    return JSON.parse(response.choices[0].message.content || "[]");
  } catch (err) {
    console.error("Parse error:", err);
    return [];
  }
}
