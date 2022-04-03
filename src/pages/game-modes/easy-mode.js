import { useEffect, useState } from "react";

const EasyMode = () => {
  const [cursorStyle, setCursorStyle] = useState();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorStyle({ top: e.pageY + "px", left: e.pageX + "px" });
      console.log("mousemove");
    });
  }, []);

  return (
    <div>
      <img
        style={cursorStyle}
        className="cursor"
        src="/static/icons/grab.png"
        alt="grab cursor"
      />
    </div>
  );
};

export default EasyMode;
