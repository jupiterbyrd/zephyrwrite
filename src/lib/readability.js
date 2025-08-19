// Simplified syllable counter
function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Tiny sentiment dictionary (can be expanded or replaced with a library)
const positiveWords = [
  "good",
  "great",
  "excellent",
  "positive",
  "happy",
  "love",
];
const negativeWords = ["bad", "poor", "terrible", "negative", "sad", "hate"];

function sentimentAnalysis(words) {
  let score = 0;
  words.forEach((w) => {
    if (positiveWords.includes(w.toLowerCase())) score++;
    if (negativeWords.includes(w.toLowerCase())) score--;
  });
  if (score > 2) return { score, label: "Positive" };
  if (score < -2) return { score, label: "Negative" };
  return { score, label: "Neutral" };
}

// Commentary helpers
function getReadingEaseComment(score) {
  if (score >= 90)
    return "Very easy — easily understood by an average 11-year-old.";
  if (score >= 60)
    return "Plain English — easily understood by 13–15 year olds.";
  if (score >= 30)
    return "Fairly difficult — best understood by college students.";
  return "Very difficult — best understood by university graduates.";
}

function getGradeComment(grade) {
  return `About grade ${Math.round(grade)} reading level.`;
}

// Main stats
export function getReadabilityStats(text) {
  text = getParagraphs(text);
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const wordCount = words.length;
  const charCount = text.length;
  const sentenceCount = sentences.length || 1;
  const paragraphCount = paragraphs.length || 1;

  let syllableCount = 0;
  words.forEach((word) => {
    syllableCount += countSyllables(word);
  });

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = syllableCount / wordCount;

  const readingEase = +(
    206.835 -
    1.015 * wordsPerSentence -
    84.6 * syllablesPerWord
  ).toFixed(2);
  const gradeLevel = +(
    0.39 * wordsPerSentence +
    11.8 * syllablesPerWord -
    15.59
  ).toFixed(2);

  const readingTime = Math.ceil(wordCount / 200); // 200 WPM
  const speakingTime = Math.ceil(wordCount / 130); // 130 WPM

  const sentiment = sentimentAnalysis(words);

  return {
    wordCount,
    charCount,
    sentenceCount,
    paragraphCount,
    syllableCount,
    readingTime,
    speakingTime,
    readingEase,
    readingEaseComment: getReadingEaseComment(readingEase),
    gradeLevel,
    gradeComment: getGradeComment(gradeLevel),
    sentiment,
  };
}

function getParagraphs(text) {
  const resultsArr = text.results;

  let paragraph = "";

  for (let i = 0; i < resultsArr.length; i++) {
    let block = resultsArr[i];
    if (block.type == "paragraph") {
      const contents = block.paragraph.rich_text;
      for (let j = 0; j < contents.length; j++) {
        const item = contents[j];
        if (item.type == "text") {
          paragraph = paragraph + item.plain_text + "\n";
          console.log(paragraph);
        }
      }
    }
  }

  return paragraph;
}
