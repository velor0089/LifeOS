import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Plus, Trash2 } from "lucide-react";
import "../App.css";

const STORAGE_KEY = "lifeos_daily_habits";

function loadHabits() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function DailyHabits({ onBack }) {
  const [habits, setHabits] = useState(loadHabits);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  function addHabit(event) {
    event.preventDefault();
    const name = newHabit.trim();
    if (!name) return;

    setHabits(previous => [
      ...previous,
      { id: `${Date.now()}-${Math.random()}`, name, done: false }
    ]);
    setNewHabit("");
  }

  return (
    <main className="dashboard daily-habits-page">
      <header className="page-header">
        <button className="reports-back-button" onClick={onBack} aria-label="Back">
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="eyebrow">SMALL STEPS, EVERY DAY</span>
          <h1>Daily Habits 🌱</h1>
          <p>Build routines that support your goals.</p>
        </div>
      </header>

      <section className="reports-hero">
        <span style={{ fontSize: 38 }}>🌿</span>
        <h2>Your daily checklist</h2>
        <p>{habits.filter(habit => habit.done).length} of {habits.length} habits completed</p>

        <div className="reports-track">
          <div
            style={{
              width: `${habits.length ? habits.filter(habit => habit.done).length / habits.length * 100 : 0}%`
            }}
          />
        </div>
      </section>

      <section className="reports-panel">
        <h2>Add a habit</h2>
        <form className="daily-habit-form" onSubmit={addHabit}>
          <input
            value={newHabit}
            onChange={event => setNewHabit(event.target.value)}
            placeholder="e.g. Walk for 15 minutes"
            aria-label="New habit"
            maxLength={100}
            required
            style={{
              flex: 1, minWidth: 0, padding: 13,
              border: "1px solid #eee5ed", borderRadius: 13
            }}
          />
          <button className="primary-button" type="submit" aria-label="Add habit">
            <Plus size={19} />
          </button>
        </form>
      </section>

      <section className="reports-panel">
        <h2>Your habits</h2>

        {!habits.length && (
          <p style={{ color: "#85859b", lineHeight: 1.7 }}>
            Your list is ready. Add your first habit to get started.
          </p>
        )}

        {habits.map(habit => (
          <article
            key={habit.id}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 0", borderBottom: "1px solid #f0eaf2"
            }}
          >
            <button
              type="button"
              onClick={() => setHabits(previous =>
                previous.map(item => item.id === habit.id
                  ? { ...item, done: !item.done }
                  : item
                )
              )}
              aria-label={habit.done ? "Mark incomplete" : "Mark complete"}
              style={{
                border: 0, background: "transparent",
                color: habit.done ? "#36ad80" : "#aaa2bc", padding: 0
              }}
            >
              <CheckCircle2 size={24} />
            </button>

            <span style={{
              flex: 1, color: "#39345f",
              textDecoration: habit.done ? "line-through" : "none"
            }}>
              {habit.name}
            </span>

            <button
              type="button"
              onClick={() => setHabits(previous =>
                previous.filter(item => item.id !== habit.id)
              )}
              aria-label="Delete habit"
              style={{
                border: 0, background: "#ffe7ef", color: "#d65d91",
                borderRadius: 10, padding: 8
              }}
            >
              <Trash2 size={17} />
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
