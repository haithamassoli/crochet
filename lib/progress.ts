"use client";

import { useSyncExternalStore } from "react";

/* Lesson progress — localStorage only, no accounts (see docs/PRD.md).
   useSyncExternalStore keeps SSR/hydration safe: the server snapshot is
   always EMPTY, the client snapshot loads lazily after hydration. */

const KEY = "ghurza:progress:v1";

export type Progress = Readonly<Record<string, true>>;

const EMPTY: Progress = {};
let cache: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Progress) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Progress {
  if (!loaded) {
    loaded = true;
    cache = read();
  }
  return cache;
}

function getServerSnapshot(): Progress {
  return EMPTY;
}

function emit() {
  for (const l of listeners) l();
}

function onStorage(e: StorageEvent) {
  if (e.key === KEY || e.key === null) {
    cache = read();
    emit();
  }
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function toggleLesson(slug: string) {
  const next: Record<string, true> = { ...getSnapshot() };
  if (next[slug]) delete next[slug];
  else next[slug] = true;
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full/blocked — progress stays in-memory for the session */
  }
  emit();
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { completed, toggle: toggleLesson };
}
