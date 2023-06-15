import React, { useState,useEffect } from 'react'
import { TotalProducts } from './TotalProducts'
import OrdersPlaced from './OrdersPlaced'
import IncomeGenerated from './IncomeGenerated'
import AveragePrice from './AveragePrice'
import MostSelledProduct from './MostSelledProduct'
import '../assets/canvas.css'
import "../assets/ProductList.css";

const LoadingAnimation = () => (
  <div className="loading-animation">
    <div className="loading-circle"></div>
    <p className="loading-text">Cargando...</p>
  </div>
);
const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="containers">
      <div className="item">
        {isLoading ? <LoadingAnimation /> : <TotalProducts />}
      </div>
      <div className="item">
        {isLoading ? <LoadingAnimation /> : <OrdersPlaced />}
      </div>
      <div className="item">
        {isLoading ? <LoadingAnimation /> : <IncomeGenerated />}
      </div>
      <div className="item">
        {isLoading ? <LoadingAnimation /> : <AveragePrice />}
      </div>
      <div className="item">
        {isLoading ? <LoadingAnimation /> : <MostSelledProduct />}
      </div>
    </div>

  )
}

export default DashBoard