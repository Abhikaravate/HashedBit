function countWords(paragraph) {
  if (!paragraph.trim()) return 0;
  return paragraph.trim().split(/\s+/).length;
}

console.log(countWords("This is a sample paragraph."));