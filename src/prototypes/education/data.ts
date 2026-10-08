import type { Course } from '../../datasets/types'
import { useDataset } from '../../datasets/DatasetContext'
import { useDemoState } from '../../state/demoState'

export const PROTOTYPE_ID = 'education'
export const useCourses = () => {
  const { courses } = useDataset().dataset.education
  const courseById = (id?: string) => courses.find((c) => c.id === id)
  return { courses, courseById }
}

export type QuizResult = { answers: Record<string, string>; score: number; total: number }

export const useEnrollments = () => useDemoState<string[]>(PROTOTYPE_ID, 'enrolled', [])
export const useCompleted = () => useDemoState<Record<string, string[]>>(PROTOTYPE_ID, 'completed', {})
export const useResults = () => useDemoState<Record<string, QuizResult>>(PROTOTYPE_ID, 'results', {})

export const lessonsDone = (completed: Record<string, string[]>, course: Course) => (completed[course.id] ?? []).length
export const allLessonsDone = (completed: Record<string, string[]>, course: Course) => lessonsDone(completed, course) >= course.lessons.length
export const percent = (done: number, total: number) => (total === 0 ? 0 : Math.round((done / total) * 100))

export const nextLessonId = (completed: Record<string, string[]>, course: Course) =>
  course.lessons.find((l) => !(completed[course.id] ?? []).includes(l.id))?.id ?? course.lessons[0].id
