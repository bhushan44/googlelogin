// import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/home" element={<Home></Home>}/>
      </Routes>
      </BrowserRouter>
      
     {/* fnfdf */}
    </div>
  );
}

export default App;
