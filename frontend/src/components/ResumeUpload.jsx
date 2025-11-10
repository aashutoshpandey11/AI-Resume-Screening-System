import React, { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState({ skills: [], score: 0 }); // safe default

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/upload_resume/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      const data = await res.json();

      // Ensure skills and score exist
      setResult({
        skills: data.result?.skills || [],
        score: data.result?.score || 0,
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file. Please try again.");
      setResult({ skills: [], score: 0 }); // reset safely
    }
  };

  return (
    <div>
      <h2>Upload Your Resume</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Resume</button>

      {result && (result.skills.length > 0 || result.score > 0) && (
        <div style={{ marginTop: "20px" }}>
          <h3>Skills Extracted:</h3>
          <ul>
            {result.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3>Score: {result.score}</h3>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
