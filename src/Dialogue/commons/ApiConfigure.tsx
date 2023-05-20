import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import { getAPIKEY } from "./secrets";

export default function ApiConfigure(): OpenAIApi {
  const configuration = new Configuration({
    apiKey: getAPIKEY(),
  });

  const openai = new OpenAIApi(configuration);

  return openai;
}
