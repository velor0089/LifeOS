import { useEffect, useState } from "react";
import {
  Heart, Eye, EyeOff, Mail, Lock, ArrowLeft, UserRound,
  Bell, Dumbbell, Brain, Moon, Droplets, CheckSquare, BookOpen,
  Home, CalendarDays, ChartNoAxesColumn, ChartNoAxesCombined,
  ChevronRight, Flame, Plus, Clock, CircleCheck, X, Save
} from "lucide-react";
import Quotes from "./pages/Quotes";
import Gym from "./pages/Gym";
import Reports from "./pages/Reports";
import MentalPeace from "./pages/MentalPeace";
import SleepRecovery from "./pages/SleepRecovery";
import Nutrition from "./pages/Nutrition";
import DailyHabits from "./pages/DailyHabits";
import PersonalGrowth from "./pages/PersonalGrowth";
import Profile from "./pages/Profile";
import "./App.css";

const categories = [
  { title: "Gym & Fitness", subtitle: "Build strength", icon: Dumbbell, color: "gym", value: "0 workouts" },
  { title: "Mental Peace", subtitle: "Find your balance", icon: Brain, color: "mental", value: "Take a breath" },
  { title: "Sleep & Recovery", subtitle: "Rest and recharge", icon: Moon, color: "sleep", value: "Log your sleep" },
  { title: "Nutrition & Hydration", subtitle: "Fuel your body", icon: Droplets, color: "nutrition", value: "Track your water" },
  { title: "Daily Habits", subtitle: "Small steps daily", icon: CheckSquare, color: "habits", value: "Build a streak" },
  { title: "Personal Growth", subtitle: "Learn and grow", icon: BookOpen, color: "growth", value: "Keep learning" },
];

const navigation = [
  { label: "Home", icon: Home },
  { label: "Planner", icon: CalendarDays },
  { label: "Summary", icon: ChartNoAxesColumn },
  { label: "Reports", icon: ChartNoAxesCombined },
];

function WelcomeScreen({ onStart }) {
  return (
    <main className="app">
      <header className="topbar">
        <div className="logo">Life<span>OS</span></div>
        <p className="tagline">A Better You, Every Day</p>
      </header>
      <section className="hero">
        <div className="sun" />
        <div className="mountain mountain-back" />
        <div className="mountain mountain-front" />
        <div className="character">
          <div className="hair" />
          <div className="face">
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="smile" />
          </div>
          <div className="neck" />
          <div className="body"><span className="shirt-mark">L</span></div>
          <div className="arm arm-left" />
          <div className="arm arm-right" />
        </div>
        <div className="feature-list">
          <div>💙 Track your day</div>
          <div>💜 Plan your goals</div>
          <div>🧡 Improve every day</div>
          <div>💚 Be your best</div>
        </div>
      </section>
      <section className="welcome-content">
        <h1>Build Better Habits.<br /><span>Live Better.</span></h1>
        <p>Your health. Your habits.<br />Your better tomorrow.</p>
        <button className="primary-button" onClick={onStart}>Get Started →</button>
        <footer>YOUR LIFE. YOUR GOALS. YOUR PROGRESS.</footer>
      </section>
    </main>
  );
}

