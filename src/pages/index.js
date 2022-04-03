import Head from "next/head";
import Link from "next/link";
import { usePointsContext } from "../context/context";
import { useEffect, useState } from "react";

export default function Home() {
  const [cursorStyle, setCursorStyle] = useState();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorStyle({ top: e.pageY + "px", left: e.pageX + "px" });
    });
  }, []);

  const { points } = usePointsContext();

  return (
    <main>
      <header>
        <h2>Points: {points}</h2>
      </header>
      <div className="btn-container">
        <Link href="/game-modes/easy-mode">
          <a className="link-btn">Easy</a>
        </Link>
        <Link href="/game-modes/medium-mode">
          <a className={`link-btn ${points < 25 && "locked-btn"}`}>Medium</a>
        </Link>
        <Link href="/game-modes/hard-mode">
          <a className={`link-btn ${points < 50 && "locked-btn"}`}>Hard</a>
        </Link>
      </div>

      <img
        style={cursorStyle}
        className="cursor"
        src="/static/icons/grab.png"
        alt="grab cursor"
        draggable="false"
      />

      <div className="guide">
        <h2>Guide</h2>
        <p>
          Pick cryptocurrencies to win points <br />
          Pick fiat currencies to lose points
        </p>
        <p>
          Win/lose 1 point per currency in easy mode, 2 in medium, 3 in hard
          mode
        </p>
        <p>
          You need 25 points to enter medium mode and 50 points for hard mode
        </p>
      </div>
    </main>
  );
}
