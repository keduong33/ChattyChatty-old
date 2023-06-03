import { AxiosResponse } from "axios";

export function getResponseContent(
  response: AxiosResponse
): string | undefined {
  return response.data.choices[0].message.content;
}
