import React,{useEffect,useState,useRef} from 'react'
import { Chart } from 'chart.js/auto';

function IncomeGenerated() {
    const [productData, setProductData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
          const prices = data.map(product => product.price);
          const total = prices.reduce((sum, price) => sum + price, 0);
  
          setProductData(prices);
          setTotalIncome(total);
        })
        .catch(error => console.log('Error:', error));
    }, []);
  
    useEffect(() => {
      if (productData.length > 0) {
        if (chartInstance.current) {
          chartInstance.current.data.labels = productData.map((_, index) => `Product ${index + 1}`);
          chartInstance.current.data.datasets[0].data = productData;
          chartInstance.current.options.plugins.title.text = `Total Income: $${totalIncome}`;
          chartInstance.current.update(); // Actualiza el gráfico existente
        } else {
          const ctx = chartRef.current.getContext('2d');
  
          chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: productData.map((_, index) => `Product ${index + 1}`),
              datasets: [
                {
                  label: 'Price',
                  data: productData,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2
                }
              ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => `$${value}`
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Total Income: $${totalIncome}`,
                  position: 'left'
                }
              }
            }
          });
        }
      }
    }, [productData, totalIncome]);
  
    return (
      <div>
      
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    );
  }

export default IncomeGenerated