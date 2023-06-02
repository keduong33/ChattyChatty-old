export class AudioRecorder {
  private mediaStream: MediaStream | undefined;
  private mediaRecorder: MediaRecorder | undefined;
  private recordedChunks: Blob[] = [];
  private speech: Blob | undefined;

  // Function to handle the success callback of getUserMedia
  private handleSuccess = (stream: MediaStream) => {
    // Assign the media stream to the variaz`ble
    this.mediaStream = stream;
    // Create a new MediaRecorder instance
    this.mediaRecorder = new MediaRecorder(this.mediaStream);
    // Event handler for dataavailable event
    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    });
    // Event handler for stop event
    this.mediaRecorder.addEventListener("stop", () => {
      this.saveSpeech();
    });
    // Start recording
    this.mediaRecorder.start();
  };

  // Function to handle the error callback of getUserMedia
  private handleError = (error: Error) => {
    console.error("Error accessing microphone:", error);
  };

  private saveSpeech() {
    // Create a new blob from the recorded chunks & save it
    this.speech = new Blob(this.recordedChunks, { type: "audio/webm" });
    // Reset the recorded chunks
    this.recordedChunks = [];
  }

  public getSpeech(): Blob | undefined {
    return this.speech;
  }

  // Function to start capturing audio
  public startRecording() {
    // Request access to the microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  // Function to stop recording
  public stopRecording() {
    // Stop recording
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.mediaStream?.getTracks().forEach((track) => track.stop());
    }
  }
}
