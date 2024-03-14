import './App.css';
import Home from './components/Home';
import Header from './components/header';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Menu from './components/menu';

function App() {
  return (
    <BrowserRouter>
  <div className="h-fit">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/trackertomenu" element={<Menu />} /> 
      <Route path="*" element={<div>404: Not Found</div>} /> 
      <Route path='' element />
    </Routes>
    {/* <ProductCart /> */}
    </div>
</BrowserRouter>
  );
}

export default App;
