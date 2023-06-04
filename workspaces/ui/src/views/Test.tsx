import React from "react";
import { AudioRecorder } from "../handlers/audioRecorder";

const audioRecorder = new AudioRecorder();

function Test() {
  return (
    <div>
      <div>Test</div>
      <div id="inputdevices"></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
        type="button"
        onClick={() => {
          audioRecorder.startRecording();
        }}
      >
        Start
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
        type="button"
        onClick={() => {
          audioRecorder.stopRecording();
        }}
      >
        End
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
        type="button"
        onClick={() => {
          audioRecorder.playRecording();
        }}
      >
        Play
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit"
        type="button"
        onClick={() => {
          responsiveVoice.speak("Hello");
        }}
      >
        Test
      </button>
    </div>
  );
}

export default Test;
