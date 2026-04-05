import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import './index.css';
import Nathan from "./assets/Nathan.png";

// Komponen Animasi Stagger Text Reveal (Huruf per Huruf / Kata per Kata)
const StaggeredText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay, ease: "easeOut" },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.8 },
    },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: word === "<br/>" ? "0" : "0.25em" }} key={index}>
          {word === "<br/>" ? <div style={{ width: "100%" }} /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  // Parallax untuk hero image: bergerak ke bawah sesuai dengan kelembutan scroll
  const yHeroImg = useTransform(scrollY, [0, 1000], [0, 200]);

  // Animasi standard untuk efek yang mengalir lembut (smooth float fade)
  const fadeFloat = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1] } }
  };

  const floatHover = {
    y: -8,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
    transition: { type: "tween", ease: "easeOut", duration: 0.4 }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        <div className="container">
          <a href="#home" className="logo">Nathan Chandra</a>
          <ul className="nav-links">
            <li><a href="#home" style={{ color: activeSection === 'home' ? 'var(--primary-color)' : '' }}>Home</a></li>
            <li><a href="#about" style={{ color: activeSection === 'about' ? 'var(--primary-color)' : '' }}>About Me</a></li>
            <li><a href="#contact" style={{ color: activeSection === 'contact' ? 'var(--primary-color)' : '' }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Home Section */}
        <section id="home">
          <div className="container">
            <div className="hero">
              <div className="hero-content">
                <motion.h3
                  className="hero-subtitle"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Hello, I'm
                </motion.h3>


                <StaggeredText text="Nathan <br/> Full Stack Developer" className="hero-title" delay={0.2} />

                <motion.p
                  className="hero-desc"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  I craft clean, elegant, and user-friendly web experiences.
                  Passionate about building responsive interfaces with modern technologies.
                </motion.p>

                <motion.a
                  href="#contact"
                  className="btn"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={floatHover}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  Let's Talk <ArrowRight size={20} />
                </motion.a>
              </div>

              <div className="hero-img-container">
                <motion.img
                  src={Nathan}
                  alt="Profile"
                  className="hero-img"
                  style={{ y: yHeroImg }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <StaggeredText text="About Me" className="section-title" />

            <div className="about-content">
              <motion.img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
                alt="Workspace"
                className="about-img"
                initial="hidden"
                whileInView="visible"
                variants={fadeFloat}
                viewport={{ once: true, margin: "-10%" }}
                whileHover={floatHover}
              />

              <motion.div
                className="about-text"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
                }}
              >
                <motion.h3 variants={fadeFloat}>A dedicated Developer based in Bogor</motion.h3>
                <motion.p variants={fadeFloat}>
                  With 2 years of experience in web development, I have developed a deep understanding of creating scalable and efficient web applications. My focus is on creating seamless user experiences using React and modern CSS.
                </motion.p>
                <motion.p variants={fadeFloat}>
                  I love turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me exploring new technologies or enjoying a good cup of coffee.
                </motion.p>

                <motion.div className="skills" variants={fadeFloat}>
                  {['React JS', 'JavaScript', 'HTML & CSS', 'TailwindCSS', 'Framer Motion'].map((skill, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag"
                      whileHover={floatHover}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="container">
            <StaggeredText text="Get In Touch" className="section-title" />

            <motion.div
              className="contact-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
              }}
            >
              <motion.div className="contact-info" variants={fadeFloat}>
                {[
                  { icon: <MapPin />, title: "Location", desc: "Bogor, Indonesia" },
                  { icon: <Mail />, title: "Email", desc: "nathanchandra359@gmail.com" },
                  { icon: <Phone />, title: "Phone", desc: "+62 858 1400 2778" }
                ].map((item, index) => (
                  <motion.div className="info-item" key={index} whileHover={{ x: 10, transition: { duration: 0.3, ease: 'easeOut' } }}>
                    <div className="info-icon">{item.icon}</div>
                    <div className="info-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <motion.a href="#" className="info-icon" whileHover={floatHover}>INS</motion.a>
                  <motion.a href="#" className="info-icon" whileHover={floatHover}>IN</motion.a>
                  <motion.a href="#" className="info-icon" whileHover={floatHover}>X</motion.a>
                </div>
              </motion.div>

              <motion.div className="contact-form-container" variants={fadeFloat}>
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="input-grp">
                    <label>Name</label>
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className="input-grp">
                    <label>Email</label>
                    <input type="email" placeholder="Your Email" />
                  </div>
                  <div className="input-grp">
                    <label>Message</label>
                    <textarea rows="4" placeholder="Write your message here..."></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="btn"
                    style={{ marginTop: '1rem' }}
                    whileHover={floatHover}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
