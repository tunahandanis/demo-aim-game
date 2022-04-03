import { useEffect, useState } from "react";
import Link from "next/link";

const EasyMode = () => {
  const [cursorStyle, setCursorStyle] = useState();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorStyle({ top: e.pageY + "px", left: e.pageX + "px" });
    });
  }, []);

  return (
    <main>
      <header>
        <Link href="/">
          <a className="logo">Aim Training</a>
        </Link>
      </header>
      <img
        style={cursorStyle}
        className="cursor"
        src="/static/icons/grab.png"
        alt="grab cursor"
      />
    </main>
  );
};

export default EasyMode;
