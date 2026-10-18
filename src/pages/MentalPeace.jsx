import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Heart, Wind, BookOpen, Play, Pause, Save, Trash2 } from "lucide-react";
import "../App.css";

const moods = [
  { label: "Amazing", emoji: "😄", color: "#d9f8e9" },
  { label: "Good", emoji: "🙂", color: "#e1f5ff" },
  { label: "Okay", emoji: "😐", color: "#fff2cf" },
  { label: "Low", emoji: "😔", color: "#f3e5ff" },
  { label: "Stressed", emoji: "😣", color: "#ffe0ec" },
];

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function readSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function MentalPeace({ onBack }) {
  const [moodHistory, setMoodHistory] = useState(() => readSaved("lifeos_moods", []));
  const [journal, setJournal] = useState(() => readSaved("lifeos_journal", []));
  const [note, setNote] = useState("");
  const [breathing, setBreathing] = useState(false);
  const [meditating, setMeditating] = useState(false);
  const [duration, setDuration] = useState(5);
  const [seconds, setSeconds] = useState(300);
  const [breathSeconds, setBreathSeconds] = useState(4);

  useEffect(() => {
    localStorage.setItem("lifeos_moods", JSON.stringify(moodHistory));
  }, [moodHistory]);

  useEffect(() => {
    localStorage.setItem("lifeos_journal", JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    if (!meditating || seconds <= 0) return;
    const timer = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [meditating, seconds]);

  useEffect(() => {
    if (!breathing) return;
    const timer = setInterval(() => setBreathSeconds(s => s >= 7 ? 4 : s + 1), 1000);
    return () => clearInterval(timer);
  }, [breathing]);

  const todayMood = moodHistory.find(item => item.date === todayKey());

  function selectMood(mood) {
    setMoodHistory(previous => [
      ...previous.filter(item => item.date !== todayKey()),
      { date: todayKey(), mood: mood.label, emoji: mood.emoji }
    ].sort((a, b) => b.date.localeCompare(a.date)));
  }

  function saveNote(event) {
    event.preventDefault();
    if (!note.trim()) return;
    setJournal(previous => [
      { id: `${Date.now()}`, date: todayKey(), text: note.trim() },
      ...previous
    ]);
    setNote("");
  }

  function startMeditation() {
    setSeconds(duration * 60);
    setMeditating(true);
  }

  const formatTime = value =>
    `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;

  return (
    <main className="dashboard mental-peace-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">SLOW DOWN · BREATHE · RESET</span>
          <h1>Mental Peace 🪷</h1>
          <p>A little calm goes a long way.</p>
        </div>
        <button className="add-round" onClick={onBack} aria-label="Back to home">
          <ArrowLeft size={22} />
        </button>
      </header>

      <section className="mp-welcome">
        <div className="mp-orb">🧘</div>
        <span className="eyebrow">YOUR MOMENT OF CALM</span>
        <h2>Give yourself a pause.</h2>
        <p>You don't have to solve everything right now. Just begin with one breath.</p>
      </section>

      <section className="mp-section">
        <div className="mp-heading"><div><h2>How are you feeling?</h2><p>Check in with yourself today.</p></div><Heart size={24} /></div>
        <div className="mp-moods">
          {moods.map(mood => (
            <button key={mood.label}
              className={`mp-mood ${todayMood?.mood === mood.label ? "selected" : ""}`}
              style={{ "--mood-color": mood.color }}
              onClick={() => selectMood(mood)}>
              <span>{mood.emoji}</span><small>{mood.label}</small>
            </button>
          ))}
        </div>
        {todayMood && <p className="mp-message">Today's mood saved: {todayMood.emoji} {todayMood.mood}</p>}
      </section>

      <section className="mp-tool-card mp-breath-card">
        <div className="mp-tool-icon"><Wind size={25} /></div>
        <span className="eyebrow">01 · BREATHE</span>
        <h2>{breathing ? "Breathe with the circle" : "Reset with breathing"}</h2>
        <p>Inhale gently for 4 seconds, then exhale slowly for 4 seconds. Stop if you feel uncomfortable.</p>
        <div className={`mp-breath-orb ${breathing ? "active" : ""}`}>
          <span>{breathing ? (breathSeconds <= 4 ? "Breathe in" : "Breathe out") : "Breathe"}</span>
          <strong>{breathing ? (breathSeconds <= 4 ? breathSeconds : 8 - breathSeconds) : "♡"}</strong>
        </div>
        <button className="primary-button" onClick={() => setBreathing(v => !v)}>
          {breathing ? <Pause size={18} /> : <Play size={18} />}
          {breathing ? "Pause breathing" : "Start breathing"}
        </button>
      </section>

      <section className="mp-tool-card mp-meditation-card">
        <div className="mp-tool-icon">🪷</div>
        <span className="eyebrow">02 · MEDITATE</span>
        <h2>Make room for stillness</h2>
        <p>Choose a short session and focus on your breathing or the sounds around you.</p>
        <div className="mp-duration-options">
          {[1, 3, 5, 10].map(min => (
            <button key={min} className={duration === min ? "selected" : ""}
              onClick={() => { setDuration(min); setSeconds(min * 60); setMeditating(false); }}>
              {min} min
            </button>
          ))}
        </div>
        <div className="mp-timer">{formatTime(seconds)}</div>
        {seconds === 0 && <p className="mp-message">Session complete. Take a moment before continuing. ✨</p>}
        <button className="primary-button" onClick={() => meditating ? setMeditating(false) : startMeditation()}>
          {meditating ? <Pause size={18} /> : <Play size={18} />}
          {meditating ? "Pause session" : seconds < duration * 60 && seconds > 0 ? "Restart session" : "Begin meditation"}
        </button>
      </section>

      <section className="mp-section mp-journal">
        <div className="mp-heading"><div><h2>Mind journal 📔</h2><p>Let your thoughts have a place to land.</p></div><BookOpen size={24} /></div>
        <form onSubmit={saveNote}>
          <label htmlFor="mp-note">What's on your mind today?</label>
          <textarea id="mp-note" value={note} onChange={e => setNote(e.target.value)}
            placeholder="I'm grateful for... / Today I feel... / Something I want to let go of..."
            rows={4} maxLength={2000} />
          <div className="mp-form-bottom"><small>{note.length}/2000</small><button className="primary-button" type="submit"><Save size={17} /> Save reflection</button></div>
        </form>
        <h3 className="mp-history-title">Your reflections</h3>
        {!journal.length && <p className="mp-empty">Your journal is a private space for your thoughts. Your first entry can start here.</p>}
        {journal.map(entry => (
          <article className="mp-journal-entry" key={entry.id}>
            <div><small>{entry.date}</small><p>{entry.text}</p></div>
            <button aria-label="Delete reflection" onClick={() => setJournal(items => items.filter(item => item.id !== entry.id))}><Trash2 size={17} /></button>
          </article>
        ))}
      </section>

      <section className="mp-section">
        <div className="mp-heading"><div><h2>Mood history</h2><p>Your recent check-ins.</p></div><Brain size={24} /></div>
        {!moodHistory.length && <p className="mp-empty">Your mood check-ins will appear here.</p>}
        {moodHistory.slice(0, 7).map(item => (
          <div className="mp-history-row" key={item.date}>
            <span>{item.emoji}</span><strong>{item.mood}</strong><small>{item.date}</small>
          </div>
        ))}
      </section>
    </main>
  );
}
