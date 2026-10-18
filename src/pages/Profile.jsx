import { useEffect, useState } from "react";
import {
  ArrowLeft,
  UserRound,
  Settings,
  Heart,
  Palette,
  LogOut,
  Save,
} from "lucide-react";

const PROFILE_KEY = "lifeos_profile";

export default function Profile({ onBack, onLogout }) {
  const [name, setName] = useState("");
  const [reminders, setReminders] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
      setName(saved.name || "");
      setReminders(saved.reminders !== false);
    } catch {
      setName("");
      setReminders(true);
    }
  }, []);

  function saveProfile(e) {
    e.preventDefault();
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({ name: name.trim(), reminders })
    );
    setMessage("Your preferences have been saved.");
    setTimeout(() => setMessage(""), 2500);
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 5px 20px rgba(70, 60, 100, 0.06)",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: "#625875",
  };

  return (
    <div
      className="profile-page"
      style={{
        minHeight: "100vh",
        background: "#f8f5ff",
        padding: "20px 16px 100px",
        color: "#342d4b",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
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
          <h1 style={{ margin: 0, fontSize: 25, fontWeight: 800 }}>
            Profile & Settings
          </h1>
          <p style={{ margin: "5px 0 0", color: "#827a96", fontSize: 13 }}>
            Make LifeOS feel like yours.
          </p>
        </div>
      </header>

      <section
        style={{
          ...cardStyle,
          background: "linear-gradient(135deg, #eee8ff, #fff0f5)",
          textAlign: "center",
          padding: 26,
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            margin: "0 auto 12px",
            borderRadius: "50%",
            background: "#fff",
            color: "#8b78d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserRound size={38} />
        </div>
        <h2 style={{ margin: 0, fontSize: 21 }}>
          {name.trim() || "Your LifeOS Profile"}
        </h2>
        <p style={{ color: "#827a96", fontSize: 13, marginBottom: 0 }}>
          Your personal wellness space
        </p>
      </section>

      <form onSubmit={saveProfile}>
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <UserRound color="#8b78d6" size={22} />
            <h2 style={{ margin: 0, fontSize: 18 }}>Personal Details</h2>
          </div>

          <label htmlFor="profile-name" style={labelStyle}>
            What should we call you?
          </label>
          <input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={60}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: 13,
              border: "1px solid #e5def5",
              borderRadius: 12,
              background: "#fff",
              color: "#342d4b",
              fontSize: 15,
            }}
          />
        </section>

        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <Settings color="#8b78d6" size={22} />
            <h2 style={{ margin: 0, fontSize: 18 }}>App Preferences</h2>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                Reminder preference
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#827a96",
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                Save your preference for future reminder features.
              </div>
            </div>
            <input
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              aria-label="Enable reminder preference"
              style={{
                width: 21,
                height: 21,
                accentColor: "#8b78d6",
                flexShrink: 0,
              }}
            />
          </div>

          <div
            style={{
              borderTop: "1px solid #f0edf6",
              marginTop: 18,
              paddingTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Palette color="#8b78d6" size={21} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                Pastel appearance
              </div>
              <div style={{ fontSize: 12, color: "#827a96", marginTop: 4 }}>
                LifeOS currently uses its light pastel design.
              </div>
            </div>
          </div>
        </section>

        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Heart color="#df7d9e" size={22} />
            <h2 style={{ margin: 0, fontSize: 18 }}>Your Wellness Space</h2>
          </div>
          <p
            style={{
              margin: 0,
              color: "#827a96",
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            Your fitness, mental wellness, sleep, nutrition, habits, and
            personal growth tools are available from your LifeOS dashboard.
            Your data is stored locally on this device by the current app
            implementation.
          </p>
        </section>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 15,
            border: "none",
            borderRadius: 14,
            background: "#8b78d6",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          <Save size={18} />
          Save Preferences
        </button>

        {message && (
          <p
            role="status"
            style={{
              textAlign: "center",
              color: "#419b7a",
              fontSize: 13,
            }}
          >
            {message}
          </p>
        )}
      </form>

      <button
        type="button"
        onClick={() => {
          if (
            window.confirm(
              "Sign out of LifeOS and return to the welcome screen?"
            )
          ) {
            if (onLogout) {
              onLogout();
            } else {
              localStorage.removeItem("lifeos_onboarding_complete");
              window.location.reload();
            }
          }
        }}
        style={{
          width: "100%",
          padding: 14,
          border: "1px solid #f0dce4",
          borderRadius: 14,
          background: "#fff",
          color: "#c45d7b",
          fontSize: 14,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          cursor: "pointer",
          marginTop: 8,
        }}
      >
        <LogOut size={18} />
        Sign Out
      </button>

      <p
        style={{
          textAlign: "center",
          color: "#a49caf",
          fontSize: 12,
          marginTop: 24,
        }}
      >
        LifeOS · Your journey, your pace.
      </p>
    </div>
  );
}
