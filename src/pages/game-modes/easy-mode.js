import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const iconPathArray = [
  "/static/icons/bitcoin.png",
  "/static/icons/ethereum.png",
  "/static/icons/binance.png",
  "/static/icons/dollar-symbol.png",
  "/static/icons/euro.png",
  "/static/icons/pound-sterling.png",
];

const EasyMode = () => {
  const [cursorStyle, setCursorStyle] = useState();
  const [isGameOn, setIsGameOn] = useState(false);
  const [isTargetOn, setIsTargetOn] = useState(false);
  const [points, setPoints] = useState(0);
  const [targetSpecs, setTargetSpecs] = useState({
    iconPath: "/static/icons/bitcoin.png",

    isCrypto: true,
    position: null,
  });

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

  const containerRef = useRef();
  const intervalRef = useRef();

  const startGame = () => {
    setIsGameOn(true);
    setIsTargetOn(true);
  };

  const spawnTarget = () => {
    const containerHeight = containerRef.current.offsetHeight;
    const containerWidth = containerRef.current.offsetWidth;

    const randomTop = Math.random() * (containerHeight - 200);
    const randomLeft = Math.random() * (containerWidth - 200);

    const iconIndex = Math.floor(Math.random() * 6);

    const targetIcon = iconPathArray[iconIndex];

    setTargetSpecs({
      iconPath: targetIcon,
      isCrypto: iconIndex <= 2,
      position: { top: randomTop + "px", left: randomLeft + "px" },
    });

    setIsTargetOn(true);
  };

  const hitTarget = () => {
    setIsTargetOn(false);
    setPoints((prev) => prev + 1);
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
        <h3>Points: {points}</h3>
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
            style={targetSpecs.position}
            src={targetSpecs.iconPath}
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
