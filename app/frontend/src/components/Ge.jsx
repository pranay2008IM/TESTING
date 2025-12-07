import { useState } from 'react';
import '../styling/gen.css';
import { use } from 'react';

function Ge({senddata}){
    const[isgenerating,setisgenerating]=useState(false);
    const[generatedimage,setgeneratedimage]=useState(null);
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = generatedimage; // your image URL or blob URL
        link.download = "generated-image.png"; // filename
        link.click();
    };


    const genrateimage = async () => {

        setisgenerating(true);
        const formdata=new FormData();
        formdata.append("image",senddata.image);
        formdata.append("id",senddata.imageid);

        try{

        
        const res = await fetch("http://localhost:5000/api/generation", {
        method: "POST",
        body:formdata
        });

        const blob = await res.blob();
        const imageUrl=URL.createObjectURL(blob);
        setgeneratedimage(imageUrl);


    }
    catch(err){
        alert("error occureed");
    }
    setisgenerating(false);
    };
    
    return(
        <div className="generatediv">
         <button disabled={isgenerating} className={isgenerating ? "disabled" : ""} onClick={genrateimage}>
           Generate</button>
        {isgenerating&&(<div className="imagediv">
            <div className="actualimage">
            <img src={generatedimage} alt="generatedimg"/>
            </div>
            </div>)}
        {isgenerating&&
        <button onClick={handleDownload} disabled={!generatedimage}>
            Download
        </button>}
        </div>
    )
}
export default Ge;