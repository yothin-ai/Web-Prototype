import type { Localized } from '../i18n'
import type { Course, CourseLevel, QuizQuestion } from './types'

// Short forms for writing course content. A pair is [Thai, English].
type Pair = [string, string]
const loc = ([th, en]: Pair): Localized => ({ th, en })

export type LessonInput = [title: Pair, minutes: number, body: Pair]
// [question, options, indexes of the right options]
export type QuizInput = [question: Pair, options: Pair[], right: number[]]

export type CourseInput = {
  id: string
  title: Pair
  summary: Pair
  level: CourseLevel
  category: string
  price: number
  rating: number
  ratingCount: number
  isNew?: boolean
  instructor: string
  outcomes: Pair[]
  audience: Pair[]
  lessons: LessonInput[]
  quiz: QuizInput[]
  quizMinutes?: number
}

export function course(c: CourseInput): Course {
  const quiz: QuizQuestion[] = c.quiz.map(([q, options, right], i) => ({
    id: `q${i + 1}`,
    question: loc(q),
    options: options.map((o, j) => ({ id: String.fromCharCode(97 + j), text: loc(o) })),
    correctIds: right.map((j) => String.fromCharCode(97 + j)),
  }))
  return {
    id: c.id,
    title: loc(c.title),
    summary: loc(c.summary),
    levelId: c.level,
    categoryId: c.category,
    price: c.price,
    rating: c.rating,
    ratingCount: c.ratingCount,
    isNew: c.isNew,
    instructorId: c.instructor,
    outcomes: c.outcomes.map(loc),
    audience: c.audience.map(loc),
    lessons: c.lessons.map(([title, minutes, body], i) => ({ id: `l${i + 1}`, title: loc(title), minutes, body: loc(body) })),
    quiz,
    quizMinutes: c.quizMinutes ?? 10,
  }
}

export const pair = loc

// Wording every dataset shares: the questions learners ask before enrolling, and sample comments.
export const sharedFaq = [
  { question: { th: 'สมัครแล้วเรียนได้นานแค่ไหน', en: 'How long can I study after enrolling?' }, answer: { th: 'ในเว็บตัวอย่างนี้เรียนได้ไม่จำกัด ความคืบหน้าเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น', en: 'In this sample site there is no limit. Your progress is kept only in your own browser.' } },
  { question: { th: 'ต้องผ่านแบบทดสอบกี่เปอร์เซ็นต์จึงได้ใบประกาศนียบัตร', en: 'What score do I need for the certificate?' }, answer: { th: 'ต้องเรียนจบทุกบทและได้คะแนนแบบทดสอบอย่างน้อย 60% ทำใหม่ได้ไม่จำกัดครั้ง', en: 'Finish every lesson and score at least 60% on the quiz. You can retake it as often as you like.' } },
  { question: { th: 'ต้องจ่ายเงินจริงหรือไม่', en: 'Do I pay real money?' }, answer: { th: 'ไม่ต้อง ราคาที่แสดงเป็นตัวอย่าง ปุ่มสมัครเรียนจะเปิดคอร์สให้ทันทีโดยไม่มีการชำระเงิน', en: 'No. Prices are samples, and the enrol button opens the course straight away with no payment.' } },
  { question: { th: 'ดูใบประกาศนียบัตรได้ที่ไหน', en: 'Where do I see my certificate?' }, answer: { th: 'เมื่อผ่านเกณฑ์ ปุ่มดูใบประกาศนียบัตรจะปรากฏในหน้าคอร์สและหน้าความคืบหน้า พิมพ์ได้', en: 'Once you pass, a certificate button appears on the course page and on your progress page, and you can print it.' } },
  { question: { th: 'เขียนรีวิวได้เมื่อไหร่', en: 'When can I write a review?' }, answer: { th: 'เมื่อเรียนจบทุกบทและผ่านแบบทดสอบแล้ว', en: 'After you have finished every lesson and passed the quiz.' } },
]

export const sharedReviews = [
  { id: 'r1', name: pair(['ผู้เรียนตัวอย่าง ก', 'Sample learner A']), date: '2026-08-14', rating: 5, text: pair(['อธิบายเป็นขั้นตอน ตามได้ง่ายและนำไปใช้ต่อได้จริง', 'Explained step by step, easy to follow and useful right away.']) },
  { id: 'r2', name: pair(['ผู้เรียนตัวอย่าง ข', 'Sample learner B']), date: '2026-09-02', rating: 5, text: pair(['ตัวอย่างชัด บทเรียนไม่ยาวเกินไป เรียนจบได้ในสัปดาห์เดียว', 'Clear examples and short lessons. I finished in a week.']) },
  { id: 'r3', name: pair(['ผู้เรียนตัวอย่าง ค', 'Sample learner C']), date: '2026-09-21', rating: 4, text: pair(['เนื้อหาตรงจุด อยากให้มีแบบฝึกหัดเพิ่มอีกนิด', 'To the point. I would like a few more exercises.']) },
  { id: 'r4', name: pair(['ผู้เรียนตัวอย่าง ง', 'Sample learner D']), date: '2026-10-05', rating: 5, text: pair(['เหมาะกับคนเริ่มต้นมาก แบบทดสอบช่วยให้ทบทวนได้ดี', 'Great for beginners, and the quiz helped me review.']) },
]
