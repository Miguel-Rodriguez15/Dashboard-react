import React, { useEffect,useState } from 'react'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);
  return (
    <div>
      <h1>product lis</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}
          
          </li>
          
        ))}
      </ul>
      <picture>
        
      </picture>


    </div>
  )
}
export default ProductList