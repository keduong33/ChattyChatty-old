import { Configuration, OpenAIApi } from "openai";

export default function apiConfigure(): OpenAIApi {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return openai;
}
