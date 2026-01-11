import { useState } from "react";
import "../styling/gen.css";

function Ge({ senddata }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [textinputfield,settextf]=useState("");

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
    formData.append("text",senddata.textinput);

    try {
      const res = await fetch("https://testing-1-gn0w.onrender.com/api/generation", {
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
          <p><strong>generated:</strong></p>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Ge;
