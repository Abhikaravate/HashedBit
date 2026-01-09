const input = [
  { student1: { subject1: 44, subject2: 56, subject3: 87, subject4: 97, subject5: 37 } },
  { student2: { subject1: 44, subject2: 56, subject3: 87, subject4: 97, subject5: 37 } },
  { student3: { subject1: 44, subject2: 56, subject3: 87, subject4: 97, subject5: 37 } }
];

const result = input.map(obj => {
  const studentKey = Object.keys(obj)[0];
  const subjects = obj[studentKey];
  const scores = Object.values(subjects);
  
  const total = scores.reduce((sum, score) => sum + score, 0);
  const avg = total / scores.length;

  return { [studentKey]: { average: avg } };
});

console.log(result);