function AuthScreen({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function submit(event) {
    event.preventDefault();
    if (mode === "signup" && !form.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    onSuccess();
  }

  return (
    <main className="app auth-app">
      <button className="back-button" onClick={onBack}><ArrowLeft size={22} /></button>
      <header className="auth-header">
        <div className="logo">Life<span>OS</span></div>
        <p>Your Health. Your Habits.</p>
        <p>Your Better Tomorrow.</p>
      </header>
      <section className="auth-card">
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        <h1>{mode === "login" ? "Welcome Back!" : "Create Your Account"}</h1>
        <p className="auth-subtitle">{mode === "login" ? "Your better routine starts here." : "Start building a healthier you."}</p>
        <form onSubmit={submit}>
          {mode === "signup" && (
            <label className="input-box"><UserRound size={19} />
              <input name="name" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </label>
          )}
          <label className="input-box"><Mail size={19} />
            <input name="email" type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label className="input-box"><Lock size={19} />
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button>
          </label>
          {mode === "login" && <button type="button" className="forgot-button" onClick={() => alert("Password recovery will be added later.")}>Forgot Password?</button>}
          <button className="primary-button auth-submit" type="submit">{mode === "login" ? "Login →" : "Create Account →"}</button>
        </form>
        <div className="auth-divider"><span>YOUR JOURNEY, YOUR PACE</span></div>
        <div className="auth-note"><Heart size={17} fill="#f052a0" color="#f052a0" />Small steps make a big difference.</div>
      </section>
      <footer className="auth-footer">YOUR LIFE. YOUR GOALS. YOUR PROGRESS.</footer>
    </main>
  );
}

function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {navigation.map(item => {
        const Icon = item.icon;
        return (
          <button key={item.label} className={active === item.label ? "nav-item active" : "nav-item"} onClick={() => onNavigate(item.label)}>
            <Icon size={21} /><span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function HomeDashboard({ onNavigate, activities }) {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const todayActivities = activities.filter(a => a.date === todayKey);
  const completed = todayActivities.filter(a => a.done).length;
  const progress = todayActivities.length
    ? Math.round(completed / todayActivities.length * 100)
    : 0;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-greeting">
          <p>{date}</p>
          <h1>Good morning! ☀️</h1>
          <p>Let's make today count.</p>
        </div>
        <button className="avatar-button" onClick={() => onNavigate("Profile")}><UserRound size={25} /></button>
        <button className="notification-button" onClick={() => alert("Notifications will be added later.")}><Bell size={21} /></button>
      </header>
      <section className="daily-progress">
        <div className="progress-top">
          <div><span className="eyebrow">YOUR DAILY JOURNEY</span><h2>Today's Progress</h2></div>
          <div className="progress-number">{progress}%</div>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="progress-bottom"><span>{completed} of {activities.length} activities completed</span><span>Keep going 💗</span></div>
      </section>
      <div className="section-heading"><div><h2>Your Wellness</h2><p>Six areas. One healthier you.</p></div></div>
      <section className="category-grid">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button key={category.title} className={`category-card ${category.color}`} onClick={() => onNavigate(category.title)}>
              <span className="category-icon"><Icon size={23} /></span>
              <ChevronRight className="category-arrow" size={17} />
              <h3>{category.title}</h3><p>{category.subtitle}</p><span className="category-value">{category.value}</span>
            </button>
          );
        })}
      </section>
      <section className="today-plan">
        <div className="section-heading"><div><h2>Today's Plan</h2><p>One step at a time.</p></div><button onClick={() => onNavigate("Planner")}>View all</button></div>
        {activities.slice(0, 3).map(activity => (
          <div className="plan-item" key={activity.id}>
            <div className={`plan-icon ${activity.color || "gym"}`}><Clock size={21} /></div>
            <div className="plan-details"><strong>{activity.title}</strong><span>{activity.time || "Time not set"}</span></div>
            <span className={activity.done ? "activity-status done" : "activity-status"}>{activity.done ? "✓" : "•"}</span>
          </div>
        ))}
        {!activities.length && <p className="empty-plan">Your plan is waiting. Add your first activity in Planner.</p>}
      </section>
      <section className="encouragement-card"><div className="encouragement-icon"><Flame size={23} /></div><div><h3>Progress, not perfection</h3><p>Your routine grows one small step at a time.</p></div></section>
      <BottomNav active="Home" onNavigate={onNavigate} />
    </main>
  );
}

function PlannerScreen({ activities, setActivities, onNavigate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("08:00");
  const [category, setCategory] = useState("Gym & Fitness");

  const weekStart = new Date(selectedDate);
  const dayOfWeek = (weekStart.getDay() + 6) % 7;
  weekStart.setDate(weekStart.getDate() - dayOfWeek);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const dateKey = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const todayActivities = activities.filter(a => a.date === dateKey(selectedDate));
  const selectedLabel = selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  function addActivity(event) {
    event.preventDefault();
    if (!title.trim()) return;
    const color = categories.find(c => c.title === category)?.color || "gym";
    setActivities(prev => [...prev, {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      time,
      category,
      color,
      done: false,
      date: dateKey(selectedDate),
    }]);
    setTitle("");
    setShowForm(false);
  }

  function toggleActivity(id) {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));
  }

  return (
    <main className="dashboard planner-screen">
      <header className="page-header">
        <div><span className="eyebrow">MAKE SPACE FOR WHAT MATTERS</span><h1>Planner 📅</h1><p>Plan your day, your way.</p></div>
        <button className="add-round" onClick={() => setShowForm(true)} aria-label="Add activity"><Plus size={23} /></button>
      </header>

      <section className="calendar-card">
        <div className="calendar-month">
          <button onClick={() => setSelectedDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7))}>‹</button>
          <h2>{selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
          <button onClick={() => setSelectedDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7))}>›</button>
        </div>
        <div className="week-strip">
          {days.map(day => {
            const active = dateKey(day) === dateKey(selectedDate);
            return (
              <button key={dateKey(day)} className={active ? "week-day selected" : "week-day"} onClick={() => setSelectedDate(day)}>
                <span>{day.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2)}</span><strong>{day.getDate()}</strong><i />
              </button>
            );
          })}
        </div>
      </section>

      <div className="section-heading planner-section-heading">
        <div><h2>{selectedLabel}</h2><p>{todayActivities.length} planned activities</p></div>
        <button onClick={() => setShowForm(true)}><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <section className="activity-form-card">
          <div className="form-card-heading"><h3>New Activity</h3><button onClick={() => setShowForm(false)} aria-label="Close"><X size={20} /></button></div>
          <form onSubmit={addActivity}>
            <label>Activity name<input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chest workout, reading" required /></label>
            <label>Time<input type="time" value={time} onChange={e => setTime(e.target.value)} required /></label>
            <label>Category<select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c.title}>{c.title}</option>)}</select></label>
            <button className="primary-button" type="submit"><Save size={17} /> Save Activity</button>
          </form>
        </section>
      )}

      <section className="planner-activities">
        {!todayActivities.length && !showForm && (
          <div className="empty-state"><div>🌱</div><h3>A fresh page awaits</h3><p>Add an activity to make a plan for this day.</p><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={18} /> Add Your First Activity</button></div>
        )}
        {todayActivities.map(activity => (
          <article className="planner-activity" key={activity.id}>
            <button className={activity.done ? "activity-check checked" : "activity-check"} onClick={() => toggleActivity(activity.id)} aria-label="Toggle completion">{activity.done ? <CircleCheck size={23} /> : <span />}</button>
            <div className={`planner-activity-icon ${activity.color}`}><Clock size={21} /></div>
            <div className="planner-activity-info"><strong>{activity.title}</strong><span>{activity.time} · {activity.category}</span></div>
            <button className="activity-delete" onClick={() => setActivities(prev => prev.filter(a => a.id !== activity.id))} aria-label="Delete activity"><X size={18} /></button>
          </article>
        ))}
      </section>

      <section className="planner-shortcuts">
        <h2>Plan Your Wellness</h2><p>Choose a category to explore.</p>
        <div className="planner-category-list">
          {categories.map(c => {
            const Icon = c.icon;
            return <button key={c.title} className={`planner-category-row ${c.color}`} onClick={() => onNavigate(c.title)}><span><Icon size={20} /></span><strong>{c.title}</strong><ChevronRight size={18} /></button>;
          })}
        </div>
      </section>
      <BottomNav active="Planner" onNavigate={onNavigate} />
    </main>
  );
}


