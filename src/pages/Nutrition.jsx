import { useState } from "react";
import { ArrowLeft, Droplets, Plus, Minus } from "lucide-react";
import "../App.css";

export default function Nutrition({ onBack }) {
  const [goal, setGoal] = useState(8);
  const [water, setWater] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_water");
      const data = saved ? JSON.parse(saved) : {};
      return data[new Date().toDateString()] || 0;
    } catch {
      return 0;
    }
  });

  function updateWater(value) {
    const next = Math.max(0, value);
    setWater(next);

    try {
      const saved = JSON.parse(localStorage.getItem("lifeos_water") || "{}");
      saved[new Date().toDateString()] = next;
      localStorage.setItem("lifeos_water", JSON.stringify(saved));
    } catch {
      localStorage.setItem(
        "lifeos_water",
        JSON.stringify({ [new Date().toDateString()]: next })
      );
    }
  }

  return (
    <main className="dashboard nutrition-page">
      <header className="page-header">
        <button className="reports-back-button" onClick={onBack} aria-label="Back">
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="eyebrow">FUEL YOUR BODY</span>
          <h1>Nutrition & Hydration 💧</h1>
          <p>Small choices, healthier days.</p>
        </div>
      </header>

      <section className="reports-hero">
        <Droplets size={42} />
        <h2>Your Daily Water Goal</h2>
        <p>Keep your body refreshed throughout the day.</p>

        <div style={{ fontSize: 44, fontWeight: 700, margin: "20px 0" }}>
          {water} / {goal} glasses
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="primary-button" onClick={() => updateWater(water - 1)}>
            <Minus size={18} /> Remove
          </button>
          <button className="primary-button" onClick={() => updateWater(water + 1)}>
            <Plus size={18} /> Add Water
          </button>
        </div>

        <label style={{ display: "block", marginTop: 24 }}>
          Daily goal
          <select
            value={goal}
            onChange={event => setGoal(Number(event.target.value))}
            style={{ display: "block", margin: "10px auto", padding: 12, borderRadius: 12 }}
          >
            {[4, 6, 8, 10, 12, 14].map(number => (
              <option key={number} value={number}>{number} glasses</option>
            ))}
          </select>
        </label>
      </section>

      <section className="summary-panel" style={{ marginTop: 20 }}>
        <h2>Nutrition & Hydration</h2>
        <p>Your nutrition tools and meal tracking will be added here.</p>
      </section>
    </main>
  );
}
