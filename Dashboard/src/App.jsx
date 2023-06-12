
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductList from './assets/ProductList'
import DashBoard from './assets/DashBoard'
import Orders from './assets/Orders'
import Analytics from './assets/Analytics'
import Sidebar from './assets/Sidebar';


function App() {


  return (

    <BrowserRouter>
      <Sidebar>
        <Routes>

          <Route path="/" element={<DashBoard/>} />
          <Route path="/productlist" element={<ProductList/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/analytics" element={<Analytics/>} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
