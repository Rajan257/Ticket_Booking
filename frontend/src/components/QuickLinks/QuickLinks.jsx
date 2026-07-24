import './QuickLinks.css'

const services = [
  { title: 'Flight Tickets', icon: '✈️', link: '#' },
  { title: 'Bus Tickets', icon: '🚌', link: '#' },
  { title: 'Hotel Booking', icon: '🏨', link: '#' },
  { title: 'Retiring Room', icon: '🛌', link: '#' },
  { title: 'E-Catering', icon: '🍽️', link: '#' },
  { title: 'Tour Packages', icon: '🏖️', link: '#' },
]

export default function QuickLinks() {
  return (
    <section className="quick-links">
      <div className="container">
        <h2 className="section-title text-center">Have you not found the right one?</h2>
        <p className="section-subtitle text-center">Find a service suitable for you here.</p>
        
        <div className="quick-links__grid">
          {services.map((service, idx) => (
            <a href={service.link} key={idx} className="quick-links__card">
              <div className="quick-links__icon">{service.icon}</div>
              <h3 className="quick-links__title">{service.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
