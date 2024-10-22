const outerCircles = document.querySelectorAll(".outerCircle")
const innerCircles = document.querySelectorAll(".innerCircle")

const mortgageTypeOptions = document.querySelectorAll(".mortgageTypeOption")

mortgageTypeOptions.forEach((option, i)=>{
    option.addEventListener("click", ()=>{
        if (innerCircles[i].style.display == "") {
            outerCircles[i].style.borderColor = "var(--lime)"
            innerCircles[i].style.display = "flex"
            option.style.background = "var(--LimeTransparent)"
            option.style.borderColor = "var(--Lime)"
        } else {
            outerCircles[i].style.borderColor = ""
            innerCircles[i].style.display = ""
            option.style.background = ""
            option.style.borderColor = ""
        }
    })
})

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

const clearAll = document.querySelector(".clearAll").addEventListener("click", ()=> inputs.forEach(input => input.value = ""))


const container2 = document.querySelector(".container2")
const container3 = document.querySelector(".container3")
const money = document.querySelector(".money")
const totalYoullRepay = document.querySelector(".totalYoullRepay")

const repaymentDiv = document.querySelector(".repaymentDiv")
const total = document.querySelector(".total")

const InterestOnlyDiv = document.querySelector(".InterestOnlyDiv")
const monthly = document.querySelector(".monthly")

const buttonCalculate = document.querySelector(".buttonCalculate").addEventListener("click", ()=>{
    let mortgageAmount
    let mortgageTerm
    let interestRate

    mortgageAmount = parseFloat(inputs[0].value.replace(/\./g, '').replace(',', '.'))
    mortgageTerm = parseInt(inputs[1].value)
    interestRate = parseFloat(inputs[2].value)

    const areInputsValid = inputs[0].value !== "" && inputs[0].value !== "0" && inputs[1].value !== "" && inputs[1].value !== "0" && inputs[2].value !== ""

    const isDivSelected = repaymentDiv.style.background === "var(--LimeTransparent)" || InterestOnlyDiv.style.background === "var(--LimeTransparent)";

    const required = document.querySelectorAll(".required")
    if (areInputsValid && isDivSelected) {
        container2.style.display = "none";
        container3.style.display = "flex";
    } else {
        container2.style.display = "";
        container3.style.display = "none";
    }
    inputs.forEach((input, i)=>{
        if (input.value === "") {
            required[i].style.display = "flex"
        } else {
            required[i].style.display = "none"
        }
    })

    console.log("este es el valor de mortgageAmount", mortgageAmount)

    let interesMensual = (interestRate / 100) / 12

    let numeroTotalPagos = mortgageTerm * 12

    let formula1 = (1 + interesMensual) ** numeroTotalPagos
    let formula2 = interesMensual * formula1
    let formula3 = formula1 - 1

    let pagoMensual = mortgageAmount * formula2 / formula3

    let pagoTotalConIntereses = parseFloat(pagoMensual * numeroTotalPagos)

    // container2.style.display = "none"
    // container3.style.display = "flex"

    const numberFormat = new Intl.NumberFormat('es-ES');

    console.log("Pago mensual sin formatear:", pagoMensual);
    console.log("Pago total sin formatear:", pagoTotalConIntereses);

    let pagoMensualFormateado = parseFloat(pagoMensual.toFixed(2)).toLocaleString('en')
    let pagoTotalConInteresesFormateado = parseFloat(pagoTotalConIntereses.toFixed(2)).toLocaleString('en')
    
    console.log("Pago mensual formateado:", pagoMensualFormateado);
    console.log("Pago total formateado:", pagoTotalConInteresesFormateado);

    money.textContent = `£${pagoMensualFormateado}`
    totalYoullRepay.textContent = `£${pagoTotalConInteresesFormateado}`


    const toggleDisplay = (backgroundDiv, targetElement) => {
        targetElement.style.display = backgroundDiv.style.background === "var(--LimeTransparent)" ? "block" : "none";
    }

    toggleDisplay(repaymentDiv,total)
    toggleDisplay(InterestOnlyDiv,monthly)

})