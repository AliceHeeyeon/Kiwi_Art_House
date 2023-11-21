import { useState } from "react"
import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import SegmentIcon from '@mui/icons-material/Segment';
import useCustomiser from "../hooks/useCustomiser";

const Header = () => {
    const [menuIsOpen, openMenu] = useState(false)
    const [exhibitionIsOpen, setExhibitionIsOpen] = useState(false)
    const [shopIsOpen, setShopIsOpen] = useState(false)
    const {mainColor} = useCustomiser()

    const toggleMobileMenu = () => {
        openMenu(!menuIsOpen)
        if (!menuIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

   const toggleExhibitionMenu = () => {
        setExhibitionIsOpen(!exhibitionIsOpen)
   }

   const toggleShopMenu = () => {
    setShopIsOpen(!shopIsOpen)
}

  return (
    <nav style={{ backgroundColor: mainColor }} className="main-color">
        <div id="topnav">
            <div id="logo">
                <Link to='/'>
                    <img src="/logo-white.png" alt="logo-white" />
                </Link>
            </div>
        </div>

        {/* Desktop menu */}
        <div className="desktop-menu">
            <ul id="menu">
                <li id="exhibition"
                    className={exhibitionIsOpen ? 'active' : ''}
                    onClick={toggleExhibitionMenu}
                >
                    EXHIBITIONS
                    <ul className="menu-option-list">
                        <li>
                            <Link to='/current-exhibition'>CURRENT</Link>
                        </li>
                        <li>
                            <Link to='/past-exhibition'>PAST</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/artists'>ARTISTS</Link>
                </li>
                <li>
                    <Link to='/about'>ABOUT</Link>
                </li>
                <li id="shop"
                    className={shopIsOpen ? 'active' : ''}
                    onClick={toggleShopMenu}
                >
                    SHOP
                    <ul className="menu-option-list">
                        <li>
                            <Link to='/prints'>PRINTS</Link>
                        </li>
                        <li>
                            <Link to='/commissions'>COMMISSIONS</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/gifting'>GIFTING</Link>
                </li>
                <li>
                    <Link to='/contact'>CONTACT</Link>
                </li>
            </ul>
        </div>

        {/* Hamburger icon on Mobile */}
        <div id="mobile-menu-button-container">
            <button id="mobile-menu-button" onClick={toggleMobileMenu}>
                <SegmentIcon id="hamburger-icon" />
            </button>
        </div>

        {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
    </nav>
  )
}

export default Header
