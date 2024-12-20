import './App.css';
import {Routes, Route, Link, NavLink} from 'react-router-dom';
import Watch from './Component/Watch';
import Timer from './Component/Timer';
import Counter from './Component/Counter';

function App() {
  
  return (
    <div className="App">
      <div className='timeline'>
      <Link className='settings' to='/watch'>Watch</Link>
      <Link className='settings' to='/timer'>Timer</Link>
      <Link className='settings' to='/counter'>Counter</Link>
      </div>

     <Routes>
       
        <Route path='/watch' element={<Watch />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/counter' element={<Counter />} />
     </Routes>
    </div>
  )
}

export default App;

