
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductList from './components/ProductList'
import DashBoard from './components/DashBoard'

import Sidebar from './components/Sidebar';


function App() {


  return (

    <BrowserRouter>
      <Sidebar>
        <Routes>

          <Route path="/" element={<DashBoard/>} />
          <Route path="/productlist" element={<ProductList/>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
