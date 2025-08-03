import "dotenv/config";
import fetch from "node-fetch";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );
    const data = await response.json();
    if (!data?.choices?.[0]?.message?.content) {
      // console.error("OpenRouter returned no content", data);
      console.log("OpenRouter FULL RESPONSE:", JSON.stringify(data, null, 2));
      return null;
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter fetch error:", err);
    return null;
  }
};

export default getOpenAIAPIResponse;
