import './App.css';
import React from 'react'
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom'
import ShowData from './components/ShowData';

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>
       <Route path="/" element={<ShowData></ShowData>}></Route>
     </Routes>     
     </Router>
    </div>
  );
}

export default App;
