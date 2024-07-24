import { NavLink } from 'react-router-dom'
import NavItem from './NavItem'
import './index.css'

function NavLeft() {
    return (
        <nav className='flex flex-col gap-2 h-full'>
            <div id='nav1' className=''>
                <ul className='py-2 px-3'>
                    <NavItem>
                        <NavLink to={'/'} className={'block text-lg font-bold text-gray-300 hover:text-white'}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={'/search'} className={'block text-lg font-bold text-gray-300 hover:text-white'}>
                            Serach
                        </NavLink>
                    </NavItem>
                </ul>
            </div>
            <div id='nav2' className='flex px-3'>
                <button>Hidden</button>
                <NavLink
                    to={'/preferences'}
                    className={'text-2xl font-bold hover:text-white/65'}
                >
                    Albums
                </NavLink>
                <NavLink
                    to={'/apreferences'}
                    className={'text-2xl font-bold hover:text-white/65'}
                >
                    Artist
                </NavLink>
                <img src="https://static.mercadonegro.pe/wp-content/uploads/2022/04/01135046/imagenes-de-campanas-publicitarias.jpg" alt="" />
            </div>
        </nav>
    )
}

export default NavLeft
