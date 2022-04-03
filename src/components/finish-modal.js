import Link from "next/link";
import { usePointsContext } from "../context/context.js";

const FinishModal = ({ startingPoints }) => {
  const { points } = usePointsContext();

  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        <h1>You finished the game!</h1>
        <h2>
          Points difference:
          {points - startingPoints > 0 ? (
            <span style={{ color: "green", marginLeft: ".5em" }}>
              {points - startingPoints}
            </span>
          ) : points - startingPoints < 0 ? (
            <span style={{ color: "red", marginLeft: ".5em" }}>
              {points - startingPoints}
            </span>
          ) : (
            <span style={{ marginLeft: ".5em" }}>
              {points - startingPoints}
            </span>
          )}
        </h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
