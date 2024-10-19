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

    if (input.classList.contains("input3")) {
        input.addEventListener("input", (e) => {
            let currentValue = e.target.value;
            
            if (/^\d*\.?\d*$/.test(currentValue)) {
                e.target.value = currentValue;
            } else {
                e.target.value = currentValue.slice(0, -1);
            }
        })
    } else{
        input.addEventListener("input", (e)=>{
            let currentValue = e.target.value;
            let numericValue = currentValue.replace(/[^0-9]/g, '');
            let formattedValue = new Intl.NumberFormat('es-ES').format(numericValue);
            e.target.value = formattedValue;
        })
    }

})

const buttonCalculate = document.querySelector(".buttonCalculate").addEventListener("click", ()=>{
    let mortgageAmount
    let mortgageTerm
    let interestRate
    inputs.forEach((input, i)=> {
        mortgageAmount = parseFloat(inputs[0].value)
        mortgageTerm = parseInt(inputs[1].value)
        interestRate = parseFloat(inputs[2].value)
    })

    let interesMensaual = interestRate / 100/ 12 //0.00437
    console.log("interes mensual", interesMensaual);

    let numeroTotalPagos = mortgageTerm * 12 //300
    let formula1 = (1 + interesMensaual)**numeroTotalPagos
    let formula2 = interesMensaual * formula1
    let formula3 = formula1 - 1
    let pagoMensual = mortgageAmount * (formula2 / formula3)

    let pagoTotalConIntereses = pagoMensual * numeroTotalPagos
    console.log("Total a pagar", parseFloat(pagoTotalConIntereses.toFixed(2)))

})