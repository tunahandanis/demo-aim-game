import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="btn-container">
        <Link href="/game-modes/easy-mode">
          <a className="link-btn">Easy</a>
        </Link>
        <Link href="/game-modes/medium-mode">
          <a className="link-btn">Medium</a>
        </Link>
        <Link href="/game-modes/hard-mode">
          <a className="link-btn">Hard</a>
        </Link>
      </div>
    </main>
  );
}
