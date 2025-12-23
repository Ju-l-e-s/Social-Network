"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
};

type Thread = {
  id: string;
  title: string;
  participants: string[];
  messages: Message[];
};

const seedThreads: Thread[] = [
  {
    id: "people",
    title: "RH · Onboarding",
    participants: ["Maya", "Vous"],
    messages: [
      {
        id: "m1",
        sender: "Maya",
        content: "Peux-tu partager les prochaines étapes onboarding ?",
        timestamp: "2024-05-12T09:00:00Z",
      },
      {
        id: "m2",
        sender: "Vous",
        content: "Yes : buddy assigné + accès aux groupes métiers.",
        timestamp: "2024-05-12T09:02:00Z",
      },
    ],
  },
  {
    id: "eng",
    title: "Engineering · Alerts",
    participants: ["Théo", "Vous"],
    messages: [
      {
        id: "m3",
        sender: "Théo",
        content: "On merge la branche observabilité cet aprem.",
        timestamp: "2024-05-13T14:00:00Z",
      },
    ],
  },
];

export function MessageCenter() {
  const [threads, setThreads] = useState<Thread[]>(seedThreads);
  const [activeId, setActiveId] = useState<string>(seedThreads[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeId) ?? threads[0],
    [threads, activeId],
  );

  const sendMessage = useCallback(() => {
    const content = draft.trim();
    if (!content || !activeId) return;
    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeId
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  id: `local-${Date.now()}`,
                  sender: "Vous",
                  content,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : thread,
      ),
    );
    setDraft("");
  }, [activeId, draft]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeThread?.messages]);

  if (!activeThread) return null;

  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Messages privés (démo locale)
        </p>
        <div className="flex flex-col gap-2">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                activeThread.id === thread.id
                  ? "border-brand/60 bg-brand/5 text-slate-900 dark:text-slate-100"
                  : "border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
              }`}
            >
              <p className="font-semibold">{thread.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {thread.participants.join(" · ")}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div
          ref={scrollRef}
          className="h-64 space-y-3 overflow-y-auto pr-2"
        >
          <AnimatePresence initial={false}>
            {activeThread.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`w-fit max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                  message.sender === "Vous"
                    ? "ml-auto bg-brand text-white"
                    : "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <p className="font-semibold">{message.sender}</p>
                <p className="text-sm">{message.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 rounded-2xl border border-slate-200 bg-white p-3 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button type="submit" size="sm" disabled={!draft.trim()}>
            Envoyer
          </Button>
        </form>
      </div>
    </section>
  );
}
