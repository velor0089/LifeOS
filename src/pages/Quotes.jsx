import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const quotes = [
  {
    text: "Discipline today creates the freedom of tomorrow.",
    author: "Your future self",
    emoji: "🌄",
    background: "quote-peach",
  },
  {
    text: "A healthy mind leads to a happier, stronger you.",
    author: "Your wellness journey",
    emoji: "🧘",
    background: "quote-blue",
  },
  {
    text: "Small steps every day lead to big results.",
    author: "Progress over perfection",
    emoji: "🌱",
    background: "quote-green",
  },
];

export default function Quotes({ onComplete }) {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  function nextQuote() {
    if (index === quotes.length - 1) {
      onComplete();
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <main className={`quote-screen ${quote.background}`}>
      <header className="quote-header">
        <span className="quote-logo">
          Life<span>OS</span>
        </span>
        <span className="quote-counter">{index + 1} / 3</span>
      </header>

      <section className="quote-illustration">
        <div className="quote-sun" />
        <div className="quote-mountain" />
        <div className="quote-person">{quote.emoji}</div>
        <div className="quote-dots">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="quote-content">
        <p className="quote-eyebrow">A MOMENT FOR YOURSELF</p>

        <h1>Today's Inspiration</h1>

        <blockquote>“{quote.text}”</blockquote>

        <p className="quote-author">— {quote.author}</p>

        <div className="quote-progress">
          {quotes.map((item, i) => (
            <span
              key={item.text}
              className={i === index ? "selected" : ""}
            />
          ))}
        </div>

        <button className="primary-button" onClick={nextQuote}>
          {index === 2 ? "Enter My Day" : "Next Quote"}
          <ArrowRight size={19} />
        </button>

        <button
          type="button"
          className="quote-skip"
          onClick={onComplete}
        >
          Skip quotes and go to Home →
        </button>

        {index > 0 && (
          <button
            className="quote-back"
            onClick={() => setIndex(index - 1)}
          >
            <ArrowLeft size={16} />
            Previous quote
          </button>
        )}

        <p className="quote-footer">
          YOUR LIFE. YOUR GOALS. YOUR PROGRESS.
        </p>
      </section>
    </main>
  );
}
