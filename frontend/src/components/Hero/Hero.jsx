import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import './Hero.css'

const stations = ['New Delhi', 'Mumbai CST', 'Bangalore City', 'Chennai Central', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Varanasi', 'Agra', 'Kanpur', 'Patna', 'Bhopal']

const classes = ['All Classes', 'Sleeper (SL)', 'Third AC (3A)', 'Second AC (2A)', 'First AC (1A)', 'AC Chair Car (CC)', 'Second Seating (2S)', 'Vistadome AC (EV)']

const quotas = ['General', 'Tatkal', 'Ladies', 'Senior Citizen', 'Divyaang', 'Premium Tatkal']

const bgSlides = [
  { gradient: 'linear-gradient(135deg, #071428 0%, #0f2044 40%, #1a3260 100%)', label: 'Rajdhani Express', route: 'Mumbai to Delhi' },
  { gradient: 'linear-gradient(135deg, #0d1f0a 0%, #1b3a14 40%, #2e5c20 100%)', label: 'Shatabdi Express', route: 'Delhi to Amritsar' },
  { gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1554 40%, #4a2580 100%)', label: 'Vande Bharat', route: 'Chennai to Bangalore' },
]

export default function Hero() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [trainClass, setTrainClass] = useState('All Classes')
  const [quota, setQuota] = useState('General')
  const [activeTab, setActiveTab] = useState('book')
  const [pnr, setPnr] = useState('')
  const [slide, setSlide] = useState(0)
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const navigate = useNavigate()

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const headlineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % bgSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    tl.fromTo(formRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    tl.fromTo(statsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
  }, [])

  const swapStations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?from=${from}&to=${to}&date=${date}&class=${trainClass}&quota=${quota}`)
  }

  const filterStations = (val) => stations.filter(s => s.toLowerCase().includes(val.toLowerCase()))

  const today = new Date().toISOString().split('T')[0]

  return (
    <section ref={heroRef} className="hero" style={{ background: bgSlides[slide].gradient }}>
      <div className="hero__bg-anim">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero__particle hero__particle--${i}`} />
        ))}
      </div>

      <div className="container hero__inner">
        <div ref={headlineRef} className="hero__headline">
          <span className="hero__eyebrow">
            <span className="hero__live-dot" />
            {bgSlides[slide].label} • {bgSlides[slide].route}
          </span>
          <h1 className="hero__title">
            Book Train Tickets<br />
            <span className="hero__title-accent">Instantly & Securely</span>
          </h1>
          <p className="hero__desc">Explore millions of routes across India. Fast booking, real-time seat availability, instant confirmation.</p>
        </div>

        <div ref={formRef} className="hero__card">
          <div className="hero__tabs">
            <button className={`hero__tab${activeTab === 'book' ? ' hero__tab--active' : ''}`} onClick={() => setActiveTab('book')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book Ticket
            </button>
            <button className={`hero__tab${activeTab === 'pnr' ? ' hero__tab--active' : ''}`} onClick={() => setActiveTab('pnr')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              PNR Status
            </button>
            <button className={`hero__tab${activeTab === 'chart' ? ' hero__tab--active' : ''}`} onClick={() => setActiveTab('chart')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              Charts / Vacancy
            </button>
          </div>

          {activeTab === 'book' && (
            <form onSubmit={handleSearch} className="hero__form">
              <div className="hero__form-row">
                <div className="hero__input-group">
                  <label className="hero__label">From</label>
                  <div className="hero__input-wrap">
                    <svg className="hero__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <input
                      className="hero__input"
                      type="text"
                      placeholder="From Station"
                      value={from}
                      onChange={e => { setFrom(e.target.value); setFromSuggestions(filterStations(e.target.value)) }}
                      onBlur={() => setTimeout(() => setFromSuggestions([]), 200)}
                      required
                    />
                    {fromSuggestions.length > 0 && (
                      <ul className="hero__suggestions">
                        {fromSuggestions.slice(0, 5).map(s => (
                          <li key={s} onMouseDown={() => { setFrom(s); setFromSuggestions([]) }}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <button type="button" className="hero__swap" onClick={swapStations} title="Swap stations">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
                </button>

                <div className="hero__input-group">
                  <label className="hero__label">To</label>
                  <div className="hero__input-wrap">
                    <svg className="hero__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" /></svg>
                    <input
                      className="hero__input"
                      type="text"
                      placeholder="To Station"
                      value={to}
                      onChange={e => { setTo(e.target.value); setToSuggestions(filterStations(e.target.value)) }}
                      onBlur={() => setTimeout(() => setToSuggestions([]), 200)}
                      required
                    />
                    {toSuggestions.length > 0 && (
                      <ul className="hero__suggestions">
                        {toSuggestions.slice(0, 5).map(s => (
                          <li key={s} onMouseDown={() => { setTo(s); setToSuggestions([]) }}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="hero__form-row hero__form-row--3">
                <div className="hero__input-group">
                  <label className="hero__label">Date of Journey</label>
                  <div className="hero__input-wrap">
                    <svg className="hero__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <input className="hero__input hero__input--date" type="date" value={date} onChange={e => setDate(e.target.value)} min={today} required />
                  </div>
                </div>

                <div className="hero__input-group">
                  <label className="hero__label">Class</label>
                  <div className="hero__input-wrap">
                    <svg className="hero__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <select className="hero__input hero__input--select" value={trainClass} onChange={e => setTrainClass(e.target.value)}>
                      {classes.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="hero__input-group">
                  <label className="hero__label">Quota</label>
                  <div className="hero__input-wrap">
                    <svg className="hero__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    <select className="hero__input hero__input--select" value={quota} onChange={e => setQuota(e.target.value)}>
                      {quotas.map(q => <option key={q}>{q}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="hero__checkboxes">
                <label className="hero__checkbox">
                  <input type="checkbox" />
                  <span />
                  Person With Disability Concession
                </label>
                <label className="hero__checkbox">
                  <input type="checkbox" />
                  <span />
                  Flexible With Date
                </label>
                <label className="hero__checkbox">
                  <input type="checkbox" />
                  <span />
                  Railway Pass Concession
                </label>
              </div>

              <button type="submit" className="hero__search-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                Search Trains
              </button>
            </form>
          )}

          {activeTab === 'pnr' && (
            <div className="hero__pnr">
              <p className="hero__pnr-desc">Enter your 10-digit PNR number to check booking status</p>
              <div className="hero__pnr-row">
                <input className="hero__input hero__pnr-input" type="text" placeholder="Enter PNR Number" maxLength={10} value={pnr} onChange={e => setPnr(e.target.value.replace(/\D/g, ''))} />
                <button className="hero__search-btn hero__pnr-btn">Check Status</button>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="hero__pnr">
              <p className="hero__pnr-desc">Check coach position and seat availability for any train</p>
              <div className="hero__pnr-row">
                <input className="hero__input hero__pnr-input" type="text" placeholder="Enter Train Number" />
                <button className="hero__search-btn hero__pnr-btn">Get Chart</button>
              </div>
            </div>
          )}
        </div>

        <div ref={statsRef} className="hero__stats">
          {[
            { num: '8000+', label: 'Trains Daily' },
            { num: '23M+', label: 'Passengers Daily' },
            { num: '7000+', label: 'Stations' },
            { num: '1.4M+', label: 'Seats Available' },
          ].map(({ num, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-num">{num}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__slide-dots">
        {bgSlides.map((_, i) => (
          <button key={i} className={`hero__dot${i === slide ? ' hero__dot--active' : ''}`} onClick={() => setSlide(i)} />
        ))}
      </div>
    </section>
  )
}
