function correctfn(string, wrong, correct) {
  let regex = new RegExp(wrong, 'g');
  return string.replace(regex, correct);
}

let sentence = "I love Javascript";
console.log(correctfn(sentence, "Javascript", "India"));