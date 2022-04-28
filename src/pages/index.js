import Head from "next/head";
import Link from "next/link";

import { usePointsContext } from "../context/context";
import { useEffect, useState } from "react";

import Card from "../components/Card";

export default function Home() {
  const { points } = usePointsContext();

  return (
    <main>
      <Head>
        <title>Aim Trainer | TILE Games</title>
        <meta name="description" content="Aim Trainer game by TILE Games." />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h2>TILE Points: {points}</h2>
      </header>

      <h1 className="title">AIM TRAINER</h1>

      <div className="btn-container">
        <Card
          destination={"/game-modes/level-one"}
          level={1}
          modeName={"Spot Trader"}
          description={"Win/Lose 1 points per hit"}
          img={"/static/images/Level 1 - Spot Trader.png"}
        />
        <Card
          destination={"/game-modes/level-two"}
          level={2}
          modeName={"Leverage Trader"}
          description={"Win/Lose 2 points per hit"}
          img={"/static/images/Level 2 - Leverage Trader.png"}
        />
        <Card
          destination={"/game-modes/level-three"}
          level={3}
          modeName={"HODLer"}
          description={"Win/Lose 3 points per hit"}
          img={"/static/images/Level 3 - Hodler.png"}
        />
        <Card
          destination={"/game-modes/level-four"}
          level={4}
          modeName={"Developer"}
          description={"Win/Lose 4 points per hit"}
          img={"/static/images/Level 4 - Developer.png"}
        />
        <Card
          destination={"/game-modes/level-five"}
          level={5}
          modeName={"Satoshi"}
          description={"Win/Lose 5 points per hit"}
          img={"/static/images/Level 5 - Satoshi.png"}
        />
      </div>

      <div className="guide">
        <h2 className="guide__title">How to Play</h2>
        <p className="guide__para">
          If you hit cryptocurrencies, you win TILE Points
        </p>
        <p className="guide__para">
          If you hit fiat money, you lose TILE Points earned in the same round
        </p>
      </div>
    </main>
  );
}
