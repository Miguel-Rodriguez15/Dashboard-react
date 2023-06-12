import React from 'react'
import { useState,useEffect } from 'react';
const Orders = ()=> {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => console.log(json))
  }, []);
  return (
    <div>
      <h1>ordenes</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Orders