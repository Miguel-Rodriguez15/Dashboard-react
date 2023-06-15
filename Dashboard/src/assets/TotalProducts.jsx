import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import "../assets/canvas.css"
export  const TotalProducts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const quantities = data.map(product => product.rating.count);
        const totalProducts = data.length;

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
                text: `Número total de productos: ${totalProducts}`,
                position: 'left'
              }
            }
          }
        });
      })
      .catch(error => {
        console.log('Error:', error);
        // Manejo de errores adicional si es necesario
      });
  }, []);

  return (
    <div>
      <canvas id="productChart" style={{ width: '100px', height: '100px' }}></canvas>
    </div>
  );
};


