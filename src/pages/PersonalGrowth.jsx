import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Target, Trophy, Plus, Trash2 } from "lucide-react";

const STORAGE_KEY = "lifeos_personal_growth";

export default function PersonalGrowth({ onBack }) {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState("");
  const [reading, setReading] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setGoals(Array.isArray(saved.goals) ? saved.goals : []);
      setBooks(Array.isArray(saved.books) ? saved.books : []);
    } catch {
      setGoals([]);
      setBooks([]);
    }
  }, []);

  function save(nextGoals, nextBooks) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ goals: nextGoals, books: nextBooks })
    );
  }

  function addGoal(e) {
    e.preventDefault();
    const text = goalText.trim();
    if (!text) return;

    const next = [...goals, { id: Date.now(), text, done: false }];
    setGoals(next);
    save(next, books);
    setGoalText("");
  }

  function toggleGoal(id) {
    const next = goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(next);
    save(next, books);
  }

  function deleteGoal(id) {
    const next = goals.filter((goal) => goal.id !== id);
    setGoals(next);
    save(next, books);
  }

  function addBook(e) {
    e.preventDefault();
    const text = reading.trim();
    if (!text) return;

    const next = [...books, { id: Date.now(), text, done: false }];
    setBooks(next);
    save(goals, next);
    setReading("");
  }

  function toggleBook(id) {
    const next = books.map((book) =>
      book.id === id ? { ...book, done: !book.done } : book
    );
    setBooks(next);
    save(goals, next);
  }

  function deleteBook(id) {
    const next = books.filter((book) => book.id !== id);
    setBooks(next);
    save(goals, next);
  }

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 5px 20px rgba(70, 60, 100, 0.06)",
  };

  const inputStyle = {
    flex: 1,
    minWidth: 0,
    padding: "12px 14px",
    border: "1px solid #e5def5",
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    background: "#fff",
    color: "#342d4b",
  };

  const addButtonStyle = {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: "#8b78d6",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <div className="personal-growth-page" style={{ minHeight: "100vh", background: "#f8f5ff", padding: "20px 16px 100px", color: "#342d4b" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="reports-back-button"
          style={{ cursor: "pointer" }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800 }}>Personal Growth</h1>
          <p style={{ margin: "5px 0 0", color: "#827a96", fontSize: 13 }}>Small steps create meaningful change.</p>
        </div>
      </header>

      <section style={{ ...cardStyle, background: "linear-gradient(135deg, #eee8ff, #fff0f5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#fff", borderRadius: 15, padding: 12, color: "#8b78d6" }}>
            <Trophy size={26} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#746b8b" }}>Your progress</div>
            <div style={{ fontSize: 23, fontWeight: 800 }}>
              {goals.filter((goal) => goal.done).length} of {goals.length} goals completed
            </div>
          </div>
        </div>
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ background: "#eee8ff", color: "#8068cf", padding: 10, borderRadius: 12 }}>
            <Target size={21} />
          </div>
          <h2 style={{ margin: 0, fontSize: 18 }}>Personal Goals</h2>
        </div>

        <form onSubmit={addGoal} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Add a goal..."
            aria-label="New personal goal"
            style={inputStyle}
          />
          <button type="submit" style={addButtonStyle} aria-label="Add goal">
            <Plus size={18} />
          </button>
        </form>

        {goals.length === 0 ? (
          <p style={{ color: "#8a829b", fontSize: 14, margin: "12px 0 4px" }}>
            Your goals start here. Add one small thing you want to achieve.
          </p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: "1px solid #f0edf6" }}>
              <input
                type="checkbox"
                checked={goal.done}
                onChange={() => toggleGoal(goal.id)}
                aria-label={`Mark ${goal.text} as ${goal.done ? "incomplete" : "complete"}`}
                style={{ width: 18, height: 18, accentColor: "#8b78d6" }}
              />
              <span style={{ flex: 1, fontSize: 14, textDecoration: goal.done ? "line-through" : "none", color: goal.done ? "#a49caf" : "#403851" }}>
                {goal.text}
              </span>
              <button type="button" onClick={() => deleteGoal(goal.id)} aria-label={`Delete ${goal.text}`} style={{ border: 0, background: "transparent", color: "#a49caf", cursor: "pointer", padding: 5 }}>
                <Trash2 size={17} />
              </button>
            </div>
          ))
        )}
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ background: "#e4f7ef", color: "#419b7a", padding: 10, borderRadius: 12 }}>
            <BookOpen size={21} />
          </div>
          <h2 style={{ margin: 0, fontSize: 18 }}>Reading & Learning</h2>
        </div>

        <form onSubmit={addBook} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input
            value={reading}
            onChange={(e) => setReading(e.target.value)}
            placeholder="Add a book or learning topic..."
            aria-label="New book or learning topic"
            style={inputStyle}
          />
          <button type="submit" style={{ ...addButtonStyle, background: "#55a88a" }} aria-label="Add reading item">
            <Plus size={18} />
          </button>
        </form>

        {books.length === 0 ? (
          <p style={{ color: "#8a829b", fontSize: 14, margin: "12px 0 4px" }}>
            Track books you want to read or skills you want to learn.
          </p>
        ) : (
          books.map((book) => (
            <div key={book.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: "1px solid #f0edf6" }}>
              <input
                type="checkbox"
                checked={book.done}
                onChange={() => toggleBook(book.id)}
                aria-label={`Mark ${book.text} as ${book.done ? "incomplete" : "complete"}`}
                style={{ width: 18, height: 18, accentColor: "#55a88a" }}
              />
              <span style={{ flex: 1, fontSize: 14, textDecoration: book.done ? "line-through" : "none", color: book.done ? "#a49caf" : "#403851" }}>
                {book.text}
              </span>
              <button type="button" onClick={() => deleteBook(book.id)} aria-label={`Delete ${book.text}`} style={{ border: 0, background: "transparent", color: "#a49caf", cursor: "pointer", padding: 5 }}>
                <Trash2 size={17} />
              </button>
            </div>
          ))
        )}
      </section>

      <p style={{ textAlign: "center", color: "#8a829b", fontSize: 12, marginTop: 24 }}>
        Your goals and reading list are saved on this device.
      </p>
    </div>
  );
}
