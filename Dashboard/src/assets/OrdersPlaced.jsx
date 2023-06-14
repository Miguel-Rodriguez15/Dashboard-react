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
  
        const labels = pedidoData.map((pedido, index) => `Pedido ${index + 1}`);
        const cantidadPedidos = pedidoData.length;
  
        const colors = generateRandomColors(pedidoData.length); // Genera colores aleatorios para cada pedido
  
        chartRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: pedidoData.map(pedido => pedido.products.length),
                backgroundColor: colors
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `Número total de pedidos: ${cantidadPedidos}`,
                position: 'left'
              }
            }
          }
        });
      }
    }, [pedidoData]);
  
    // Genera colores aleatorios en formato hexadecimal
    const generateRandomColors = (quantity) => {
      const colors = [];
      for (let i = 0; i < quantity; i++) {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
      }
      return colors;
    };
  
    return (
      <div>
        <h1>Gráfico de pedidos realizados</h1>
        <canvas id="pedidoChart" width="400" height="200"></canvas>
      </div>
    );
  }
export default OrdersPlaced