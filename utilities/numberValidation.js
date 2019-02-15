export default numberValidation = (text, field, fieldLength, num1, num2) => {
  let charCode
  if (text.length > 0) charCode = text[text.length - 1].charCodeAt(0)
  if (text.length > 0 && (charCode < 48 || charCode > 57)) text = text.slice(0, (text.length - 1))
  if(fieldLength){
    if (text.length > fieldLength) { //checks if deleting, don't add '-'
      if ((num1 && text.length === num1) || (num2 && text.length === num2)) text += '-'
    }
  }

  if(field === 'date' || field === 'birthdate'){
    if (text.length === 1 && Number(text[0]) > 3) text = ''
    if (text.length === 4 && Number(text[3] > 1)) text = text.slice(0, (text.length - 1))
    if (text.length === 7 && Number(text[6] > 2)) text = text.slice(0, (text.length - 1))
  }

  return text
}