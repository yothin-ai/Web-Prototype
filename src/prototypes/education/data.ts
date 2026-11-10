import type { Course, CourseLevel } from '../../datasets/types'
import { useDataset } from '../../datasets/DatasetContext'
import { useDemoState } from '../../state/demoState'
import { s } from './strings'

export const PROTOTYPE_ID = 'education'
export const PASS_PERCENT = 60

export const useCourses = () => {
  const { courses } = useDataset().dataset.education
  const courseById = (id?: string) => courses.find((c) => c.id === id)
  return { courses, courseById }
}

// What a learner answered: for each question the ids of the options chosen.
export type QuizResult = { answers: Record<string, string[]>; score: number; total: number; takenAt: string }
export type MyReview = { rating: number; text: string; date: string }

export const useEnrollments = () => useDemoState<string[]>(PROTOTYPE_ID, 'enrolled', [])
export const useCompleted = () => useDemoState<Record<string, string[]>>(PROTOTYPE_ID, 'completed', {})
export const useResults = () => useDemoState<Record<string, QuizResult>>(PROTOTYPE_ID, 'results-v2', {})
export const useNotes = () => useDemoState<Record<string, string>>(PROTOTYPE_ID, 'notes', {})
export const useBookmarks = () => useDemoState<Record<string, string>>(PROTOTYPE_ID, 'bookmarks', {})
export const useMyReviews = () => useDemoState<Record<string, MyReview>>(PROTOTYPE_ID, 'my-reviews', {})
// The times lessons were finished, newest last; the weekly goal counts the last seven days.
export const useActivity = () => useDemoState<string[]>(PROTOTYPE_ID, 'activity', [])
export const useGoal = () => useDemoState<number>(PROTOTYPE_ID, 'goal', 3)

export const lessonsDone = (completed: Record<string, string[]>, course: Course) => (completed[course.id] ?? []).length
export const allLessonsDone = (completed: Record<string, string[]>, course: Course) => lessonsDone(completed, course) >= course.lessons.length
export const percent = (done: number, total: number) => (total === 0 ? 0 : Math.round((done / total) * 100))
export const quizPassed = (result?: QuizResult) => !!result && percent(result.score, result.total) >= PASS_PERCENT
// Every lesson done and the quiz passed: the learner has earned the certificate and may review.
export const courseFinished = (completed: Record<string, string[]>, results: Record<string, QuizResult>, course: Course) => allLessonsDone(completed, course) && quizPassed(results[course.id])

export const nextLessonId = (completed: Record<string, string[]>, course: Course) =>
  course.lessons.find((l) => !(completed[course.id] ?? []).includes(l.id))?.id ?? course.lessons[0].id

export const courseMinutes = (course: Course) => course.lessons.reduce((n, l) => n + l.minutes, 0)

export const levelLabel = (level: CourseLevel) => (level === 'beginner' ? s.levelBeginner : level === 'intermediate' ? s.levelIntermediate : s.levelAll)

// A rough split of ratings into 5..1 stars, made from the average so the sample looks believable. Adds up to 100.
export function ratingSplit(rating: number): number[] {
  const five = Math.round(((rating - 3) / 2) * 80 + 10)
  const four = Math.round((1 - (rating - 3) / 2) * 50)
  const two = 2
  const one = 1
  return [five, four, 100 - five - four - two - one, two, one]
}
