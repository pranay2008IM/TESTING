import { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div style={{ display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",padding: "20px",textAlign:"center",alignContent:"center",color:"white" }}>
      <h2>Upload an Image</h2>
      <h3>Drag and drop your image here</h3>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload}
        
      />

      {image && (
        <div style={{ marginTop: "20px",display: "flex", 
    justifyContent: "center", 
    alignItems: "center"}}>
          <img 
            src={image} 
            alt="Preview" 
            style={{ width: "300px", borderRadius: "10px",boxShadow: "0 0 20px rgba(255, 255, 255, 1)",   // glow added
    borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
