import { useState } from 'react';
import '../styling/gen.css';
import { use } from 'react';

function Generate({senddata}){
    const[isgenerating,setisgenerating]=useState(false);
    const[generatedimage,setgeneratedimage]=useState(false);
      const testGet = async () => {
        const res = await fetch("https://testing-r9d9.onrender.com/");
        const data = await res.text();
        alert(data);
    };

    const genrateimage = async () => {
        setisgenerating(true);
        try{

        
        const res = await fetch("https://testing-r9d9.onrender.com/api/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: "Pranay" })
        });
   

        const data = await res.json();
        alert(data.message); 
        setgeneratedimage(true);

    }
    catch(err){
        alert("error occureed");
    }
    setisgenerating(false);
    setgeneratedimage(false);
    };
    
    return(
        <div className="generatediv">
         <button disabled={isgenerating} className={isgenerating ? "disabled" : ""} onClick={genrateimage}>{senddata}
           Generate</button>
        {generatedimage?(<div className="imagediv"><h1>image div here</h1></div>):(<div></div>)}
        </div>
    )
}
export default Generate;