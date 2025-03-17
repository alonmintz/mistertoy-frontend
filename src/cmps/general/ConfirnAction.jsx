import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export function ConfirmAction({ action, onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <section className="confirm-action">
        <h4>Are you sure you want to {action}?</h4>
        <div className="btn-group">
          <button className="btn btn-icon" onClick={onConfirm}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="btn btn-icon" onClick={onCancel}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </section>
    </Modal>
  );
}
