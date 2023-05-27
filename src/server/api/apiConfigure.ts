import { Configuration, OpenAIApi } from "openai";
import { getAPIKEY } from "../commons/secrets";

export default function apiConfigure(): OpenAIApi {
  const configuration = new Configuration({
    apiKey: getAPIKEY(),
  });

  const openai = new OpenAIApi(configuration);

  return openai;
}
