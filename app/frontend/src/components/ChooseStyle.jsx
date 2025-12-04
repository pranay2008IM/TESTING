import Carousel from "./Carousel";

function ChooseStyle({onset}){
    return(
        <div>
        <h3 style={{fontFamily: '"Barlow Condensed", sans-serif',textAlign:"center"}}>PICK A STYLE</h3>
        <Carousel onset={onset}/>
        </div>
    )
}
export default ChooseStyle;