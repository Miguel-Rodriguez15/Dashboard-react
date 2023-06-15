import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto';
import "../assets/styles/ProductList.css"
function AveragePrice() {
  const [productData, setProductData] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        calculateAveragePrice(data);
      })
      .catch((error) => console.log('Error:', error));
  }, []);

  const calculateAveragePrice = (data) => {
    const totalPrice = data.reduce((sum, product) => sum + product.price, 0);
    const average = totalPrice / data.length;
    setAveragePrice(average.toFixed(2));
  };

  useEffect(() => {
    if (productData.length > 0) {
      if (chartInstance) {
        // Destruir el gráfico existente
        chartInstance.destroy();
      }

      const ctx = document.getElementById('doughnutChart').getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: productData.map((product) => product.title),
          datasets: [
            {
              data: productData.map((product) => product.price),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Gráfico de Dona',
            },
            legend: {
              position: 'right',
              align: 'start',
              labels: {
                boxWidth: 12,
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [productData]);

  return (
    <article>
      <h2 >Precio promedio de los productos: {averagePrice}</h2>
      <canvas id="doughnutChart" width="400" height="200"></canvas>
    </article>
  );
};
export default AveragePrice