import { useNavigate } from "react-router-dom";
import { Backdrop } from "../cmps/general/Backdrop";
import { Modal } from "../cmps/general/Modal";

export function ToyEdit() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("/toy")}>
      <section className="toy-edit">this is toy edit</section>
    </Modal>
  );
}
