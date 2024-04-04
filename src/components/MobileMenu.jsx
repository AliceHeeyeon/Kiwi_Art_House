import { Link } from 'react-router-dom'
import {BsXLg} from 'react-icons/bs'
import { GoChevronDown } from "react-icons/go";

const MobileMenu = ({closeMethod}) => {

  return (
    <div className='mobile-menu-container'>
      <button id='close-nav-menu' onClick={closeMethod}>
        <BsXLg/>
      </button>

      <ul id="mobile-menu">
        <li className='top-level-menu'>
            <span>
                Exhibitions
                <GoChevronDown />
            </span>
            <ul className="menu-option-list">
                <li>
                    <Link to='/current-exhibition' onClick={closeMethod}>Current</Link>
                </li>
                <li>
                    <Link to='/past-exhibition' onClick={closeMethod}>Past</Link>
                </li>
            </ul>
        </li>
        <li>
            <Link to='/artists' onClick={closeMethod}>Artists</Link>
        </li>
        <li>
            <Link to='/about' onClick={closeMethod}>About</Link>
        </li>
        {/* <li className='top-level-menu'>
            <span>
                Shop
                <GoChevronDown />
            </span>
            <ul className="menu-option-list">
                <li>
                    <Link to='/prints' onClick={closeMethod}>Prints</Link>
                </li>
                <li>
                    <Link to='/commissions' onClick={closeMethod}>Commissions</Link>
                </li>
            </ul>
        </li>
        <li>
            <Link to='/gifting' onClick={closeMethod}>Gifting</Link>
        </li> */}
        <li>
            <Link to='/contact' onClick={closeMethod}>Contact</Link>
        </li>
    </ul>
    </div>
  )
}

export default MobileMenu