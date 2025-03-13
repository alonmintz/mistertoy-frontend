import { Backdrop } from "./Backdrop";

export function Modal({ onClose, children }) {
  return (
    <Backdrop onClick={onClose}>
      <section className="modal" onClick={(ev) => ev.stopPropagation()}>
        {children}
      </section>
    </Backdrop>
  );
}
