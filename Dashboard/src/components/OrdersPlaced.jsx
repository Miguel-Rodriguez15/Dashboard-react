import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function OrdersPlaced() {
  const [pedidoData, setPedidoData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts')
      .then(response => response.json())
      .then(data => {
        setPedidoData(data);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  useEffect(() => {
    if (pedidoData.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destruye la instancia anterior de Chart.js
      }

      const ctx = document.getElementById('pedidoChart').getContext('2d');

      const getProductNames = async () => {
        const productNamesPromises = pedidoData.map(async pedido => {
          const productNames = await Promise.all(
            pedido.products.map(async product => {
              const productData = await fetch(
                `https://fakestoreapi.com/products/${product.productId}`
              );
              const productJson = await productData.json();
              return productJson.title;
            })
          );
          return productNames;
        });
        const productNames = await Promise.all(productNamesPromises);
        return productNames;
      };

      getProductNames().then(productNames => {
        const labels = pedidoData.map((pedido, index) => {
          return `Pedido ${index + 1}`;
        });
        const cantidadPedidos = pedidoData.length;

        const colores = generarColoresAleatorios(pedidoData.length); // Genera colores aleatorios para cada pedido

        chartRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: pedidoData.map(pedido => pedido.products.length),
                backgroundColor: colores
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `Número total de pedidos: ${cantidadPedidos}`,
                position: 'left'
              },
              tooltip: {
                callbacks: {
                  title: (tooltipItem) => {
                    const index = tooltipItem[0].dataIndex;
                    return productNames[index].join(', ');
                  }
                }
              }
            }
          }
        });
      });
    }
  }, [pedidoData]);

  // Genera colores aleatorios en formato hexadecimal
  const generarColoresAleatorios = cantidad => {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colores.push(color);
    }
    return colores;
  };

  return (
    <article>
      
      <canvas id="pedidoChart" width="400" height="200"></canvas>
    </article>
  );
}

export default OrdersPlaced;
