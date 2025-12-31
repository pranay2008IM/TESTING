import fs from 'fs';
let v=10;
console.log(v);
const array=[1,2,3,4,5];
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element);
}
console.log(getlong(array)+"is the array legth");
function getlong(array){
    return array.length;
}
class Somethig{
    constructor(value){
        this.value=value;
        console.log("started the class with a object");
    }
    getlong(){
        return this.value.length;
    }
}
let object=new Somethig(array);
let value=object.getlong();
console.log(value);
const text=async function getresponse(url) {
    const response=await fetch(url);
    const data= await response.text();
    return data;
}
const data= text("https://chatgpt.com")
const result= await data.then(value=>{
    return value;
})

fs.writeFile("text.txt",result,(err)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("successful");
    }
});

const dataread=fs.readFile("text.txt","utf-8",(err)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("successful");
        
    }
})
console.log(data);
