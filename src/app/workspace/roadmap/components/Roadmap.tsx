"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Target, Users, Rocket, TrendingUp } from "lucide-react";
import OpenAI from "openai";

interface RoadmapItem {
  id: number;
  title: string;
  points: string[];
}

const iconMap: Record<number, JSX.Element> = {
  1: <Target className="w-6 h-6" />,
  2: <CheckCircle className="w-6 h-6" />,
  3: <Users className="w-6 h-6" />,
  4: <Rocket className="w-6 h-6" />,
  5: <TrendingUp className="w-6 h-6" />,
};

const colorMap: Record<number, string> = {
  1: "bg-blue-50 border-blue-200",
  2: "bg-indigo-50 border-indigo-200",
  3: "bg-purple-50 border-purple-200",
  4: "bg-cyan-50 border-cyan-200",
  5: "bg-teal-50 border-teal-200",
};

const Roadmap = () => {
  const [streamText, setStreamText] = useState("");
  const [roadmapData, setRoadmapData] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setStreamText("");
      setRoadmapData([]);

      const client = new OpenAI({
        apiKey: "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",
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true, // ⚠️ chỉ test, production thì proxy qua backend
      });

      const prompt = `
        Generate roadmap data with 5 stages.
        Each stage should include:
        - id (1 to 5)
        - title (short, vietnamese)
        - points (array of 4 bullet points, vietnamese)
        - Trả lời chủ đề về tạo project phát triển android app, web app, và các nền tảng khác
        - Mỗi giai đoạn nên tập trung vào một khía cạnh cụ thể của quá trình phát triển sản phẩm, từ ý tưởng đến phát triển, ra mắt và tăng trưởng.
        - Trả về đúng JSON array, không kèm mô tả hay giải thích gì thêm.
        - Chỉ trả về JSON, không kèm chú thích hay mô tả gì thêm.
        - Định dạng JSON phải đúng chuẩn, có thể parse được.
        Return ONLY valid JSON array, no extra text, no markdown.
      `;

      try {
        const stream = await client.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          stream: true,
        });

        let fullText = "";

        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content || "";
          fullText += token;
          setStreamText((prev) => prev + token); // typing effect
        }

        // Làm sạch trước khi parse
        let cleaned = fullText.trim();
        cleaned = cleaned.replace(/```json/g, "");
        cleaned = cleaned.replace(/```/g, "");

        try {
          const parsed = JSON.parse(cleaned);
          setRoadmapData(parsed);
        } catch (err) {
          console.error("JSON parse error:", err);
          console.log("Raw text:", cleaned);
        }
      } catch (err) {
        console.error("Groq API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Development Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide to building and scaling your product from idea
            to sustainable growth
          </p>
        </div>

        {/* Khi AI đang stream text */}
        {loading && roadmapData.length === 0 && (
          <div className="p-4 bg-white rounded shadow font-mono text-sm whitespace-pre-wrap">
            {streamText || "Generating roadmap from AI..."}
          </div>
        )}

        {/* Khi đã parse được JSON → render UI timeline cũ */}
        {roadmapData.length > 0 && (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-teal-300"></div>

            {roadmapData.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-start mb-12 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 flex items-center justify-center w-5 h-5 bg-white border-4 border-blue-400 rounded-full z-10 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors duration-300"></div>
                </div>

                {/* Content card */}
                <div className="ml-16 flex-1">
                  <div
                    className={`${
                      colorMap[item.id] || "bg-gray-50"
                    } border-2 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-blue-300`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm text-blue-600">
                        {iconMap[item.id] || <Target className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {item.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5"></div>
                          <span className="text-sm leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
