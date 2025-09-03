import { Router, Route } from 'wouter'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WorkDetailPage from './pages/WorkDetailPage'
import LiveMarketPage from './pages/LiveMarketPage'
import WomenInSneakersPage from './pages/WomenInSneakersPage'
import ARTryOnPage from './pages/ARTryOnPage'
import SoleBotPage from './pages/SoleBotPage'
import SoleRadarPage from './pages/SoleRadarPage'
import StyleQuizPage from './pages/StyleQuizPage'
import SneakerMapPage from './pages/SneakerMapPage'
import CatalogPage from './pages/CatalogPage'
import DiscoverPage from './pages/DiscoverPage'
import VisualSearchPage from './pages/VisualSearchPage'
import CollectionsPage from './pages/CollectionsPage'
import BlogPage from './pages/BlogPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div className="app">
      <Router>
        <PageTransition>
          <Route path="/" component={HomePage} />
          <Route path="/catalog" component={CatalogPage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/visual-search" component={VisualSearchPage} />
          <Route path="/collections" component={CollectionsPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/work/:id" component={WorkDetailPage} />
          <Route path="/live-market" component={LiveMarketPage} />
          <Route path="/women-in-sneakers" component={WomenInSneakersPage} />
          <Route path="/ar-tryon" component={ARTryOnPage} />
          <Route path="/solebot" component={SoleBotPage} />
          <Route path="/soleradar" component={SoleRadarPage} />
          <Route path="/style-quiz" component={StyleQuizPage} />
          <Route path="/sneaker-map" component={SneakerMapPage} />
        </PageTransition>
      </Router>
    </div>
  )
}

export default App