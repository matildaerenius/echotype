import axios from "axios";
import { useState } from "react";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data);
    } catch (error) {
      console.error("Error transcribing audio. error");
    }
  };

  return (
    <div className="container">
      <h1>EchoType</h1>
      <div className="file-input">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        Upload and Transcribe
      </button>
      <div className="transcription-result">
        <div className="transcription-title">
          <span>📝</span> <span>Transcription Result</span>
        </div>

        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioUploader;
