export class AudioRecorder {
  private mediaStream: MediaStream | undefined;
  private mediaRecorder: MediaRecorder | undefined;
  private recordedChunks: Blob[] = [];
  private speech: Blob | undefined;
  // private text = "";

  private handleSuccess = (stream: MediaStream) => {
    this.mediaStream = stream;
    this.mediaRecorder = new MediaRecorder(this.mediaStream);

    // Event handler for dataavailable event --> when it recorded sth
    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    });

    // Event handler for stop event
    this.mediaRecorder.addEventListener("stop", () => {
      this.saveSpeech();
    });

    this.mediaRecorder.start();
  };

  private handleError = (error: Error) => {
    console.error("Error accessing microphone:", error);
  };

  private saveSpeech() {
    this.speech = new Blob(this.recordedChunks, { type: "audio/wav" });
    this.recordedChunks = []; //reset temporary chunks
  }

  public getSpeech(): Blob | undefined {
    return this.speech;
  }

  public startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true }) // Request access to the microphone
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  public stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.mediaStream?.getTracks().forEach((track) => track.stop());
    }
  }

  public playRecording() {
    if (this.speech) {
      const audio = new Audio();
      const speechUrl = URL.createObjectURL(this.speech);
      audio.src = speechUrl;
      audio.play();
    } else {
      console.error("No recorded speech available.");
    }
  }
}
