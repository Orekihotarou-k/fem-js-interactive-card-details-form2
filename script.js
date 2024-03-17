// get input elements
const userName = document.getElementById("userName")
const userNumber = document.getElementById("userNumber")
const inputDate = document.getElementById("inputDate")
const inputYear = document.getElementById("inputYear")
const cvc = document.getElementById("cvc")
const form = document.querySelector("form")


// get output elemnts
const cardNumber = document.querySelector(".card-number")
const personName = document.querySelector(".user-name")
const issueDate = document.querySelector(".date")
const cardBack = document.querySelector(".card-back--details")

let allInputsValid = true; 

form.addEventListener("submit", (e) => {
  e.preventDefault();

   allInputsValid = true;  

    // handle the date inputs
    const currentDate = [inputDate, inputYear]
    const errorMessageDate = document.querySelector(".date-error")

    currentDate.forEach(dateInput => {
       const dateInputValue = dateInput.value
        if (dateInput.value === "" || dateInputValue.length > 2 ) {
            errorMessageDate.innerText = "invalid entry"
            dateInput.classList.add("error")
            allInputsValid = false;  
            return
        } else {
            errorMessageDate.innerText = ""
            dateInput.classList.remove("error")
        }
    }) 

    // ensure that the proper date has been entered
    const year = parseInt(inputYear.value);
    const currentYearLastTwoDigits = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of current year

    if (year < parseInt(currentYearLastTwoDigits)) {
      errorMessageDate.innerHTML = "Exp. date must be in the future";
      inputYear.classList.add("error")
      allInputsValid = false;
      return
    }

    // ensure proper entries for the month input
    if (inputDate.value >= 13) {
        errorMessageDate.innerHTML = "Enter a valid date"
        inputDate.classList.add("error")
        allInputsValid = false;
        return
    } 

     // handle the empty input fields

    const otherInputs = [userName, cvc]

    otherInputs.forEach(input => {
        const errorMessage = input.parentElement.querySelector("small")

        if (input.value === "") {
            errorMessage.innerText = "can't be empty"
            input.classList.add("error")
            allInputsValid = false;
            return
        } else {
            errorMessage.innerText = ""
            input.classList.remove("error")
        }
    })  
    

  // check if the input field value is > or <  16 characters  
  const cardNumberValue = userNumber.value;

  // Validate card number length (16 characters)
  if (cardNumberValue.length !== 16) {
    displayError(userNumber, "Entry must be 16 characters")
    allInputsValid = false;
    return
  }

  // Display confirmation only if allInputsValid is true
  if (allInputsValid) {
    displayConfirmation();
  }
});

function displayError(element, message) {
  const errorMessage = element.parentElement.querySelector("small");
  errorMessage.innerText = message;
  element.classList.add("error");
}

const confirmation = document.querySelector(".card-input--completed")

function displayConfirmation() {

  form.style.display = "none";
  confirmation.classList.add("visible");
  personName.textContent = userName.value
  cardNumber.textContent = userNumber.value
  issueDate.textContent = inputDate.value + "/" + inputYear.value
  cardBack.textContent = cvc.value 
}


// reset the form
const resetBtn = document.querySelector(".reset-btn")
resetBtn.addEventListener("click", () => {
    confirmation.classList.remove("visible")
    form.style.display = "block"

    form.reset()
    cardNumber.textContent = "0000 0000 0000 0000";
    personName.textContent = "JANE APPLESEED";
    issueDate.textContent = "00/00";
    cardBack.textContent = "000";
})

