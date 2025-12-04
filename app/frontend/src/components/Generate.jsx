import { useState } from 'react';
import '../styling/gen.css';

function Generate({senddata}){
    const[buttondisable,setbuttondisable]=useState(false);
    async function ff(){
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.google.com');
                const response = await fetch(proxyUrl);

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.text();
                setbuttondisable(true);
                console.log(data);
        } catch (error) {
             console.error('Failed to fetch dog:', error);
        }

    }
    return(
        <div className="generatediv">
         <button onClick={ff}>{senddata}
           Generate</button>
        </div>
    )
}
export default Generate;