import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import CurrentExhibition from "./pages/CurrentExhibition";
import PastExhibition from "./pages/PastExhibition";
import Artists from "./pages/Artists";
import Prints from "./pages/Prints";
import Commissions from "./pages/Commissions";
import About from "./pages/About";
import Gifting from "./pages/Gifting";
import Contact from "./pages/Contact";

// Components
import SingleArtist from "./components/SingleArtist";
import SingleArtwork from "./components/SingleArtwork";
import SinglePrints from "./components/SinglePrints";
import Enquire from "./components/Enquire";


const Links = () => {

  return (
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/current-exhibition' element={<CurrentExhibition/>} />
        <Route path='/past-exhibition' element={<PastExhibition/>} />
        <Route path='/artists' element={<Artists/>} />
        <Route path='/prints' element={<Prints/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/gifting' element={<Gifting/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/enquire' element={<Enquire/>} />
        <Route path='/commissions' element={<Commissions/>} />
        <Route path='/artists/:id' element={<SingleArtist/>} />
        <Route path='/artworks/:id' element={<SingleArtwork/>} />
        <Route path='/prints/:id' element={<SinglePrints/>} />
        
    </Routes>
  )
}

export default Links
