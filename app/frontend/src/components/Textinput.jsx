import { useState } from "react";
import '../styling/textinput.css'
function Textinput({onsettextinput}){
    const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    onsettextinput(text);
  };

    return (
        <div className="inputareatext">
        <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder=" Ask Anything."
      />
      <p className="infor">no image gen capabiliy yet.<br/>will be added soon..</p>
        </div>
    );
}
export default Textinput;