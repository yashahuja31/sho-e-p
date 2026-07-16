import React, { useState, useRef } from "react";
import { Search, Camera, UploadCloud, Sparkles, X, Key } from "lucide-react";

export default function SearchArea({ onSearch, onRecognize, isAnalyzing }) {
  const [textQuery, setTextQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleTextSearchSubmit = (e) => {
    e.preventDefault();
    if (textQuery.trim()) {
      onSearch(textQuery);
    }
  };

  const processImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      
      // Convert to base64 for potential Gemini API usage
      const base64Content = e.target.result.split(",")[1];
      
      // Trigger recognition callback
      onRecognize({
        fileName: file.name,
        mimeType: file.type,
        base64: base64Content,
        fileDataUrl: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="search-section-wrapper fade-in">
      <div className="search-header">
        <h2 className="section-title">
          Recognize & <span className="gradient-text">Search Sneakers</span>
        </h2>
        <p className="section-subtitle">
          Type the model name or upload a photo to find the best prices and authenticity reports
        </p>
      </div>

      <div className="search-grid">
        {/* Text Search Box */}
        <form onSubmit={handleTextSearchSubmit} className="search-card glass-panel">
          <div className="card-indicator"></div>
          <div className="search-icon-wrapper">
            <Search size={22} className="search-icon-color" />
          </div>
          <input
            type="text"
            placeholder="Search by name, style code (e.g. DZ5485-612), or brand..."
            className="search-input-box"
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary search-btn">
            Search
          </button>
        </form>

        {/* Visual Recognition Dropzone */}
        <div 
          className={`dropzone-card glass-panel ${dragActive ? "drag-active" : ""} ${imagePreview ? "has-preview" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {!imagePreview ? (
            <div className="dropzone-content" onClick={() => fileInputRef.current.click()}>
              <div className="upload-icon-container">
                <UploadCloud size={32} className="upload-icon" />
              </div>
              <h3>Drag & Drop Shoe Photo</h3>
              <p>Supports PNG, JPG, WEBP. Or click to browse files.</p>
              <button type="button" className="btn btn-secondary browse-btn">
                <Camera size={16} /> Take / Upload Photo
              </button>
            </div>
          ) : (
            <div className="preview-container">
              <img src={imagePreview} alt="Shoe Preview" className="uploaded-shoe-preview" />
              
              <div className="preview-overlay">
                {isAnalyzing ? (
                  <div className="analysis-status-overlay">
                    <div className="pulse-circle">
                      <Sparkles size={24} className="sparkle-anim" />
                    </div>
                    <p className="analysis-text">AI Recognition Processing...</p>
                  </div>
                ) : (
                  <div className="preview-actions">
                    <button type="button" className="btn btn-danger delete-preview-btn" onClick={clearImage}>
                      <X size={16} /> Remove Photo
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary re-recognize-btn"
                      onClick={() => onRecognize({
                        fileName: selectedFile.name,
                        mimeType: selectedFile.type,
                        base64: imagePreview.split(",")[1],
                        fileDataUrl: imagePreview
                      })}
                    >
                      <Sparkles size={16} /> Re-analyze Shoe
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-section-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .search-header {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .search-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .search-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Search Card Text Input */
        .search-card {
          position: relative;
          display: flex;
          align-items: center;
          padding: 1.5rem;
          gap: 1rem;
          min-height: 180px;
          border-radius: 16px;
        }

        .card-indicator {
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 4px;
          background: var(--accent-gradient);
          border-radius: 0 4px 4px 0;
        }

        .search-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-glass);
        }

        .search-icon-color {
          color: var(--accent-primary);
        }

        .search-input-box {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 1.05rem;
          font-weight: 500;
          outline: none;
          padding: 0.5rem 0;
        }

        .search-input-box::placeholder {
          color: var(--text-muted);
        }

        .search-btn {
          white-space: nowrap;
          padding: 0.75rem 1.75rem;
        }

        /* Dropzone Card */
        .dropzone-card {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          border: 2px dashed var(--border-glass);
          border-radius: 16px;
          cursor: pointer;
          transition: all var(--transition-normal);
          overflow: hidden;
          position: relative;
        }

        .dropzone-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }

        .dropzone-card.drag-active {
          border-color: var(--accent-primary);
          background: rgba(0, 242, 254, 0.05);
          transform: scale(1.02);
        }

        .dropzone-card.has-preview {
          cursor: default;
          border-style: solid;
          padding: 0;
        }

        .dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          width: 100%;
        }

        .upload-icon-container {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .upload-icon {
          color: var(--accent-secondary);
        }

        .dropzone-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .dropzone-content p {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .browse-btn {
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
        }

        /* Preview State */
        .preview-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .uploaded-shoe-preview {
          max-width: 100%;
          max-height: 200px;
          object-fit: contain;
          border-radius: 12px;
        }

        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-fast);
        }

        .preview-container:hover .preview-overlay {
          opacity: 1;
        }

        .preview-actions {
          display: flex;
          gap: 0.75rem;
        }

        /* Analysis Spinner Overlay */
        .analysis-status-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 12, 20, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          z-index: 10;
        }

        .pulse-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.5);
          animation: pulseScale 1.5s infinite ease-in-out;
        }

        .sparkle-anim {
          animation: rotateSparkle 3s infinite linear;
        }

        .analysis-text {
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
          font-size: 0.9rem;
        }

        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 35px rgba(0, 242, 254, 0.7);
          }
        }

        @keyframes rotateSparkle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Gemini Config Panel */
        .gemini-config-panel {
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          border-color: rgba(0, 242, 254, 0.1);
        }

        .config-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .config-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .sparkle-green {
          color: var(--accent-primary);
        }

        .btn-toggle-key-input {
          background: none;
          border: none;
          color: var(--accent-secondary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.85rem;
        }

        .btn-toggle-key-input:hover {
          text-decoration: underline;
        }

        .config-body {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-weight: 500;
        }

        .checkbox-label input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent-primary);
        }

        .key-input-field {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 400px;
        }

        .key-input-field .form-input {
          padding-left: 2.25rem;
          font-family: monospace;
          font-size: 0.85rem;
        }

        .key-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-muted);
        }

        .key-help-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
