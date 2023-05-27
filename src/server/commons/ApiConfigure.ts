import { Configuration, OpenAIApi } from "openai";
import { getAPIKEY } from "./secrets";

export default function ApiConfigure(): OpenAIApi {
  const configuration = new Configuration({
    apiKey: getAPIKEY(),
  });

  const openai = new OpenAIApi(configuration);

  return openai;
}
