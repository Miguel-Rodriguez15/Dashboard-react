import React from 'react'
import { TotalProducts } from './TotalProducts'
import OrdersPlaced from './OrdersPlaced'
import IncomeGenerated from './IncomeGenerated'
import AveragePrice from './AveragePrice'
import MostSelledProduct from './MostSelledProduct'
import '../assets/canvas.css'

const Analytics = ()=> {
  return (
    <div className="containers">
    <TotalProducts className="item"/>
    <OrdersPlaced className="item"/>
    <IncomeGenerated className="item"/>
    <AveragePrice className="item"/>
    <MostSelledProduct className="item" />
  </div>
  )
}

export default Analytics