// Minimal App.tsx for debugging - only HomePage
import { Router, Route } from 'wouter'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/" component={HomePage} />
      </Router>
    </div>
  )
}

export default App