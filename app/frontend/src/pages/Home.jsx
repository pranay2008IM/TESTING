import Header from "../components/Header";
import PromptInput from "../components/PromptInput";
import '../styling/home.css';
import ChooseStyle from "../components/ChooseStyle";
import Generate from "../components/Generate";
import { useState } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Carsou from "../components/Carsou";
function Home(){

    const[imageid,setimageid]=useState(null);
    const[image,setiamge]=useState(null);
    const[isloading,setisloading]=useState(false);
    const[isdisable,setisdisable]=useState(false);
    //const[loading,isloading]=useState(null);


    return(
        <div className="homepage">
            <Header/> 
            <Banner />
            <PromptInput onsetimage={setiamge}/>
            <Carsou/>
            {image&&imageid?(<Generate senddata={imageid}/>):(<p>upload the image and choose the style please</p>)}
            <Footer/>
            
        </div>
    )
}
export default Home;