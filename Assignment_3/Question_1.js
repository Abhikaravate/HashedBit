const states = ["Andhra Pradesh", "Bihar", "Odisha", "Uttar Pradesh", "Goa", "Gujarat", "Assam"];

const filteredStates = states.filter(state => {
  const firstChar = state.charAt(0).toUpperCase();
  return !['A', 'E', 'I', 'O', 'U'].includes(firstChar);
});

console.log(filteredStates);