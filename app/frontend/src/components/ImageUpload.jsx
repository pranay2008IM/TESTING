import { useState } from "react";
import '../styling/imageupload.css';
function ImageUpload({onsetimage}) {
  const [image, setImage] = useState(null);
  const [imagestore,setImagestore]=useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
    setImage(URL.createObjectURL(file)); 
    setImagestore(file)
    onsetimage(file)
    }
  };

  const handleFileSelect = (e) => {
    handleUpload(e.target.files[0]);
  };

  // DRAG EVENTS
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
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Upload an Image</h2>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          maxWidth:"450px",
          minWidth:"200px",
          height: "200px",
          borderRadius: "16px",
          border: dragActive
            ? "2px dashed #ffffff"
            : "2px dashed rgba(255,255,255,0.3)",
          background: dragActive
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <p style={{ opacity: 0.8 }}>Drag & Drop your image here</p>

        <label
          style={{
            marginTop: "15px",
            background: "#ffffff10",
            border: "1px solid #ffffff30",
            padding: "10px 26px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          Choose File
          <input type="file" style={{ display: "none" }} onChange={handleFileSelect} />
        </label>
      </div>

      {image && (
        <div className="imageuploaddiv"
        >
          <img
            src={image}
            alt="Preview"
            className="imagestyle"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
