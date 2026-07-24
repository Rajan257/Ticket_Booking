import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import QuickLinks from '../components/QuickLinks/QuickLinks'
import Footer from '../components/Footer/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuickLinks />
      </main>
      <Footer />
    </>
  )
}
