import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import FinishModal from "../../components/FinishModal";

import { usePointsContext } from "../../context/context.js";

const iconPathArray = [
  "/static/icons/bitcoin.png",
  "/static/icons/ethereum.png",
  "/static/icons/binance.png",
  "/static/icons/dollar-symbol.png",
  "/static/icons/euro.png",
  "/static/icons/pound-sterling.png",
];

const HardMode = () => {
  /*
  ===========
  STATE HOOKS
  ===========
  */

  const [cursorStyle, setCursorStyle] = useState();
  const [isGameOn, setIsGameOn] = useState(false);
  const [isTargetOn, setIsTargetOn] = useState(false);
  const [targetSpecs, setTargetSpecs] = useState({
    iconPath: "/static/icons/bitcoin.png",

    isCrypto: true,
    position: null,
  });
  const [countdown, setCountdown] = useState(30);
  const [isCountdownOn, setIsCountdownOn] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  /*
  =======
  CONTEXT
  =======
  */

  const { points, updatePoints } = usePointsContext();

  /*
  ============
  EFFECT HOOKS
  ============
  */

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorStyle({ top: e.pageY + "px", left: e.pageX + "px" });
    });
  }, []);

  useEffect(() => {
    if (isGameOn) {
      intervalRef.current = setInterval(spawnTarget, 500);
    }

    return () => clearInterval(intervalRef.current);
  }, [isGameOn]);

  useEffect(() => {
    if (isCountdownOn) {
      countdownTimerRef.current = setInterval(checkCountdown, 1000);
    }

    return () => clearInterval(countdownTimerRef.current);
  }, [isCountdownOn]);

  // USING REF HOOKS TO MAKE UPDATED STATE VALUE WORK INSIDE CALLBACK FUNCTION OF SETINTERVAL
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    startingPointsRef.current = points;
  }, []);

  /*
  =========
  REF HOOKS
  =========
  */

  const containerRef = useRef();
  const intervalRef = useRef();
  const startingPointsRef = useRef();

  // USING REF HOOKS TO MAKE UPDATED STATE VALUE WORK INSIDE CALLBACK FUNCTION OF SETINTERVAL
  const countdownTimerRef = useRef();
  const countdownRef = useRef();

  /*
  =========
  FUNCTIONS
  =========
  */

  const startGame = () => {
    setIsGameOn(true);
    setIsTargetOn(true);
    setIsCountdownOn(true);
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
    if (targetSpecs.isCrypto) updatePoints(points + 3);
    else {
      if (points > 0) updatePoints(points - 3);
    }
  };

  const checkCountdown = () => {
    if (countdownRef.current > 0) {
      setCountdown((prev) => prev - 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsGameOn(false);
    setIsTargetOn(false);
    setIsCountdownOn(false);
    setIsGameFinished(true);
  };

  /*
  ======
  RETURN
  ======
  */

  return (
    <main>
      <header>
        {!isGameOn && (
          <Link href="/">
            <a className="logo">Aim Training</a>
          </Link>
        )}
        {!isGameOn && (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        )}
        <h3>Points: {points}</h3>
        <h3>{countdown} seconds remain</h3>
      </header>

      <img
        style={cursorStyle}
        className="cursor"
        src="/static/icons/grab.png"
        alt="grab cursor"
        draggable="false"
      />

      <div ref={containerRef} className="game-container">
        {isTargetOn && (
          <img
            style={targetSpecs.position}
            src={targetSpecs.iconPath}
            alt="target"
            className="target"
            onClick={hitTarget}
            draggable="false"
          />
        )}
      </div>

      {isGameFinished && (
        <FinishModal startingPoints={startingPointsRef.current} />
      )}
    </main>
  );
};

export default HardMode;
