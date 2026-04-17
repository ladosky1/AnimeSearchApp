import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext'
import { WatchlistProvider } from './context/WatchlistContext'
import ProtectedRoute from './components/ProtectedRoute'
const Home = lazy(() => import('./pages/Home'));
const Detail = lazy(() => import('./pages/Detail'));
const Results = lazy(() => import('./pages/Results'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  
  return (
    <div className='min-h-screen flex flex-col bg-bgDark text-textMain'>
      <AuthProvider>
        <WatchlistProvider>
          <Router>
          <Navbar />
        <div className='flex-1'>
          <Suspense fallback={<div className='p-4 text-sm text-textMuted'>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/detail/:id' element={<Detail />} />
              <Route path='/results' element={<Results />} />
              <Route path='/watchlist' element={
                                                  <ProtectedRoute>
                                                    <Watchlist />
                                                  </ProtectedRoute>} />
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
            </Routes>
          </Suspense>
        </div>
          <Footer />
          </Router>
          </WatchlistProvider>
      </AuthProvider>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            background: "#111827",
            color: "#22d3ee",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}/>
    </div>
  )
  
}

export default App
