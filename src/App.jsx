import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone, Award, X, ExternalLink, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './index.css';
import Nathan from './assets/Nathan.png';

// ─── SVG Social Icons ────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ─── Fade Up Reveal ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

// ─── Scroll progress ──────────────────────────────────────────────────────────
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress-bar" style={{ scaleX: w, transformOrigin: '0%' }} />;
};

// ─── Certificates data ────────────────────────────────────────────────────────
const baseUrl = import.meta.env.BASE_URL;

const certs = [
  {
    id: 1,
    no: '01',
    title: 'Object & Array',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085726.png`,
    accent: '#06B6D4',
  },
  {
    id: 2,
    no: '02',
    title: 'Introduction to JavaScript',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085746.png`,
    accent: '#F59E0B',
  },
  {
    id: 3,
    no: '03',
    title: 'Maximizing the use of ChatGPT',
    issuer: 'MySkill',
    date: '11 Februari 2025',
    category: 'Artificial Intelligence',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085804.png`,
    accent: '#10B981',
  },
  {
    id: 4,
    no: '04',
    title: 'Communicate with Empathy',
    issuer: 'MySkill',
    date: '12 Februari 2025',
    category: 'Soft Skill · Emotional Intelligence',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085823.png`,
    accent: '#EC4899',
  },
  {
    id: 5,
    no: '05',
    title: 'Conditional Branching and Switch Statement',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085841.png`,
    accent: '#3B82F6',
  },
  {
    id: 6,
    no: '06',
    title: 'Criticism, Weakness and Failure',
    issuer: 'MySkill',
    date: '12 Februari 2025',
    category: 'Soft Skill · Emotional Intelligence',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085855.png`,
    accent: '#EF4444',
  },
  {
    id: 7,
    no: '07',
    title: 'Data Type and Operator',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085909.png`,
    accent: '#8B5CF6',
  },
  {
    id: 8,
    no: '08',
    title: 'Document Object Model: Part 1',
    issuer: 'MySkill',
    date: '12 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085925.png`,
    accent: '#F43F5E',
  },
  {
    id: 9,
    no: '09',
    title: 'Pertamuda Workshop Series #4',
    issuer: 'Pertamina',
    date: '4 September 2025',
    category: 'Workshop · Startup',
    img: `${baseUrl}certs/Screenshot_2026-04-10_085943.png`,
    accent: '#D1D5DB',
  },
  {
    id: 10,
    no: '10',
    title: 'IGDX Career Seminar',
    issuer: 'KOMINFO & AGI',
    date: '18 Desember 2024',
    category: 'Seminar · Game Dev',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090001.png`,
    accent: '#F97316',
  },
  {
    id: 11,
    no: '11',
    title: 'Everyday Communication Skills',
    issuer: 'MySkill',
    date: '12 Februari 2025',
    category: 'Soft Skill · Communication',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090011.png`,
    accent: '#14B8A6',
  },
  {
    id: 12,
    no: '12',
    title: 'Browser, HTTP, DNS, and Hosting',
    issuer: 'MySkill',
    date: '11 Februari 2025',
    category: 'Frontend · HTML',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090026.png`,
    accent: '#6366F1',
  },
  {
    id: 13,
    no: '13',
    title: 'Introduction to HTML',
    issuer: 'MySkill',
    date: '11 Februari 2025',
    category: 'Frontend · HTML',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090037.png`,
    accent: '#F97316',
  },
  {
    id: 14,
    no: '14',
    title: 'Attributes and Block Element',
    issuer: 'MySkill',
    date: '11 Februari 2025',
    category: 'Frontend · HTML',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090059.png`,
    accent: '#EA580C',
  },
  {
    id: 15,
    no: '15',
    title: 'JavaScript Function',
    issuer: 'MySkill',
    date: '11 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090124.png`,
    accent: '#FDE047',
  },
  {
    id: 16,
    no: '16',
    title: 'Comparison and Logical Operators',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090134.png`,
    accent: '#4ADE80',
  },
  {
    id: 17,
    no: '17',
    title: 'Looping Javascript: Part 1',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090145.png`,
    accent: '#2DD4BF',
  },
  {
    id: 18,
    no: '18',
    title: 'Looping Javascript: Part 2',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090202.png`,
    accent: '#22D3EE',
  },
  {
    id: 19,
    no: '19',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    date: '9 Oktober 2024',
    category: 'Frontend · Web',
    credential: 'KEXLY0RD4ZG2',
    verifyUrl: 'https://www.dicoding.com/certificates/KEXLY0RD4ZG2',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090220.png`,
    accent: '#34D399',
  },
  {
    id: 20,
    no: '20',
    title: 'Presentation & Storytelling',
    issuer: 'MySkill',
    date: '12 Februari 2025',
    category: 'Soft Skill · Communication',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090235.png`,
    accent: '#F472B6',
  },
  {
    id: 21,
    no: '21',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    date: '5 Januari 2025',
    category: 'Frontend · JavaScript',
    credential: 'EYX4GRR6OZDL',
    verifyUrl: 'https://www.dicoding.com/certificates/EYX4GRR6OZDL',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090252.png`,
    accent: '#818CF8',
  },
  {
    id: 22,
    no: '22',
    title: 'Switch Statement',
    issuer: 'MySkill',
    date: '10 Februari 2025',
    category: 'Frontend · JavaScript',
    img: `${baseUrl}certs/Screenshot_2026-04-10_090313.png`,
    accent: '#06B6D4',
  },
];

