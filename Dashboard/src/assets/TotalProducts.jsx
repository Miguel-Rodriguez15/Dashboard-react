import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

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
      <h1>Gráfica de barras de cantidades de productos</h1>
      <canvas id="productChart" width="100" height="100"></canvas>
    </div>
  );
};


