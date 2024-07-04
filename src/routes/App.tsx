import {Outlet} from 'react-router-dom'

function App() {
  return (
    <>
      <div id='main-app'>
        <div id='sliderbar'></div>
        <div id='main'>
          <Outlet />
        </div>
        <div id='details'></div>
        <div id='player'></div>
      </div>
    </>
  )
}

export default App
