import Navbar from '../components/Navbar/Navbar'

export default function PNRPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container">
          <h2>PNR Status</h2>
          <p>This page will display PNR status.</p>
        </div>
      </main>
    </>
  )
}
