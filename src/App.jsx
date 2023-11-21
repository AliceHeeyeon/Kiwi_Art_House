import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Links from './Links'
import { ArtworkProvider } from './context/ArtworkContext'
import { useEffect } from 'react'
import useCustomiser from './hooks/useCustomiser'
import './css/App.css'
import Lenis from '@studio-freight/lenis'

function App() {
  const { font, bgColor } = useCustomiser()
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  useEffect(() => {
    if (font === 'Work Sans') {
      document.body.style.fontFamily = `'Work Sans', sans-serif`
    }
    if (font === 'Montserrat') {
      document.body.style.fontFamily = `'Montserrat', sans-serif`
    }
    if (font === 'Nunito Sans') {
      document.body.style.fontFamily = `'Nunito Sans', sans-serif`
    }
    if (font === 'Quicksand') {
      document.body.style.fontFamily = `'Quicksand', sans-serif`
    }
    document.documentElement.style.setProperty('--bg-color', `#${bgColor}`);

  },[font, bgColor])

  return (
    <HashRouter>
      <Header />
      <ArtworkProvider>
        <Links />
      </ArtworkProvider>
      <Footer />
    </HashRouter>
  )
}

export default App
