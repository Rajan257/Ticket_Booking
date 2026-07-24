import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import './Navbar.css'

const navLinks = [
  { label: 'TRAINS', href: '#', dropdown: ['Book Ticket', 'PNR Status', 'Charts / Vacancy', 'Train Schedule', 'Fare Enquiry', 'Seat Availability'] },
  { label: 'HOLIDAYS', href: '#', dropdown: ['Holiday Packages', 'Tourist Train', 'Hill Railways', 'Charter Train'] },
  { label: 'MEALS', href: '#', dropdown: ['E-Catering', 'Book Meal'] },
  { label: 'LOYALTY', href: '#', badge: '10% Cash Back' },
  { label: 'E-WALLET', href: '#' },
  { label: 'ALERTS', href: '#' },
  { label: 'CONTACT US', href: '#' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <span className="navbar__time">{currentTime}</span>
          <div className="navbar__topbar-right">
            <button className="navbar__font-btn">A-</button>
            <button className="navbar__font-btn navbar__font-btn--active">A</button>
            <button className="navbar__font-btn">A+</button>
            <span className="navbar__divider" />
            <a href="#" className="navbar__lang">हिंदी</a>
            <span className="navbar__divider" />
            <a href="#" className="navbar__lang navbar__lang--active">English</a>
          </div>
        </div>
      </div>

      <div className="navbar__main">
        <div className="container navbar__main-inner">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#ff6d00" />
                <path d="M6 26 L18 10 L30 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="10" r="3" fill="white" />
                <rect x="4" y="26" width="28" height="4" rx="2" fill="white" />
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-irctc">IRCTC</span>
              <span className="navbar__logo-sub">Indian Railway Catering and Tourism Corporation Ltd.</span>
            </div>
          </Link>

          <nav className="navbar__links">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="navbar__link-item"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href={link.href} className="navbar__link">
                  {link.label}
                  {link.badge && <span className="navbar__badge">{link.badge}</span>}
                  {link.dropdown && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </a>
                {link.dropdown && activeDropdown === link.label && (
                  <div className="navbar__dropdown">
                    {link.dropdown.map((item) => (
                      <a key={item} href="#" className="navbar__dropdown-item">{item}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="navbar__actions">
            <Link to="/login" className="navbar__login-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              LOGIN / REGISTER
            </Link>
            <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
              {link.label}
              {link.badge && <span className="navbar__badge">{link.badge}</span>}
            </a>
          ))}
          <Link to="/login" className="navbar__mobile-link navbar__mobile-login" onClick={() => setMobileOpen(false)}>
            LOGIN / REGISTER
          </Link>
        </div>
      )}
    </header>
  )
}
