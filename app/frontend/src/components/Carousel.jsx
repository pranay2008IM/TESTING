import { useState } from "react";
import images from "../data/images.json";
import '../styling/carousel.css';
export default function Carousel({onset}) {
  const [selectedid,setSelectedid]=useState(null);
  function optionchoosen(event){
    const button=event.target.closest("button");
    const id=button.dataset.id;
    setSelectedid(id);
    console.log(id);
    onset(id);
  }
  return (
    <div style={{ display: "flex", gap: "20px",justifyContent:"center",flexDirection:"row", flexWrap:"wrap" }}>
      {images.map((item) => (
        <div>
          <button className={selectedid==item.id?"selected-style":"style-btn"}title={item.name} type="button" name={item.id}  data-id={item.id} data-name={item.name} onClick={optionchoosen}>
        <img
          key={item.id}
          src={item.url}
          alt={item.name}
          className="divclass"

        /></button>
        <p style={{textAlign:"center",marginTop:"6px",fontSize:"20px",fontFamily: '"Barlow Condensed", sans-serif'}}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
