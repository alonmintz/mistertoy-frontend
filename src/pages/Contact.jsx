import githubLogo from "../assets/img/github.svg";
import linkedinLogo from "../assets/img/linkedin.svg";
import "../assets/style/cmps/_contact.scss";

export function Contact() {
  return (
    <section className="contact full main-layout">
      <div className="contact-card">
        <h2>Hey! I'm Alon Mintz 😎</h2>
        <p>
          A passionate and driven Fullstack Software Developer with a strong
          foundation in backend architecture and a unique background in
          education and leadership. I bring a team-oriented mindset, a proactive
          approach to problem-solving, and proven experience leading Agile teams
          as a Scrum Master. Currently working at Bank Hapoalim, I specialize in
          Java microservices, React-based UI development, and containerized
          environments. I'm constantly expanding and refining my fullstack
          skillset to stay on the cutting edge of modern web development.
        </p>

        <div className="social-links">
          <a
            href="https://github.com/alonmintz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/alon-mintz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </section>
  );
}
