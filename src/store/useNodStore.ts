"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { SemesterConfig, Subject, Task } from "@/types";

import { createDefaultState } from "./defaults";

interface NodState {
  semesterConfig: SemesterConfig;
  subjects: Subject[];
  tasks: Task[];
  currentWeek: number;

  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, updates: Partial<Omit<Subject, "id">>) => void;
  deleteSubject: (id: string) => void;

  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;

  setCurrentWeek: (week: number) => void;
  updateSemesterConfig: (updates: Partial<SemesterConfig>) => void;
  resetToDefault: () => void;
}

export const useNodStore = create<NodState>()(
  persist(
    (set) => ({
      ...createDefaultState(),

      addSubject: (subject) =>
        set((state) => ({
          subjects: [...state.subjects, subject],
        })),

      updateSubject: (id, updates) =>
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === id ? { ...subject, ...updates } : subject,
          ),
        })),

      deleteSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((subject) => subject.id !== id),
          tasks: state.tasks.filter((task) => task.subjectId !== id),
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, isCompleted: !task.isCompleted }
              : task,
          ),
        })),

      setCurrentWeek: (week) => set({ currentWeek: week }),

      updateSemesterConfig: (updates) =>
        set((state) => ({
          semesterConfig: { ...state.semesterConfig, ...updates },
        })),

      resetToDefault: () => set(createDefaultState()),
    }),
    {
      name: "nod-storage",
    },
  ),
);
