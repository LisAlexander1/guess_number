import './style.css'

const min = 0
const max = 1000
const attemptsCount = String(max-min).length+1
let hiddenNumber = generateNumber(min,max)

let input = document.querySelector<HTMLInputElement>(".number")!
input.min = String(min);
input.max = String(max);
document.querySelector<HTMLSpanElement>(".min")!.innerHTML = String(min);
document.querySelector<HTMLSpanElement>(".max")!.innerHTML = String(max);

let attemptsLeft = attemptsCount;
let attempts = document.querySelector<HTMLSpanElement>(".attempts")!
attempts.innerHTML = String(attemptsLeft)

let hint = document.querySelector<HTMLInputElement>(".hint")!
hint.innerHTML = ""

let guessButton = document.querySelector<HTMLButtonElement>(".guess")!

function generateNumber(min : number, max : number) : number {
  return Math.ceil(Math.random()*(max-min));
}

function focusOnInput() : undefined {
  input.value = "";
  input.focus()
}

function disableControl() : undefined {
  guessButton.disabled = true
  input.readOnly = true
}

function checkAnswer(input : string) : number {
  let input_number = parseInt(input)
  let out = hiddenNumber-input_number
  return out && Math.sign(out);
}

guessButton.addEventListener("click", function() : undefined {
  console.log(hiddenNumber)
  let answer = input.value;
  hint.classList.remove("hide")
  hint.classList.add("show")
  if (answer == "") {
    hint.innerHTML = "Число не введено"
    return
  }
  attemptsLeft -= 1
  attempts.innerHTML = String(attemptsLeft)
  switch (checkAnswer(answer)) {
    case -1:
      focusOnInput()
      hint.innerHTML = "Число меньше"
      break;
    case 1:
      focusOnInput()
      hint.innerHTML = "Число больше"
      break;
    case 0:
        hint.innerHTML = "Это правильный ответ"
        disableControl()
        break;
    default:
      break;
  }

  if (attemptsLeft == 0) {
    disableControl()
  }
})

document.querySelector<HTMLButtonElement>(".reset")!.addEventListener("click", function() : undefined {
  hiddenNumber = generateNumber(min,max)
  hint.classList.remove("show")
  hint.classList.add("hide")
  focusOnInput()
  guessButton.disabled = false
  input.readOnly = false
  attemptsLeft = attemptsCount;
})

