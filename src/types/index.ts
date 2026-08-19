export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI";

export interface Schedule {
  day: DayOfWeek;
  startPeriod: number;
  endPeriod: number;
  startTime: string;
  endTime: string;
}

export interface Syllabus {
  attendance: number;
  assignment: number;
  midterm: number;
  final: number;
  etc: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  professor: string;
  classroom: string;
  color: string;
  credits: number;
  syllabus: Syllabus;
  lmsUrl?: string;
  schedule: Schedule[];
}

export type TaskType =
  | "ASSIGNMENT"
  | "LECTURE"
  | "QUIZ"
  | "MIDTERM"
  | "FINAL"
  | "ETC";

export interface Task {
  id: string;
  subjectId: string;
  week: number;
  title: string;
  type: TaskType;
  isCompleted: boolean;
  dueDate?: string;
  isImportant: boolean;
}

export interface WeekData {
  week: number;
  notes: string;
  tasks: Task[];
}

export interface SemesterConfig {
  semesterName: string;
  totalWeeks: number;
  startDate: string;
  targetGpa: number;
}
