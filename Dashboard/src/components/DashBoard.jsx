import React, { useState, useEffect } from 'react'
import { TotalProducts } from '../components/TotalProducts'
import OrdersPlaced from '../components/OrdersPlaced'
import IncomeGenerated from './IncomeGenerated'
import AveragePrice from '../components/AveragePrice'
import MostSelledProduct from '../components/MostSelledProduct'
import "../assets/styles/canvas.css"



const LoadingAnimation = () => (
  <section className="loading-animation">
    <article className="loading-circle"></article>
    <p className="loading-text">Cargando...</p>
  </section>
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
    <section className="containers">
      <article className="item">
        {isLoading ? <LoadingAnimation /> : <TotalProducts />}
      </article>
      <article className="item">
        {isLoading ? <LoadingAnimation /> : <OrdersPlaced />}
      </article>
      <article className="item">
        {isLoading ? <LoadingAnimation /> : <IncomeGenerated />}
      </article>
      <article className="item">
        {isLoading ? <LoadingAnimation /> : <AveragePrice />}
      </article>
      <article className="item">
        {isLoading ? <LoadingAnimation /> : <MostSelledProduct />}
      </article>
    </section>

  )
}

export default DashBoard