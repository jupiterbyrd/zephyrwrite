// src/lib/readability.js

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = "aeiouy";
  let syllableCount = 0;
  let prevCharWasVowel = false;

  for (let char of word) {
    const isVowel = vowels.includes(char);
    if (isVowel && !prevCharWasVowel) {
      syllableCount++;
    }
    prevCharWasVowel = isVowel;
  }

  // Remove silent 'e'
  if (word.endsWith("e")) syllableCount--;

  return syllableCount > 0 ? syllableCount : 1;
}

function sentimentScore(words) {
  const positive = [
    "good",
    "great",
    "happy",
    "love",
    "excellent",
    "wonderful",
    "positive",
  ];
  const negative = [
    "bad",
    "sad",
    "angry",
    "hate",
    "terrible",
    "horrible",
    "negative",
  ];

  let score = 0;
  words.forEach((w) => {
    if (positive.includes(w)) score++;
    if (negative.includes(w)) score--;
  });
  return score;
}

export function analyzeText(text) {
  if (!text || text.trim().length === 0) {
    return { error: "No text provided" };
  }

  const characters = text.length;
  const words = text.match(/\b[\w']+\b/g) || [];
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;
  const paragraphCount = paragraphs.length;

  const syllableCount = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );

  // Reading & speaking times
  const readingTime = (wordCount / 200).toFixed(2); // minutes
  const speakingTime = (wordCount / 130).toFixed(2); // minutes

  // Flesch Reading Ease
  const fleschReadingEase = (
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount)
  ).toFixed(2);

  let fleschComment = "";
  if (fleschReadingEase >= 90) fleschComment = "Very easy (5th grade level).";
  else if (fleschReadingEase >= 60)
    fleschComment = "Plain English (8th-9th grade).";
  else if (fleschReadingEase >= 30)
    fleschComment = "Fairly difficult (college level).";
  else fleschComment = "Very difficult (college graduate level).";

  // Flesch–Kincaid Grade
  const fleschKincaidGrade = (
    0.39 * (wordCount / sentenceCount) +
    11.8 * (syllableCount / wordCount) -
    15.59
  ).toFixed(2);

  let gradeComment = `About ${Math.round(
    fleschKincaidGrade
  )}th grade reading level.`;

  // Sentiment
  const sentiment = sentimentScore(words.map((w) => w.toLowerCase()));
  let sentimentComment = "Neutral";
  if (sentiment > 0) sentimentComment = "Positive";
  if (sentiment < 0) sentimentComment = "Negative";

  return {
    wordCount,
    characterCount: characters,
    sentenceCount,
    paragraphCount,
    readingTime: `${readingTime} min`,
    speakingTime: `${speakingTime} min`,
    syllableCount,
    fleschReadingEase: Number(fleschReadingEase),
    fleschComment,
    fleschKincaidGrade: Number(fleschKincaidGrade),
    gradeComment,
    sentiment,
    sentimentComment,
  };
}
