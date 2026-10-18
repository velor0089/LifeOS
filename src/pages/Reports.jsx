import { useMemo, useState } from "react";
import {
  ArrowLeft, ChartNoAxesCombined, CalendarDays, CheckCircle2,
  Clock3, Flame, TrendingUp, Target, Sparkles
} from "lucide-react";

const wellnessCategories = [
  { name: "Gym & Fitness", color: "#fbd5e5", icon: "💪" },
  { name: "Mental Peace", color: "#eadcff", icon: "🧠" },
  { name: "Sleep & Recovery", color: "#d8f1ff", icon: "🌙" },
  { name: "Nutrition & Hydration", color: "#d5f6e8", icon: "💧" },
  { name: "Daily Habits", color: "#fff0bd", icon: "✅" },
  { name: "Personal Growth", color: "#ffe1d1", icon: "🌱" },
];

const dateKey = (date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const sameMonth = (date, now) =>
  date.getFullYear() === now.getFullYear() &&
  date.getMonth() === now.getMonth();

function getActivityDate(activity) {
  if (!activity.date) return null;

  const parts = activity.date.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;

  const date = new Date(parts[0], parts[1], parts[2]);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function Reports({ activities = [], onBack }) {
  const [period, setPeriod] = useState("Week");
  const now = new Date();

  const report = useMemo(() => {
    const dated = activities.map((activity) => ({
      ...activity,
      parsedDate: getActivityDate(activity),
    }));

    const valid = dated.filter((a) => a.parsedDate);
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    if (period === "Week") {
      start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    } else {
      start.setDate(1);
    }

    const inPeriod = valid.filter((a) =>
      period === "Week"
        ? a.parsedDate >= start &&
          a.parsedDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
        : sameMonth(a.parsedDate, now)
    );

    const done = inPeriod.filter((a) => a.done).length;
    const pending = inPeriod.length - done;
    const completion = inPeriod.length
      ? Math.round((done / inPeriod.length) * 100)
      : 0;

    const bars = Array.from(
      { length: period === "Week" ? 7 : now.getDate() },
      (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const dayItems = inPeriod.filter(
          (a) => dateKey(a.parsedDate) === dateKey(date)
        );
        const dayDone = dayItems.filter((a) => a.done).length;
        return {
          label: period === "Week"
            ? date.toLocaleDateString("en-US", { weekday: "short" })
            : String(date.getDate()),
          total: dayItems.length,
          done: dayDone,
          percent: dayItems.length
            ? Math.round((dayDone / dayItems.length) * 100)
            : 0,
          today: dateKey(date) === dateKey(now),
        };
      }
    );

    const categories = wellnessCategories.map((category) => {
      const items = inPeriod.filter((a) => a.category === category.name);
      return {
        ...category,
        total: items.length,
        done: items.filter((a) => a.done).length,
      };
    });

    const productiveDay = [...bars]
      .filter((day) => day.total > 0)
      .sort((a, b) => b.done - a.done || b.total - a.total)[0];

    return {
      total: inPeriod.length,
      done,
      pending,
      completion,
      bars,
      categories,
      productiveDay,
      overallTotal: activities.length,
      overallDone: activities.filter((a) => a.done).length,
    };
  }, [activities, period]);

  return (
    <main className="dashboard reports-screen">
      <header className="page-header reports-page-header">
        <button
          type="button"
          className="reports-back-button"
          onClick={onBack}
          aria-label="Back to Home"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="reports-heading-text">
          <span className="eyebrow">YOUR PROGRESS, MADE VISIBLE</span>
          <h1>Reports 📊</h1>
          <p>Small steps become meaningful change.</p>
        </div>
        <div className="reports-header-icon">
          <ChartNoAxesCombined size={25} />
        </div>
      </header>

      <div className="reports-period-switch">
        {["Week", "Month"].map((item) => (
          <button
            key={item}
            className={period === item ? "selected" : ""}
            onClick={() => setPeriod(item)}
          >
            {item === "Week" ? <CalendarDays size={17} /> : <TrendingUp size={17} />}
            This {item}
          </button>
        ))}
      </div>

      <section className="reports-hero">
        <div className="reports-hero-top">
          <div>
            <span>COMPLETION RATE</span>
            <h2>{report.completion}%</h2>
            <p>{report.done} completed · {report.pending} remaining</p>
          </div>
          <div className="reports-ring">
            <span>{report.completion}%</span>
          </div>
        </div>
        <div className="reports-track">
          <div style={{ width: `${report.completion}%` }} />
        </div>
        <p className="reports-hero-note">
          {report.total
            ? "Every completed activity is progress worth celebrating. ✨"
            : `Your ${period.toLowerCase()} is a fresh start. Add activities in Planner to see your report.`}
        </p>
      </section>

      <section className="reports-stat-grid">
        <article>
          <span>📋</span>
          <p>Activities</p>
          <strong>{report.total}</strong>
          <small>This {period.toLowerCase()}</small>
        </article>
        <article>
          <span>✅</span>
          <p>Completed</p>
          <strong>{report.done}</strong>
          <small>Marked done</small>
        </article>
        <article>
          <span>⏳</span>
          <p>Remaining</p>
          <strong>{report.pending}</strong>
          <small>Still to do</small>
        </article>
      </section>

      <section className="reports-panel">
        <div className="reports-section-title">
          <div>
            <h2>{period === "Week" ? "Daily progress" : "Monthly progress"}</h2>
            <p>Completed activities by day</p>
          </div>
          <span className="reports-title-icon"><TrendingUp size={20} /></span>
        </div>
        <div className={`reports-bars ${period === "Month" ? "monthly" : ""}`}>
          {report.bars.map((day, index) => (
            <div className="reports-bar-column" key={`${day.label}-${index}`}>
              <div className="reports-bar-track">
                <div
                  className={day.today ? "reports-bar today" : "reports-bar"}
                  style={{ height: `${day.total ? Math.max(day.percent, 5) : 2}%` }}
                  title={`${day.done} completed of ${day.total}`}
                />
              </div>
              <strong>{day.total ? `${day.percent}%` : "—"}</strong>
              <span>{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="reports-panel">
        <div className="reports-section-title">
          <div>
            <h2>Wellness breakdown</h2>
            <p>Activities by wellness category</p>
          </div>
          <span className="reports-title-icon"><Target size={20} /></span>
        </div>
        <div className="reports-category-list">
          {report.categories.map((category) => (
            <div className="reports-category" key={category.name}>
              <div
                className="reports-category-icon"
                style={{ background: category.color }}
              >
                {category.icon}
              </div>
              <div className="reports-category-main">
                <div className="reports-category-label">
                  <strong>{category.name}</strong>
                  <span>{category.done}/{category.total}</span>
                </div>
                <div className="reports-category-track">
                  <div
                    style={{
                      width: `${category.total ? (category.done / category.total) * 100 : 0}%`,
                      background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reports-insight-card">
        <div className="reports-insight-icon"><Sparkles size={22} /></div>
        <div>
          <h3>Your progress insight</h3>
          <p>
            {report.total === 0
              ? "Start by adding activities to Planner. Your reports will grow with your routine."
              : report.productiveDay
                ? `${report.productiveDay.label} is your strongest day in this ${period.toLowerCase()} by completed activities. Keep building on that momentum!`
                : "You have recorded activities. Mark them complete to reveal more progress insights."}
          </p>
        </div>
      </section>

      <section className="reports-overall-note">
        <div><Flame size={19} /><span>All-time progress</span></div>
        <strong>{report.overallDone} / {report.overallTotal}</strong>
        <p>Activities completed across all saved dates.</p>
      </section>

      <button className="reports-back-button" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Home
      </button>
    </main>
  );
}