// ─── Projects Config ────────────────────────────────────────────────────────
const targetRepos = ['TIX-ID', 'Tugas-Akhir', 'Project-Mandiri', 'Project-PP'];

// Map language to color
const getLangColor = (lang) => {
  const colors = {
    Blade: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
    JavaScript: { color: '#FDE047', bg: 'rgba(253, 224, 71, 0.1)' },
    PHP: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    HTML: { color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
    CSS: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  };
  return colors[lang] || { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.1)' };
};

// ─── Certificate Modal ────────────────────────────────────────────────────────
const Modal = ({ cert, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose}>
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* accent line */}
        <div className="modal-accent-line" style={{ background: cert.accent }} />

        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={17} />
        </button>

        {/* Certificate image */}
        <div className="modal-img-wrap">
          <img
            src={cert.img} alt={cert.title} className="modal-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div className="modal-img-fallback" style={{ display: 'none' }}>
            <p style={{ color: '#737373', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
              Gambar Sertifikat Tidak Ditemukan<br />
              <code style={{ fontSize: '0.7rem', opacity: 0.6 }}>{cert.img}</code>
            </p>
          </div>
        </div>

        <div className="modal-content">
          <span className="modal-cat" style={{ color: cert.accent }}>{cert.category}</span>
          <h2 className="modal-title">{cert.title}</h2>
          <div className="modal-meta-row">
            <span className="modal-issuer"><Award size={14} /> {cert.issuer}</span>
            <span className="modal-date">{cert.date}</span>
          </div>
          {cert.desc && <p className="modal-desc">{cert.desc}</p>}
          {cert.credential && (
            <div className="modal-cred">
              <span className="modal-cred-label">ID Sertifikat</span>
              <code className="modal-cred-id">{cert.credential}</code>
            </div>
          )}
          <div className="modal-actions">
            {cert.verifyUrl && (
              <motion.a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                className="modal-btn-primary" style={{ background: cert.accent }}
                whileHover={{ scale: 1.03, filter: 'brightness(1.12)' }} whileTap={{ scale: 0.97 }}
              >
                <CheckCircle size={15} /> Verifikasi Sertifikat
              </motion.a>
            )}
            <motion.button className="modal-btn-ghost" onClick={onClose}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Tutup
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── 3D Coverflow Certificate Slider ─────────────────────────────────────────
const CertSlider = ({ certs, onOpen }) => {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const autoTimer = useRef(null);
  const total = certs.length;

  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => setCurrent(p => (p + 1) % total), 3800);
  }, [total]);

  const stopAuto = useCallback(() => clearInterval(autoTimer.current), []);

  const go = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => { go(current - 1); }, [current, go]);
  const next = useCallback(() => { go(current + 1); }, [current, go]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoTimer.current);
  }, [startAuto]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') { stopAuto(); prev(); setTimeout(startAuto, 50); }
      if (e.key === 'ArrowRight') { stopAuto(); next(); setTimeout(startAuto, 50); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, startAuto, stopAuto]);

  const handlePointerDown = (clientX) => {
    isDragging.current = true;
    dragStartX.current = clientX;
    stopAuto();
  };
  const handlePointerUp = (clientX) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 55) diff > 0 ? next() : prev();
    startAuto();
  };

  const getProps = (i) => {
    let offset = i - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    const abs = Math.abs(offset);
    return {
      offset, abs,
      visible: abs <= 4,
      rotateY: offset * 35,
      x: offset * 190,
      z: -abs * 120,
      scale: Math.max(0.55, 1 - abs * 0.14),
      opacity: Math.max(0.1, 1 - abs * 0.25),
      zIndex: 30 - abs * 5,
    };
  };

  const active = certs[current];

  return (
    <div
      className="cslider"
      onMouseDown={e => handlePointerDown(e.clientX)}
      onMouseUp={e => handlePointerUp(e.clientX)}
      onMouseLeave={() => { if (isDragging.current) { isDragging.current = false; startAuto(); } }}
      onTouchStart={e => handlePointerDown(e.touches[0].clientX)}
      onTouchEnd={e => handlePointerUp(e.changedTouches[0].clientX)}
    >
      {/* Floating orbs */}
      <div className="cslider-orbs">
        <motion.div className="cslider-orb orb-1"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: `radial-gradient(circle, ${active.accent}35 0%, ${active.accent}00 70%)` }}
        />
        <motion.div className="cslider-orb orb-2"
          animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: `radial-gradient(circle, ${active.accent}20 0%, ${active.accent}00 70%)` }}
        />
      </div>

      {/* Ambient color wash */}
      <AnimatePresence>
        <motion.div
          key={`amb-${active.id}`}
          className="cslider-ambient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ background: `radial-gradient(ellipse 65% 55% at 50% 75%, ${active.accent}1A 0%, ${active.accent}00 70%)` }}
        />
      </AnimatePresence>

      {/* 3D Stage */}
      <div className="cslider-stage">
        {certs.map((cert, i) => {
          const p = getProps(i);
          if (!p.visible) return null;
          return (
            <motion.div
              key={cert.id}
              className={`cslider-item${p.offset === 0 ? ' cslider-item-active' : ''}`}
              style={{ zIndex: p.zIndex, '--acc': cert.accent }}
              animate={{
                x: p.x, z: p.z,
                rotateY: p.rotateY,
                scale: p.scale,
                opacity: p.opacity,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.9 }}
              onClick={() => {
                if (p.offset !== 0) { stopAuto(); go(i); startAuto(); }
                else onOpen(cert);
              }}
            >
              {/* Pulsing glow ring on active */}
              {p.offset === 0 && (
                <motion.div
                  className="cslider-glow-ring"
                  style={{ boxShadow: `0 0 70px 18px ${cert.accent}28, 0 0 120px 40px ${cert.accent}12` }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              <div className="cslider-card">
                {/* Image panel */}
                <div className="cslider-img-panel">
                  <img src={cert.img} alt={cert.title} className="cslider-img" />
                  <div className="cslider-img-gradient" />
                  <span className="cslider-num">{cert.no}</span>
                  <span className="cslider-badge"><Award size={11} /> {cert.issuer}</span>
                </div>

                {/* Text panel */}
                <div className="cslider-body">
                  <span className="cslider-cat"
                    style={{ color: cert.accent, background: `${cert.accent}15`, border: `1px solid ${cert.accent}28` }}>
                    {cert.category}
                  </span>
                  <h3 className="cslider-title">{cert.title}</h3>
                  <div className="cslider-foot">
                    <span className="cslider-date">{cert.date}</span>
                    <AnimatePresence>
                      {p.offset === 0 && (
                        <motion.button
                          className="cslider-open"
                          style={{ background: cert.accent }}
                          initial={{ opacity: 0, scale: 0.75, x: 8 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.75, x: 8 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.93 }}
                          onClick={e => { e.stopPropagation(); onOpen(cert); }}
                        >
                          <ExternalLink size={13} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Accent bar */}
                <motion.div
                  className="cslider-bar"
                  animate={{ scaleX: p.offset === 0 ? 1 : 0.35, background: cert.accent }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active info strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${active.id}`}
          className="cslider-info"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <span className="cslider-info-title">{active.title}</span>
          <span className="cslider-info-issuer"><Award size={12} /> {active.issuer} · {active.date}</span>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="cslider-controls">
        <motion.button
          className="cslider-arrow"
          onClick={() => { stopAuto(); prev(); startAuto(); }}
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous certificate"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="cslider-dots">
          {certs.map((cert, i) => (
            <motion.button
              key={i}
              className="cslider-dot"
              onClick={() => { stopAuto(); go(i); startAuto(); }}
              animate={{
                width: i === current ? 28 : 7,
                backgroundColor: i === current ? cert.accent : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-label={`Go to certificate ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          className="cslider-arrow"
          onClick={() => { stopAuto(); next(); startAuto(); }}
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next certificate"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Counter */}
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className="cslider-counter"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ color: active.accent, fontWeight: 700 }}>{String(current + 1).padStart(2, '0')}</span>
          <span className="cslider-counter-div">/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};


const Section3D = ({ children, id, className, isLast }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-25, 0, 0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{
        perspective: '1400px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        className={className}
        style={{
          width: '100%',
          rotateX,
          scale,
          opacity,
          transformOrigin: "center center",
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [active, setActive] = useState('home');
  const [modal, setModal] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [githubProjects, setGithubProjects] = useState([]);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 60]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const responses = await Promise.all(
          targetRepos.map(repo => fetch(`https://api.github.com/repos/NathanChandra202/${repo}`).then(res => res.json()))
        );
        const validRepos = responses.filter(r => r && r.id);
        setGithubProjects(validRepos);
      } catch (err) {
        console.error("Failed to fetch Github repos:", err);
      }
    };
    fetchRepos();
  }, []);

  useEffect(() => scrollY.on('change', (v) => setNavScrolled(v > 50)), [scrollY]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const socials = [
    { icon: <GithubIcon />, href: 'https://github.com/NathanChandra202', label: 'GitHub' },
    { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/nathan-chandra-34992334b', label: 'LinkedIn' },
    { icon: <InstagramIcon />, href: 'https://www.instagram.com/nathnycr/', label: 'Instagram' },
  ];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <ProgressBar />

      {/* ── Navbar ── */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <div className="container nav-inner">
          <a href="#home" className="brand">
            Nathan Chandra<span className="brand-dot">.</span>
          </a>
          <ul className="nav-list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'nav-link active' : 'nav-link'}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>

        {/* ── HOME ── */}
        <Section3D id="home" className="s-home">
          <div className="container home-grid">
            <div className="home-left">
              <Reveal delay={0.05}>
                <p className="home-greeting">Hello, I'm</p>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="home-name">Nathan<br />Chandra</h1>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="home-role">Full Stack Developer</p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="home-bio">
                  I craft clean, elegant, and user-friendly web experiences.
                  Passionate about building responsive interfaces with modern technologies.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="home-actions">
                  <a href="#contact" className="btn-primary">
                    Let's Talk <ArrowUpRight size={16} />
                  </a>
                  <a href="#certificates" className="btn-ghost">
                    View Certs
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.55}>
                <div className="home-socials">
                  {socials.map((s, i) => (
                    <motion.a key={i} href={s.href} className="social-icon" aria-label={s.label}
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ y: -3 }} whileTap={{ scale: 0.93 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </Reveal>
            </div>

            <motion.div
              className="home-right"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="portrait-wrap">
                <motion.img src={Nathan} alt="Nathan Chandra" className="portrait" style={{ y: imgY }} />
              </div>
            </motion.div>
          </div>
        </Section3D>

        {/* ── ABOUT ── */}
        <Section3D id="about" className="s-about">
          <div className="container">
            <Reveal>
              <p className="section-eyebrow">About Me</p>
              <h2 className="section-heading">Developer based in<br /><span className="accent-text">Bogor, Indonesia</span></h2>
            </Reveal>

            <div className="about-grid">
              <Reveal delay={0.1} className="about-text-col">
                <p>
                  With a passion for web development, I build scalable and efficient applications
                  using React and modern CSS. My focus is on creating seamless user experiences
                  that are both beautiful and functional.
                </p>
                <p>
                  I love turning complex problems into simple, intuitive designs.
                  When I'm not coding, you'll find me exploring new technologies or
                  enjoying a good cup of coffee.
                </p>
                <div className="about-stats">
                  {[{ n: '2+', l: 'Years Experience' }, { n: '22', l: 'Certifications' }, { n: '10+', l: 'Projects' }].map((s) => (
                    <div key={s.l} className="stat">
                      <span className="stat-n">{s.n}</span>
                      <span className="stat-l">{s.l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2} className="about-skills-col">
                <p className="skills-label">Tech Stack</p>
                <div className="skills-grid">
                  {['React JS', 'JavaScript', 'HTML & CSS', 'TailwindCSS', 'Framer Motion', 'Vite', 'Node.js', 'Git & GitHub'].map((s) => (
                    <motion.span key={s} className="skill-chip"
                      whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.25)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Section3D>

        {/* ── PROJECTS ── */}
        <Section3D id="projects" className="s-projects">
          <div className="container">
            <Reveal>
              <p className="section-eyebrow">My Work</p>
              <h2 className="section-heading">Proyek</h2>
            </Reveal>

            <div className="projects-grid">
              {githubProjects.length > 0 ? githubProjects.map((p, i) => {
                const lang = p.language || 'Code';
                const style = getLangColor(lang);
                return (
                  <Reveal key={p.id} delay={0.1 * i} className="project-card">
                    <div className="project-header">
                      <div className="project-icon">📁</div>
                      <span className="project-badge" style={{ color: style.color, backgroundColor: style.bg }}>
                        {lang}
                      </span>
                    </div>
                    <h3 className="project-title">{p.name}</h3>
                    <p className="project-desc">{p.description || 'Tidak ada deskripsi yang disediakan.'}</p>
                    <div className="project-tech">
                      {p.topics && p.topics.length > 0 ? (
                        p.topics.map(t => <span key={t} className="tech-chip">{t}</span>)
                      ) : (
                        <span className="tech-chip">{lang}</span>
                      )}
                    </div>
                    <a href={p.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <GithubIcon /> Lihat di GitHub
                    </a>
                  </Reveal>
                );
              }) : (
                <div style={{ color: 'var(--muted)' }}>Loading projects from GitHub...</div>
              )}
            </div>
          </div>
        </Section3D>

        {/* ── CERTIFICATES ── */}
        <Section3D id="certificates" className="s-certs">
          <div className="container">
            <Reveal>
              <p className="section-eyebrow">Achievements</p>
              <h2 className="section-heading">My Certificates</h2>
              <p className="section-sub">Certifications earned through dedication and continuous learning.</p>
            </Reveal>

            <CertSlider certs={certs} onOpen={setModal} />
          </div>
        </Section3D>

        <AnimatePresence>
          {modal && <Modal cert={modal} onClose={() => setModal(null)} />}
        </AnimatePresence>

        {/* ── CONTACT ── */}
        <Section3D id="contact" className="s-contact" isLast={true}>
          <div className="container">
            <Reveal>
              <p className="section-eyebrow">Get In Touch</p>
              <h2 className="section-heading">Let's Work Together</h2>
            </Reveal>

            <div className="contact-grid">
              <Reveal delay={0.1} className="contact-info-col">
                <p className="contact-intro">
                  Got a project in mind? I'd love to hear about it. Send me a message and let's create something great together.
                </p>
                <div className="contact-items">
                  {[
                    { icon: <MapPin size={17} />, label: 'Location', val: 'Bogor, Indonesia' },
                    { icon: <Mail size={17} />, label: 'Email', val: 'nathanchandra359@gmail.com' },
                    { icon: <Phone size={17} />, label: 'Phone', val: '+62 858 1400 2778' },
                  ].map((item) => (
                    <div key={item.label} className="contact-item">
                      <span className="contact-item-icon">{item.icon}</span>
                      <div>
                        <p className="contact-item-label">{item.label}</p>
                        <p className="contact-item-val">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="contact-socials">
                  {socials.map((s, i) => (
                    <motion.a key={i} href={s.href} className="social-icon" aria-label={s.label}
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ y: -3 }} whileTap={{ scale: 0.93 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  {[
                    { label: 'Name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  ].map((f) => (
                    <div key={f.label} className="field">
                      <label>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div className="field">
                    <label>Message</label>
                    <textarea rows={5} placeholder="Tell me about your project..." />
                  </div>
                  <motion.button type="submit" className="btn-primary w-full"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  >
                    Send Message <ArrowUpRight size={16} />
                  </motion.button>
                </form>
              </Reveal>
            </div>
          </div>
        </Section3D>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Nathan Chandra</span>
          <span>Built with React & Framer Motion</span>
        </div>
      </footer>
    </>
  );
};

export default App;
