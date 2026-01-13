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
    formData.append("text",senddata.textinput);

    try {
      const token =sessionStorage.getItem("token");
      if(!token){
        alert("session expired ,reload the page");
        setIsGenerating(false);
        return;
      }
      const res = await fetch("https://testing-1-gn0w.onrender.com/api/generation", {
        method: "POST",
        headers:{
          Authorization:`Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          sessionStorage.removeItem("token");
          throw new Error("Unauthorized. Please refresh.");
        }
        throw new Error("Server error");
      }

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
