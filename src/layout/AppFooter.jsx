import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopesBulk, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function AppFooter() {
  return (
    <footer className="app-footer main-layout full">
      <nav>
        <Link className="btn btn-icon" to={"/about"}>
          <FontAwesomeIcon icon={faInfo} />
        </Link>
        <Link className="btn btn-icon" to={"/contact"}>
          <FontAwesomeIcon icon={faEnvelopesBulk} />
        </Link>
      </nav>
    </footer>
  );
}
