import Link from "next/link";

const FinishModal = () => {
  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        <h1>You finished the game!</h1>
        <h2>Points difference: </h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
