import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}>
        🤖 REACT APP IS WORKING! 🤖
      </div>
    </div>
  )
}