let sliderBtnLeft = document.getElementById("slide-btn-left")
let slideBtnRight = document.getElementById("slide-btn-right")
let imgItem = document.querySelectorAll(".image-item")

console.log(imgItem.length-1)

let startSlider = 0
let endSlider = (imgItem.length -1) * 100 // 700


sliderBtnLeft.addEventListener("click",()=>{

    if(startSlider <= 0){
        startSlider = startSlider - 100;
    }
   
    imgItem.forEach(element =>{
        element.Style.transform = `translateX(${startSlider}%)`;
    })


})
slideBtnRight.addEventListener("click",()=>{})

    if(startSlider >= -endSlider+100){
        startSlider = startSlider - 100;
    }

    imgItem.forEach(element =>{
         element.Style.transform = `translateX(${startSlider}%)`;
    })
