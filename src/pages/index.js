import Head from "next/head";
import Link from "next/link";

import { usePointsContext } from "../context/context";
import { useEffect } from "react";

import Card from "../components/Card";

import { contractAddress, contractABI } from "../abi/contract";

import { ethers } from "ethers";

import {
  useAccountContext,
  checkIfWalletIsConnected,
  connectWallet,
} from "../context/accountContext";

export default function Home() {
  /*
  ==================
  CONTEXT AND EFFECT
  ==================
  */

  const { points, updatePoints } = usePointsContext();

  const [accountState, accountDispatch] = useAccountContext();

  useEffect(() => {
    checkIfWalletIsConnected(accountDispatch);
  }, []);

  // Button text
  let buttonText;

  if (accountState.metamaskNotFound) {
    buttonText = "Please install metamask";
  } else if (accountState.isAppDisabled) {
    buttonText = "Switch Network";
  } else {
    buttonText = "Connect Wallet";
  }

  /*
  =========
  FUNCTIONS
  =========
  */

  const claimTile = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tokenToClaim = points / 20;

      let transaction = await connectedContract.claimTile(
        ethers.utils.parseUnits(tokenToClaim.toString(), "ether")
      );

      await transaction.wait();
      updatePoints(0);

      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ======
  RETURN
  ======
  */

  return (
    <>
      <Head>
        <title>Aim Trainer | TILE Games</title>
        <meta name="description" content="Aim Trainer game by TILE Games." />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h2>TILE Points: {points}</h2>
        <div className="conversion">
          <div className="conversion__btn-container">
            <button
              className="conversion__wallet-btn"
              onClick={() => connectWallet(accountDispatch)}
            >
              {accountState.account
                ? `${formatAccount(accountState?.account.address)} | $ROSE : ${
                    accountState?.account.balance
                  }`
                : buttonText}
            </button>
            <button className="conversion__btn" onClick={claimTile}>
              Convert TILE <br /> Points
            </button>
          </div>
          <p className="conversion__exchange-info">
            20 TILE Points = 1 TILE Token
          </p>
          <p className="conversion__warning">Frequent conversion is advised</p>
        </div>
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
      <footer>
        <h4>2022 © TILE Gaming</h4>
        <div className="attribution">
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik">Freepik</a>,{" "}
          <a href="https://www.flaticon.com/authors/blak1ta">Blak1ta</a> from{" "}
          <a href="https://www.flaticon.com/">Flaticon</a>
        </div>
      </footer>
    </>
  );
}

export const formatAccount = (str) =>
  str && str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
