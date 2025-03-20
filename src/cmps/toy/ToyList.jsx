import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className="toy-list clean-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <Link className="preview-link" to={`/toy/${toy._id}`}>
            <ToyPreview toy={toy} />
          </Link>
          {onRemoveToy && (
            <div className="btn-container">
              <Link className="btn btn-icon" to={`/toy/edit/${toy._id}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button
                className="btn btn-icon"
                onClick={() => onRemoveToy(toy._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
