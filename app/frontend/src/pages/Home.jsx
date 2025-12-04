import Header from "../components/Header";
import PromptInput from "../components/PromptInput";
import '../styling/home.css';
import ChooseStyle from "../components/ChooseStyle";
import Generate from "../components/Generate";
import { useState } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
function Home(){

    const[imageid,setimageid]=useState(null);
    const[image,setiamge]=useState(null);
    //const[loading,isloading]=useState(null);


    return(
        <div className="homepage">
            <Header/> 
            <Banner />
            <PromptInput onsetimage={setiamge}/>
            <ChooseStyle onset={setimageid}/>
            {image&&imageid?(<Generate senddata={imageid}/>):(<p>upload the image and choose the style please</p>)}
            <Footer/>
        </div>
    )
}
export default Home;