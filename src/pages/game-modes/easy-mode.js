import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const EasyMode = () => {
  const [cursorStyle, setCursorStyle] = useState();
  const [isGameOn, setIsGameOn] = useState(false);
  const [isTargetOn, setIsTargetOn] = useState(false);
  const [targetPosition, setTargetPosition] = useState();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorStyle({ top: e.pageY + "px", left: e.pageX + "px" });
    });
  }, []);

  useEffect(() => {
    if (isGameOn) {
      intervalRef.current = setInterval(spawnTarget, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isGameOn]);

  let target;

  const containerRef = useRef();
  const intervalRef = useRef();

  const startGame = () => {
    setIsGameOn(true);
    setIsTargetOn(true);
  };

  const spawnTarget = () => {
    const containerHeight = containerRef.current.offsetHeight;
    const containerWidth = containerRef.current.offsetWidth;

    const randomTop = Math.random() * (containerHeight - 150);
    const randomLeft = Math.random() * (containerWidth - 150);

    setTargetPosition({ top: randomTop + "px", left: randomLeft + "px" });

    setIsTargetOn(true);
  };

  const hitTarget = () => {
    setIsTargetOn(false);
  };

  return (
    <main>
      <header>
        <Link href="/">
          <a className="logo">Aim Training</a>
        </Link>
        {!isGameOn && (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        )}
      </header>
      <img
        style={cursorStyle}
        className="cursor"
        src="/static/icons/grab.png"
        alt="grab cursor"
      />
      <div ref={containerRef} className="game-container">
        {isTargetOn && (
          <img
            style={targetPosition}
            src="/static/icons/ethereum.png"
            alt="target"
            className="target"
            onClick={hitTarget}
          />
        )}
      </div>
    </main>
  );
};

export default EasyMode;
