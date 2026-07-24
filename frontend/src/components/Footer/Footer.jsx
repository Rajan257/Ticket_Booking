import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__title">IRCTC Trains</h3>
            <ul className="footer__list">
              <li><a href="#">General Information</a></li>
              <li><a href="#">Important Information</a></li>
              <li><a href="#">Agents</a></li>
              <li><a href="#">Enquiries</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">How To</h3>
            <ul className="footer__list">
              <li><a href="#">IRCTC Official App</a></li>
              <li><a href="#">Advertise with us</a></li>
              <li><a href="#">Refund Rules</a></li>
              <li><a href="#">Divyangjan Facilities</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">IRCTC eWallet</h3>
            <ul className="footer__list">
              <li><a href="#">IRCTC Loyalty Program</a></li>
              <li><a href="#">IRCTC-iPay Payment Gateway</a></li>
              <li><a href="#">IRCTC Zone</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">For Enterprises</h3>
            <ul className="footer__list">
              <li><a href="#">Advertisements</a></li>
              <li><a href="#">Sponsorships</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>Copyright © {new Date().getFullYear()} - www.irctc.co.in. All Rights Reserved</p>
          <p>Designed and Hosted by CRIS</p>
        </div>
      </div>
    </footer>
  )
}
