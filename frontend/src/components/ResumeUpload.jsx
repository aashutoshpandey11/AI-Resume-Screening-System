import React, { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/upload_resume/", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Resume</button>

      {result && (
        <div>
          <h3>Skills Extracted:</h3>
          <ul>
            {result.skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
          <h3>Score: {result.score}</h3>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
