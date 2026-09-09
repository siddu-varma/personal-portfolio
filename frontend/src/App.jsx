import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])

  // ================= CONNECT TO BACKEND =================
  useEffect(() => {
    fetch('http://127.0.0.1:5001/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Backend response:', data)
      })
      .catch((error) => {
        console.error('Backend connection failed:', error)
      })
  }, [])

  // ================= GET PROJECTS FROM MONGODB =================
  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/projects')
      .then((response) => response.json())
      .then((data) => {
        console.log('Projects from MongoDB:', data)
        setProjects(data)
      })
      .catch((error) => {
        console.error('Failed to load projects:', error)
      })
  }, [])

  return (
    <div className="portfolio">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">SV.</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <p className="small-text">HELLO, I'M</p>

          <h1>
            Vatsavayi Siddardha Varma<span>.</span>
          </h1>

          <h2>
            Python Developer & Computer Science Student
          </h2>

          <p className="hero-description">
            I’m a Computer Science student passionate about Python,
            software development and building practical digital solutions.
            I enjoy turning ideas into real-world projects and continuously
            learning new technologies.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-button">
              View My Work
            </a>

            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-glow"></div>

          <div className="profile-placeholder">
            <span>SV</span>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="section">
        <p className="section-label">01 — ABOUT ME</p>

        <h2 className="section-title">
          A little about me
        </h2>

        <div className="about-content">
          <p>
            I'm Vatsavayi Siddardha Varma, a Computer Science student
            passionate about programming, technology and software development.
          </p>

          <p>
            I enjoy learning Python and modern web technologies while creating
            practical projects that solve real-world problems.
          </p>

          <p>
            My goal is to continuously improve my technical skills and build
            meaningful software applications.
          </p>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="section">
        <p className="section-label">02 — SKILLS</p>

        <h2 className="section-title">
          Technologies I work with
        </h2>

        <div className="skills-grid">

          <div className="skill-card">
            <span>01</span>
            <h3>Python</h3>
            <p>
              Programming, automation and application development.
            </p>
          </div>

          <div className="skill-card">
            <span>02</span>
            <h3>HTML & CSS</h3>
            <p>
              Creating structured and responsive websites.
            </p>
          </div>

          <div className="skill-card">
            <span>03</span>
            <h3>JavaScript</h3>
            <p>
              Building interactive and dynamic web experiences.
            </p>
          </div>

          <div className="skill-card">
            <span>04</span>
            <h3>React</h3>
            <p>
              Developing modern component-based interfaces.
            </p>
          </div>

          <div className="skill-card">
            <span>05</span>
            <h3>Node.js</h3>
            <p>
              Backend development and REST API development.
            </p>
          </div>

          <div className="skill-card">
            <span>06</span>
            <h3>MongoDB</h3>
            <p>
              Working with databases and application data.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="section">

        <p className="section-label">03 — PROJECTS</p>

        <h2 className="section-title">
          Things I've built
        </h2>

        <div className="projects-grid">

          {projects.length === 0 ? (
            <p>Loading projects...</p>
          ) : (
            projects.map((project, index) => (
              <article className="project-card" key={project._id}>

                <div className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <div className="project-tags">
                  {project.technologies.map((technology, techIndex) => (
                    <span key={techIndex}>
                      {technology}
                    </span>
                  ))}
                </div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project →
                  </a>
                )}

              </article>
            ))
          )}

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="section contact-section">

        <p className="section-label">
          04 — CONTACT
        </p>

        <h2 className="section-title">
          Let's work together.
        </h2>

        <p className="contact-description">
          Have a project idea or want to get in touch?
          Feel free to reach out.
        </p>

        <a
          href="mailto:your-email@example.com"
          className="primary-button"
        >
          Email Me
        </a>

      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <p>
          © 2026 Vatsavayi Siddardha Varma. All rights reserved.
        </p>

        <p>
          Built with React.
        </p>
      </footer>

    </div>
  )
}

export default App