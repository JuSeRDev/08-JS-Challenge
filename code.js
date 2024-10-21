const outerCircles = document.querySelectorAll(".outerCircle")
const innerCircles = document.querySelectorAll(".innerCircle")

const mortgageTypeOptions = document.querySelectorAll(".mortgageTypeOption")
// mortgageTypeOptions.forEach((option, i) =>{
//     // FUNCTION
//     const updateMortgageSelection = ()=>{
//         // innerCircles.forEach(inner => inner.style.display = ""); //recorre innerCircles y oculta la clases
//         // outerCircles.forEach(outer => outer.style.borderColor = ""); //recorre outerCicle y oculta la clases
//         outerCircles[i].style.borderColor = "var(--Lime)"
//         innerCircles[i].style.display = "flex"
//         mortgageTypeOptions.forEach(opt =>{
//             opt.style.background = ""
//             opt.style.borderColor = ""
//         })
//         option.style.background = "var(--LimeTransparent)"
//         option.style.borderColor = "var(--Lime)"
//     }
    
//     option.addEventListener("click",()=> updateMortgageSelection())
// })

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
    inputs.forEach((input, i)=> {
        mortgageAmount = parseFloat(inputs[0].value.replace(/\./g, '').replace(',', '.'))
        mortgageTerm = parseInt(inputs[1].value)
        interestRate = parseFloat(inputs[2].value)
    })

    console.log("este es el valor de mortgageAmount", mortgageAmount)

    let interesMensual = (interestRate / 100) / 12

    let numeroTotalPagos = mortgageTerm * 12

    let formula1 = (1 + interesMensual) ** numeroTotalPagos
    let formula2 = interesMensual * formula1
    let formula3 = formula1 - 1

    let pagoMensual = mortgageAmount * formula2 / formula3

    let pagoTotalConIntereses = parseFloat(pagoMensual * numeroTotalPagos)

    container2.style.display = "none"
    container3.style.display = "flex"

    const numberFormat = new Intl.NumberFormat('es-ES');

    console.log("Pago mensual sin formatear:", pagoMensual);
    console.log("Pago total sin formatear:", pagoTotalConIntereses);

    let pagoMensualFormateado = numberFormat.format(pagoMensual.toFixed(2))
    let pagoTotalConInteresesFormateado = numberFormat.format(pagoTotalConIntereses.toFixed(2))

    console.log("Pago mensual formateado:", pagoMensualFormateado);
    console.log("Pago total formateado:", pagoTotalConInteresesFormateado);

    money.textContent = `£${pagoMensualFormateado}`
    totalYoullRepay.textContent = `£${pagoTotalConInteresesFormateado}`

    if (repaymentDiv.style.background == "var(--LimeTransparent)") {
        console.log("abrete");
        total.style.display = "block"
    } else {
        total.style.display = "none"
    }
    
    if (InterestOnlyDiv.style.background == "var(--LimeTransparent)") {
        monthly.style.display = "block"
    } else {
        monthly.style.display = "none"
    }
})