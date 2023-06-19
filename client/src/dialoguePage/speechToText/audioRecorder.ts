export class AudioRecorder {
  private mediaStream: MediaStream | undefined;
  private mediaRecorder: MediaRecorder | undefined;
  private recordedChunks: Blob[] = [];
  private speech: Blob | undefined;
  private speechUrl = "";
  // private text = "";

  public startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true }) // Request access to the microphone
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

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
    this.saveSpeechURL();
    this.recordedChunks = []; //reset temporary chunks
  }

  public saveSpeechURL() {
    if (this.speech) {
      this.speechUrl = URL.createObjectURL(this.speech);
    }
  }

  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return b as File;
  };

  public async getSpeech() {
    const speech = await this.speech?.text();
    return speech;
  }

  public getSpeechURL(): string {
    return this.speechUrl;
  }

  public stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.mediaStream?.getTracks().forEach((track) => track.stop());
    }
  }

  public playRecording() {
    if (this.speechUrl) {
      const audio = new Audio();
      audio.src = this.speechUrl;
      audio.play();
    } else {
      console.error("No recorded speech available.");
    }
  }
}
