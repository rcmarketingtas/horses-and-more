"use client";

import * as React from "react";

type ToastVariant = "default" | "success" | "error";

interface ToastState {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  open: boolean;
}

type ToastAction =
  | { type: "ADD"; toast: Omit<ToastState, "id" | "open"> }
  | { type: "DISMISS"; id: string }
  | { type: "REMOVE"; id: string };

let toastCount = 0;
const listeners: Array<(state: ToastState[]) => void> = [];
let memoryState: ToastState[] = [];

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

function reducer(state: ToastState[], action: ToastAction): ToastState[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.toast, id: String(++toastCount), open: true },
      ];
    case "DISMISS":
      return state.map((t) => (t.id === action.id ? { ...t, open: false } : t));
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
  }
}

export function toast(props: Omit<ToastState, "id" | "open">) {
  dispatch({ type: "ADD", toast: props });
  const id = String(toastCount);
  setTimeout(() => dispatch({ type: "DISMISS", id }), 4000);
  setTimeout(() => dispatch({ type: "REMOVE", id }), 4500);
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastState[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const i = listeners.indexOf(setToasts);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return { toasts };
}
