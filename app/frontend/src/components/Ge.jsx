import { useState } from "react";
import "../styling/gen.css";

function Ge({ senddata }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  // 🔒 SAFETY CHECK
  if (!senddata) {
    return <p>No input data provided</p>;
  }

  const generate = async () => {
    setIsGenerating(true);

    const formData = new FormData();

    // 🔒 EXTRA SAFETY
    if (senddata.image) {
      formData.append("image", senddata.image);
    }

    formData.append("id", senddata.imageid ?? "test-id");

    try {
      const res = await fetch("http://localhost:5000/api/generation", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setGeneratedText(data.message);

    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }

    setIsGenerating(false);
  };

  return (
    <div className="generatediv">
      <button onClick={generate} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate"}
      </button>

      {generatedText && (
        <div className="imagediv">
          <p><strong>Gemini says:</strong></p>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Ge;
