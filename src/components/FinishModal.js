import Link from "next/link";

const FinishModal = ({ pointsEarned }) => {
  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        <h1>You finished the game!</h1>
        <h2>
          Points difference:
          {pointsEarned > 0 ? (
            <span style={{ color: "green", marginLeft: ".5em" }}>
              {pointsEarned}
            </span>
          ) : pointsEarned < 0 ? (
            <span style={{ color: "red", marginLeft: ".5em" }}>
              {pointsEarned}
            </span>
          ) : (
            <span style={{ marginLeft: ".5em" }}>{pointsEarned}</span>
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
