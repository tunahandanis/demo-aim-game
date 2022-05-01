import Link from "next/link";

const FinishModal = ({ pointsEarned }) => {
  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        <h2>You finished the game!</h2>
        <h3>
          Points earned:
          <span>{pointsEarned}</span>
        </h3>
        <p className="modal__warning">
          Please make sure to convert your <br /> TILE Points in the main menu
          as they will be lost <br /> if you refresh the page or close the
          browser.
        </p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
