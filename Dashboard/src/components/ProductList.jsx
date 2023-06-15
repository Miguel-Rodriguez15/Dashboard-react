import React, { useEffect, useState } from 'react';
import "../assets/styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [expandedProducts, setExpandedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleProductExpansion = (productId) => {
    if (expandedProducts.includes(productId)) {
      setExpandedProducts(expandedProducts.filter(id => id !== productId));
    } else {
      setExpandedProducts([...expandedProducts, productId]);
    }
  };

  return (

    <section className='container-items'>
      {isLoading ? (
        <article className="loading-animation">
          <section className="loading-circle">

          </section>
        </article>

      ) : (
        products.map(product => (
          <article className="item" key={product.id}>
            <picture>
              <img src={product.image} alt={product.title} />
            </picture>
            <section className="info-product">
              <h2 className='color-h2'>{product.title}</h2>
              <p className="price">${product.price}</p>
              {expandedProducts.includes(product.id) ? (
                <p className="description">{product.description}</p>
              ) : (
                <form action="">

                  <article class="arrow-down-container">
                    <section onClick={() => toggleProductExpansion(product.id)} class="arrow-down-icon"></section>
                  </article>

                </form>
              )}
            </section>
          </article>
        ))
      )}
    </section>


  );
};

export default ProductList;
