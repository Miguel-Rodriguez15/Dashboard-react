import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function MostSelledProduct() {
    const chartRef = useRef(null);
    let myChart = useRef(null);
    const [productNames, setProductNames] = useState([]);

    useEffect(() => {
        const fetchMostSoldProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/carts');
                const data = await response.json();
                const products = extractProducts(data);
                const productDetails = await getProductDetails(products);
                drawChart(products, productDetails);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        const extractProducts = (data) => {
            const productCount = new Map();

            data.forEach((cart) => {
                cart.products.forEach((product) => {
                    if (productCount.has(product.productId)) {
                        productCount.set(product.productId, productCount.get(product.productId) + 1);
                    } else {
                        productCount.set(product.productId, 1);
                    }
                });
            });

            const products = Array.from(productCount.entries()).map(([productId, count], index) => ({
                productId,
                count,
            }));

            return products;
        };

        const getProductDetails = async (products) => {
            const productDetails = [];
            for (const product of products) {
                const response = await fetch(`https://fakestoreapi.com/products/${product.productId}`);
                const data = await response.json();
                productDetails.push({
                    id: product.productId,
                    name: data.title,
                    count: product.count,
                });
            }
            return productDetails;
        };

        const drawChart = (productData, productDetails) => {
            const labels = productDetails.map((product) => product.name);
            const quantities = productDetails.map((product) => product.count);

            if (myChart.current) {
                myChart.current.destroy(); // Destruir el gráfico existente si existe
            }

            const ctx = chartRef.current.getContext('2d');
            myChart.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cantidad de pedidos',
                            data: quantities,
                            backgroundColor: generateColors(productData.length),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        };

        const generateColors = (count) => {
            const colors = [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ];
            return colors.slice(0, count);
        };

        fetchMostSoldProducts();

        return () => {
            if (myChart.current) {
                myChart.current.destroy(); // Destruir el gráfico al desmontar el componente
            }
        };
    }, []);

    return (
        <article>
            <h2>Productos mas vendidos</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </article>
    );
};
export default MostSelledProduct