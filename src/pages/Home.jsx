import { useNavigate } from "react-router-dom";
import home from "../assets/img/home.jpeg";

export function Home() {
  const navigate = useNavigate();
  return (
    <section className="home full">
      <img
        src={home}
        alt="home"
        onClick={() => navigate("/toy")}
        style={{ height: "90vh", objectFit: "cover", cursor: "pointer" }}
      />
    </section>
  );
}
