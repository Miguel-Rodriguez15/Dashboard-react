import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';



export const TotalProducts = () => {
  const chartRef = useRef(null);
  const [totalProducts, setTotalProducts] = useState(0); // Agregamos un estado para almacenar el número total de productos

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const quantities = data.map(product => product.rating.count);
        const total = data.length;
        setTotalProducts(total); // Actualizamos el estado con el número total de productos

        const ctx = document.getElementById('productChart').getContext('2d');

        // Destruir el gráfico existente si ya existe uno
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: quantities.map((_, index) => `Producto ${index + 1}`),
            datasets: [
              {
                label: 'Cantidad',
                data: quantities,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: `Número total de productos: ${total}`,
                position: 'left'
              }
            }
          }
        });
      })
      .catch(error => {
        alert('Error:', error);
        // Manejo de errores adicional si es necesario
      });
  }, []);

  return (
    <section>
      <article className='container-result'>
        <section className='container-result-item'>
          <h2 >Número total de productos: {totalProducts}</h2> 
        </section>
      </article>
      <article>
        <canvas id="productChart" width="200" height="100"></canvas>
      </article>
    </section>
  );
};
