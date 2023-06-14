import React from 'react'
import { TotalProducts } from './TotalProducts'
import OrdersPlaced from './OrdersPlaced'
import IncomeGenerated from './IncomeGenerated'
import AveragePrice from './AveragePrice'
import MostSelledProduct from './MostSelledProduct'


const DashBoard = () => {
  return (
    <div>
    <TotalProducts/>
    <OrdersPlaced/>
    <IncomeGenerated/>
     <AveragePrice/>
     <MostSelledProduct/>
    </div>

  )
}

export default DashBoard