function SummaryScreen({ activities, onNavigate }) {
  const today = new Date();
  const dateKey = d =>
    `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const todayKey = dateKey(today);

  const todayActivities = activities.filter(a => a.date === todayKey);
  const allCompleted = activities.filter(a => a.done).length;
  const allPending = activities.length - allCompleted;
  const completed = todayActivities.filter(a => a.done).length;
  const pending = todayActivities.length - completed;
  const progress = todayActivities.length
    ? Math.round(completed / todayActivities.length * 100)
    : 0;

  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const key = dateKey(date);
    const items = activities.filter(a => a.date === key);
    const done = items.filter(a => a.done).length;
    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      total: items.length,
      done,
      percent: items.length ? Math.round(done / items.length * 100) : 0,
      isToday: key === todayKey
    };
  });

  const categoryStats = categories.map(category => {
    const items = activities.filter(a => a.category === category.title);
    return {
      ...category,
      total: items.length,
      done: items.filter(a => a.done).length
    };
  }).filter(c => c.total > 0);

  return (
    <main className="dashboard summary-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">YOUR JOURNEY AT A GLANCE</span>
          <h1>Summary ✨</h1>
          <p>Small steps add up to big changes.</p>
        </div>
      </header>

      <section className="summary-hero-card">
        <div className="summary-hero-top">
          <div>
            <span className="eyebrow">TODAY'S PROGRESS</span>
            <h2>{progress}%</h2>
            <p>{completed} completed · {pending} remaining</p>
          </div>
          <div className="summary-ring" style={{ "--progress": `${progress}%` }}>
            <span>{progress}%</span>
          </div>
        </div>
        <div className="summary-progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
        <p className="summary-encouragement">
          {todayActivities.length === 0
            ? "Your day is a fresh page. Add an activity in Planner to begin."
            : progress === 100
              ? "Wonderful work! You completed today's planned activities. 🎉"
              : "Keep going. Every completed activity moves you forward. 💗"}
        </p>
        <button className="summary-link-button" onClick={() => onNavigate("Planner")}>
          Open Planner <ChevronRight size={17} />
        </button>
      </section>

      <section className="summary-stat-grid">
        <article className="summary-stat-card stat-total">
          <span>📋</span><p>All activities</p><strong>{activities.length}</strong>
        </article>
        <article className="summary-stat-card stat-done">
          <span>✅</span><p>Completed</p><strong>{allCompleted}</strong>
        </article>
        <article className="summary-stat-card stat-pending">
          <span>⏳</span><p>Remaining</p><strong>{allPending}</strong>
        </article>
      </section>

      <section className="summary-panel">
        <div className="section-heading">
          <div><h2>This Week</h2><p>Activity completion by day</p></div>
        </div>
        <div className="summary-week-chart">
          {weekDays.map(day => (
            <div className="summary-week-day" key={day.label}>
              <div className="summary-bar-area">
                <div
                  className={day.isToday ? "summary-bar today" : "summary-bar"}
                  style={{ height: `${day.total ? Math.max(day.percent, 8) : 4}%` }}
                  title={`${day.done} of ${day.total} completed`}
                />
              </div>
              <strong>{day.total ? `${day.percent}%` : "—"}</strong>
              <span className={day.isToday ? "today-label" : ""}>{day.label}</span>
            </div>
          ))}
        </div>
        <p className="summary-chart-note">
          Bars show the completion percentage for days with planned activities.
        </p>
      </section>

      <section className="summary-panel">
        <div className="section-heading">
          <div><h2>Wellness Breakdown</h2><p>Your planned activities by category</p></div>
        </div>
        {categoryStats.length === 0 ? (
          <div className="summary-empty">
            <span>🌱</span>
            <strong>Your wellness journey starts here</strong>
            <p>Add activities in Planner to see your category breakdown.</p>
          </div>
        ) : categoryStats.map(category => {
          const Icon = category.icon;
          const percent = Math.round(category.done / category.total * 100);
          return (
            <div className="summary-category-row" key={category.title}>
              <div className={`summary-category-icon ${category.color}`}><Icon size={20} /></div>
              <div className="summary-category-content">
                <div className="summary-category-heading">
                  <strong>{category.title}</strong>
                  <span>{category.done}/{category.total}</span>
                </div>
                <div className="summary-category-track">
                  <div style={{ width: `${percent}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <BottomNav active="Summary" onNavigate={onNavigate} />
    </main>
  );
}

