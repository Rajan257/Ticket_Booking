import Navbar from '../components/Navbar/Navbar'

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container">
          <h2>Search Results</h2>
          <p>This page will display search results.</p>
        </div>
      </main>
    </>
  )
}
