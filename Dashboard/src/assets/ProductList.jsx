import React, { useEffect,useState } from 'react'
import "../assets/ProductList.css"
const ProductList = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);
  return (
    <section className='container-items'>
  
      {products.map(product => (
        <article className="item" key={product.id}>
          <picture>
            <img src={product.image} alt={product.title} />
          </picture>
          <section className="info-product">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            
            <form action="">
              <button>ver detalles</button>
            </form>
          </section>
        </article>
      ))}

    </section>
  )
}
export default ProductList