function PlaceholderScreen({ title, onBack, onHome }) {
  return (
    <main className="app coming-soon">
      <div className="logo">Life<span>OS</span></div>
      <div className="coming-icon">🌱</div>
      <h1>{title}</h1>
      <p>This section is ready for us to build next.</p>
      <button className="primary-button" onClick={onBack}>Go Back</button>
      <button className="plain-home-button" onClick={onHome}>Return to Home</button>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState(() => {
    try {
      return localStorage.getItem("lifeos_onboarding_complete") === "true"
        ? "home"
        : "welcome";
    } catch {
      return "welcome";
    }
  });
  // lifeos-browser-back-handler
  useEffect(() => {
    const historyMarker = { lifeosNavigation: true };

    window.history.pushState(historyMarker, "", window.location.href);

    const handlePopState = () => {
      if (screen === "home") {
        const leave = window.confirm("Do you want to leave LifeOS?");
        if (leave) {
          window.history.back();
          return;
        }
      } else if (screen === "Planner" ||
                 screen === "Summary" ||
                 screen === "Reports" ||
                 screen === "Gym & Fitness" ||
                 screen === "Mental Peace" ||
                 screen === "Sleep & Recovery" ||
                 screen === "Nutrition & Hydration" ||
                 screen === "Daily Habits" ||
                 screen === "Personal Growth") {
        setScreen("home");
      } else if (screen === "quotes") {
        setScreen("home");
      } else if (screen === "auth") {
        setScreen("welcome");
      } else {
        setScreen("home");
      }

      window.history.pushState(historyMarker, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [screen]);

  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_activities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lifeos_activities", JSON.stringify(activities));
  }, [activities]);

  if (screen === "welcome") return <WelcomeScreen onStart={() => setScreen("auth")} />;

  if (screen === "auth") {
    return <AuthScreen onBack={() => setScreen("welcome")} onSuccess={() => setScreen("quotes")} />;
  }

  if (screen === "quotes") {
    return (
      <Quotes
        onComplete={() => {
          localStorage.setItem("lifeos_onboarding_complete", "true");
          setScreen("home");
        }}
      />
    );
  }

  if (screen === "home") {
    return <HomeDashboard activities={activities} onNavigate={setScreen} />;
  }

  if (screen === "Planner") {
    return <PlannerScreen activities={activities} setActivities={setActivities} onNavigate={setScreen} />;
  }
  if (screen === "Summary") {
    return <SummaryScreen activities={activities} onNavigate={setScreen} />;
  }

  if (screen === "Reports") {
    return <Reports activities={activities} onBack={() => setScreen("home")} />;
  }

  if (screen === "Sleep & Recovery") {
    return <SleepRecovery onBack={() => setScreen("home")} />;
  }

  if (screen === "Mental Peace") {
    return <MentalPeace onBack={() => setScreen("home")} />;
  }

  if (screen === "Gym & Fitness") {
    return <Gym onBack={() => setScreen("home")} />;
  }

  if (screen === "Nutrition & Hydration") {
    return <Nutrition onBack={() => setScreen("home")} />;
  }

  if (screen === "Daily Habits") {
    return <DailyHabits onBack={() => setScreen("home")} />;
  }

  if (screen === "Personal Growth") {
    return <PersonalGrowth onBack={() => setScreen("home")} />;
  }

  if (screen === "Profile" || screen === "Profile & Settings") {
    return (
      <Profile
        onBack={() => setScreen("home")}
        onLogout={() => {
          localStorage.removeItem("lifeos_onboarding_complete");
          setScreen("welcome");
        }}
      />
    );
  }

  return <PlaceholderScreen title={screen} onBack={() => setScreen("home")} onHome={() => setScreen("home")} />;
}

