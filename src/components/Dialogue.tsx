import { ChangeEvent, useState } from "react";

import { Configuration, OpenAIApi } from "openai";

function Dialogue() {
  const [prompt, setPrompt] = useState("");

  function updatePrompt(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value);
  }

  return (
    <div>
      <div className="text-4xl text-red-600">Chatbot!</div>
      <div>
        <input
          className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="prompt"
          type="text"
          value={prompt}
          onChange={updatePrompt}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
          type="button"
          onClick={() => console.log(prompt)}
        >
          Click
        </button>
      </div>
    </div>
  );
}

export default Dialogue;
