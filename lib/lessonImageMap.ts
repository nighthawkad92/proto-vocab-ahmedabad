export const LESSON_IMAGE_MAP: Record<string, string> = {
  "Breaking Big Words": "image-breaking-big-words.png",
  "Vocabulary in Context": "image-vocab-context.png",
  "Reading Short Paragraphs": "image-read-short-para.png",
  "Sentence Expansion": "image-sentence-expansion.png",
  "Reading and Writing Connection": "image-read-write-connect.png"
}

export function getLessonImage(lessonTitle: string): string {
  const filename = LESSON_IMAGE_MAP[lessonTitle]
  return `/lesson-images/${filename || 'image-breaking-big-words.png'}`
}
