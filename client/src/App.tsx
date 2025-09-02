import { Router, Route } from 'wouter'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WorkDetailPage from './pages/WorkDetailPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/work/:id" component={WorkDetailPage} />
        </Router>
      </main>
    </div>
  )
}

export default App