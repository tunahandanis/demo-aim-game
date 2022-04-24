import Head from "next/head";
import Link from "next/link";

import { usePointsContext } from "../context/context";
import { useEffect, useState } from "react";

import Card from "../components/Card";

export default function Home() {
  const { points } = usePointsContext();

  return (
    <main>
      <header>
        <h2>Points: {points}</h2>
      </header>
      <div className="btn-container">
        <Card
          destination={"/game-modes/level-one"}
          level={1}
          modeName={"Spot Trader"}
          description={"Win/Lose 1 Points per hit"}
          img={"/static/images/Level 1 - Spot Trader.png"}
        />
        <Card
          destination={"/game-modes/level-two"}
          level={2}
          modeName={"Leverage Trader"}
          description={"Win/Lose 2 Points per hit"}
          img={"/static/images/Level 2 - Leverage Trader.png"}
        />
        <Card
          destination={"/game-modes/level-three"}
          level={3}
          modeName={"HODLer"}
          description={"Win/Lose 3 Points per hit"}
          img={"/static/images/Level 3 - Hodler.png"}
        />
        <Card
          destination={"/game-modes/level-four"}
          level={4}
          modeName={"Developer"}
          description={"Win/Lose 4 Points per hit"}
          img={"/static/images/Level 4 - Developer.png"}
        />
        <Card
          destination={"/game-modes/level-five"}
          level={5}
          modeName={"Satoshi"}
          description={"Win/Lose 5 Points per hit"}
          img={"/static/images/Level 5 - Satoshi.png"}
        />
        {/* <Link href="/game-modes/level-one">
          <a className="link-btn">Level 1</a>
        </Link>
        <Link href="/game-modes/level-two">
          <a className="link-btn">Level 2</a>
        </Link>
        <Link href="/game-modes/level-three">
          <a className="link-btn">Level 3</a>
        </Link>
        <Link href="/game-modes/level-four">
          <a className="link-btn">Level 4</a>
        </Link>
        <Link href="/game-modes/level-five">
          <a className="link-btn">Level 5</a>
        </Link> */}
      </div>

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
