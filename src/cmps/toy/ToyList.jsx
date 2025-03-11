import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} />
          <div>
            <Link className="btn" to={`/toy/edit/${toy._id}`}>
              edit
            </Link>
            <Link className="btn" to={`/toy/${toy._id}`}>
              details
            </Link>
            <button>remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
