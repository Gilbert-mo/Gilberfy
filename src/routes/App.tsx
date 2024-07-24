import { Outlet } from 'react-router-dom'
import NavLeft from '../components/NavLeftSidebar/NavLeft'
import { FaPlay } from "react-icons/fa";
import { CgPlayTrackNext } from "react-icons/cg";
import { CgPlayTrackPrev } from "react-icons/cg";

function App() {



  return (

    <div id='app'>
      {/* LEFT-SIDEBAR */}
      <div id='left-sidebar' className='overflow-hidden w-[280px] [grid-area:left-sidebar]'>
        <NavLeft />
      </div>

      {/* MAIN-VIEW */}

      <div id='main' className='flex rounded-[8px] bg-[#121212] flex-col [grid-area:main-view] overflow-hidden overflow-y-auto relative'>
        <header className='bg-gray-800 py-8 flex items-center justify-center flex-col'>
          <h1 className='mb-4 text-6xl text-green-400 font-bold'>Gilberfy</h1>
          <p>La mejor aplicación para escuchar música 24/7</p>
          <img className='mt-4 w-16' src="/gilberfy.ico" alt="" />
        </header>

        <main>
          <Outlet />
        </main>

        <footer className='py-6 bg-orange-700 text-white flex justify-center items-center'>
          <h3>Gilberfy © 2024 Todos los derechos reservados</h3>
        </footer>
      </div>


      {/* RIGHT-SIDEBAR */}
      <aside id='right-sidebar' className='hidden flex items-center bg-green-400 w-[280px] [grid-area:right-sidebar]'>
        <p className='text-3xl font-extrabold'>Aquí se mostrarán los detalles del track actual</p>
      </aside>


      {/* PLAYING-NOW */}
      <div id='playing-bar' className='flex justify-center items-center [grid-area:playing-bar] h-[72px]'>
        <div className='flex gap-6 text-4xl'>
          <CgPlayTrackPrev />
          <FaPlay />
          <CgPlayTrackNext />
        </div>
      </div>
    </div>

  )
}

export default App
