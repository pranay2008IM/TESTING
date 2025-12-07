import ImageUpload from "./ImageUpload";
import '../styling/PromptInput.css';
function PromptInput({onsetimage}){

    return(
        <div className="inputarea">
            <ImageUpload onsetimage={onsetimage}/>
        </div>
    )
}
export default PromptInput;
