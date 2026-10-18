import { useEffect, useState } from "react";
import {
  ArrowLeft, Moon, Sun, Clock, Star, Plus,
  Trash2, BedDouble, Sparkles
} from "lucide-react";
import "../App.css";

const STORAGE_KEY = "lifeos_sleep_records";
const GOAL_KEY = "lifeos_sleep_goal";

function readSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function durationBetween(bedtime, wakeTime) {
  const [bh, bm] = bedtime.split(":").map(Number);
  const [wh, wm] = wakeTime.split(":").map(Number);
  let minutes = wh * 60 + wm - (bh * 60 + bm);
  if (minutes <= 0) minutes += 24 * 60;
  return minutes;
}

function formatDuration(minutes) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export default function SleepRecovery({ onBack }) {
  const [records, setRecords] = useState(() =>
    readSaved(STORAGE_KEY, [])
  );
  const [goal, setGoal] = useState(() =>
    readSaved(GOAL_KEY, 8)
  );
  const [bedtime, setBedtime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [quality, setQuality] = useState(4);
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
  }, [goal]);

  const today = todayKey();
  const todayRecord = records.find(record => record.date === today);
  const latestRecord = [...records].sort((a, b) =>
    b.date.localeCompare(a.date)
  )[0];

  const duration = durationBetween(bedtime, wakeTime);
  const average = records.length
    ? Math.round(records.reduce((sum, record) => sum + record.minutes, 0) / records.length)
    : 0;

  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const record = records.find(item => item.date === key);
    return {
      key,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: record?.minutes || 0
    };
  });

  function saveSleep(event) {
    event.preventDefault();

    const minutes = durationBetween(bedtime, wakeTime);
    if (minutes < 60 || minutes > 24 * 60) {
      alert("Please enter a valid sleep period.");
      return;
    }

    const record = {
      id: `${Date.now()}`,
      date: today,
      bedtime,
      wakeTime,
      minutes,
      quality,
      notes: notes.trim()
    };

    setRecords(previous => [
      record,
      ...previous.filter(item => item.date !== today)
    ]);
    setShowForm(false);
    setNotes("");
  }

  return (
    <main className="dashboard sleep-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">REST · RECOVER · RECHARGE</span>
          <h1>Sleep & Recovery 🌙</h1>
          <p>Give your body the rest it deserves.</p>
        </div>
        <button className="add-round" onClick={onBack} aria-label="Back to home">
          <ArrowLeft size={22} />
        </button>
      </header>

      <section className="sleep-hero">
        <div className="sleep-moon">🌙</div>
        <span className="eyebrow">YOUR DAILY REST</span>
        <h2>Rest is productive, too.</h2>
        <p>Good sleep supports your energy, focus, mood, and recovery.</p>
        <div className="sleep-goal-control">
          <label htmlFor="sleep-goal">Daily sleep goal</label>
          <select
            id="sleep-goal"
            value={goal}
            onChange={event => setGoal(Number(event.target.value))}
          >
            {[6, 7, 8, 9, 10].map(hours => (
              <option key={hours} value={hours}>{hours} hours</option>
            ))}
          </select>
        </div>
      </section>

      <section className="sleep-stats">
        <article>
          <span>🌙</span>
          <small>Last sleep</small>
          <strong>{latestRecord ? formatDuration(latestRecord.minutes) : "—"}</strong>
        </article>
        <article>
          <span>⭐</span>
          <small>Sleep quality</small>
          <strong>{latestRecord ? `${latestRecord.quality}/5` : "—"}</strong>
        </article>
        <article>
          <span>📊</span>
          <small>Average</small>
          <strong>{records.length ? formatDuration(average) : "—"}</strong>
        </article>
      </section>

      <section className="sleep-panel">
        <div className="sleep-panel-heading">
          <div>
            <h2>{todayRecord ? "Today's sleep saved" : "Log your sleep"}</h2>
            <p>Record last night's rest.</p>
          </div>
          <BedDouble size={27} />
        </div>

        {todayRecord ? (
          <div className="sleep-saved">
            <div className="sleep-total">{formatDuration(todayRecord.minutes)}</div>
            <div className="sleep-progress-track">
              <div
                className="sleep-progress-fill"
                style={{ width: `${Math.min(100, todayRecord.minutes / (goal * 60) * 100)}%` }}
              />
            </div>
            <p>
              {Math.round(todayRecord.minutes / (goal * 60) * 100)}% of your {goal}-hour goal
            </p>
            <div className="sleep-time-row">
              <span><Moon size={17} /> Bedtime <strong>{todayRecord.bedtime}</strong></span>
              <span><Sun size={17} /> Wake-up <strong>{todayRecord.wakeTime}</strong></span>
            </div>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              Edit today's sleep
            </button>
          </div>
        ) : (
          <div className="sleep-empty">
            <div>🛏️</div>
            <h3>Your sleep story starts here</h3>
            <p>Log your bedtime and wake-up time to begin tracking your rest.</p>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              <Plus size={18} /> Log sleep
            </button>
          </div>
        )}

        {showForm && (
          <form className="sleep-form" onSubmit={saveSleep}>
            <h3>Sleep details</h3>
            <label>
              <span><Moon size={17} /> Bedtime</span>
              <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} required />
            </label>
            <label>
              <span><Sun size={17} /> Wake-up time</span>
              <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} required />
            </label>

            <div className="sleep-duration-preview">
              <Clock size={18} />
              Estimated sleep: <strong>{formatDuration(duration)}</strong>
            </div>

            <fieldset className="sleep-quality">
              <legend>How well did you sleep?</legend>
              <div>
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    type="button"
                    className={quality >= value ? "chosen" : ""}
                    onClick={() => setQuality(value)}
                    aria-label={`${value} out of 5`}
                  >
                    <Star size={25} fill={quality >= value ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <small>{["", "Very poor", "Poor", "Okay", "Good", "Excellent"][quality]}</small>
            </fieldset>

            <label className="sleep-notes-label">
              Notes (optional)
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="How did you feel when you woke up?"
                rows={3}
                maxLength={500}
              />
            </label>

            <div className="sleep-form-actions">
              <button type="button" className="sleep-cancel" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Save sleep
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="sleep-panel">
        <div className="sleep-panel-heading">
          <div>
            <h2>This week</h2>
            <p>Your nightly sleep duration.</p>
          </div>
          <Sparkles size={25} />
        </div>
        <div className="sleep-week-chart">
          {lastSevenDays.map(day => {
            const percent = day.minutes
              ? Math.min(100, day.minutes / (goal * 60) * 100)
              : 0;
            return (
              <div className="sleep-week-day" key={day.key}>
                <div className="sleep-bar-track">
                  <div className="sleep-bar" style={{ height: `${percent}%` }} />
                </div>
                <strong>{day.minutes ? `${Math.floor(day.minutes / 60)}h` : "—"}</strong>
                <small>{day.label}</small>
              </div>
            );
          })}
        </div>
      </section>

      <section className="sleep-panel">
        <div className="sleep-panel-heading">
          <div>
            <h2>Sleep history</h2>
            <p>Your saved sleep records.</p>
          </div>
          <Clock size={25} />
        </div>

        {!records.length && (
          <p className="sleep-history-empty">Your saved sleep logs will appear here.</p>
        )}

        {[...records].sort((a, b) => b.date.localeCompare(a.date)).map(record => (
          <article className="sleep-history-row" key={record.id}>
            <div className="sleep-history-icon">🌙</div>
            <div className="sleep-history-info">
              <strong>{formatDuration(record.minutes)}</strong>
              <span>{record.date} · {record.bedtime}–{record.wakeTime}</span>
              {record.notes && <p>{record.notes}</p>}
            </div>
            <div className="sleep-history-quality">
              {"★".repeat(record.quality)}{"☆".repeat(5 - record.quality)}
              <button
                aria-label="Delete sleep record"
                onClick={() => setRecords(previous => previous.filter(item => item.id !== record.id))}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="sleep-tip">
        <span>💡</span>
        <div>
          <strong>A gentle reminder</strong>
          <p>Try keeping a consistent sleep schedule. If you can, wind down without screens before bed.</p>
        </div>
      </section>
    </main>
  );
}
