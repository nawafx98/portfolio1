import React, { useState } from "react";
import "./AIFeature.scss";
import { analyzeResume } from "../../services/apiService"; // Ensure this path is correct

const AIFeature = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async () => {
    if (resumeFile) {
      setIsAnalyzing(true);
      try {
        const result = await analyzeResume(resumeFile);
        setAnalysisResult(result.analysis);
      } catch (error) {
        console.error("There was an error analyzing the resume:", error);
        setAnalysisResult("Error analyzing resume. Please try again.");
      }
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="ai-feature-section" id="ai-feature">
      <h1 className="ai-feature-heading">Give Your Resume a Boost!</h1>
      <div className="ai-feature-content">
        <p>Hello! 👋 I love making AI do cool stuff, like helping you with your resume. Upload yours, and let's see how we can make it shine together. It's quick, easy, and who knows? It might just help you land your dream job.</p>
        <p>Just a click, and you'll get tips to help your resume stand out.</p>
        <div className="file-upload-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            {isAnalyzing ? "Checking…" : "Choose File"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="file-input"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isAnalyzing}
          />
          <span className="file-name">{fileName}</span>
          <button onClick={handleSubmit} disabled={isAnalyzing || !resumeFile}>
            Analyze Resume
          </button>
        </div>
        {analysisResult && (
          <div className="ai-feature-results">
            <h2>Analysis Results:</h2>
            <p>{analysisResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFeature;
