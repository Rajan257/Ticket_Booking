import Navbar from '../components/Navbar/Navbar'

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container">
          <h2>Login / Register</h2>
          <p>This page will handle user authentication.</p>
        </div>
      </main>
    </>
  )
}
