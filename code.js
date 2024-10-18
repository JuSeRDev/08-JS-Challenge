const outerCircles = document.querySelectorAll(".outerCircle")
const innerCircles = document.querySelectorAll(".innerCircle")

const mortgageTypeOptions = document.querySelectorAll(".mortgageTypeOption")
mortgageTypeOptions.forEach((option, i) =>{
    // FUNCTION
    const updateMortgageSelection = ()=>{
        innerCircles.forEach(inner => inner.style.display = ""); //recorre innerCircles y oculta la clases
        outerCircles.forEach(outer => outer.style.borderColor = ""); //recorre outerCicle y oculta la clases
        outerCircles[i].style.borderColor = "var(--Lime)"
        innerCircles[i].style.display = "flex"
        mortgageTypeOptions.forEach(opt =>{
            opt.style.background = ""
            opt.style.borderColor = ""
        })
        option.style.background = "var(--LimeTransparent)"
        option.style.borderColor = "var(--Lime)"
    }
    
    option.addEventListener("click",()=> updateMortgageSelection())
})

// const libra = document.querySelector(".libra")
const laps = document.querySelectorAll(".lap")
const colorDefault = "var(--Slate100)"
const colorLime = "var(--Lime)"
const colorDark = "var(--Slate900)"
const colorLight = "var(--Slate700)"

const inputs = document.querySelectorAll(".input")
inputs.forEach((input, i)=> {
    input.addEventListener("focus", ()=>{
        laps.forEach(lap => lap.style.background = colorDefault);
        laps[i].style.background = colorLime
        laps[i].style.color = colorDark
    })
    input.addEventListener("blur",()=>{
        laps.forEach(lap => {
            lap.style.background = colorDefault
            lap.style.color = colorLight
            });
    })
})

const buttonCalculate = document.querySelector(".buttonCalculate").addEventListener("click", ()=>{
    inputs.forEach(input=> console.log(input.value))
})