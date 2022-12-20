import "../styles/Graph.css"// se importan estilos, los hooks y un tipo de grafico llamado line de la libreria chart.js
import {useEffect, useState, useRef} from 'react'
import { Line } from "react-chartjs-2";

import {//se importan de la libreria de chart.js las propiedades para poder diseñar los graficos.
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import moment from "moment/moment";

ChartJS.register(// se registran estas propiedades para poder utilizarlas 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
//se crea la función graph que origina un grafico de linea para poder utilizarlo en las cards pequeñas y en la tabla de criptos al final del dashboard.
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "rgb(149, 14, 61)"}){
    const chartStyle = {
        border: {
            display: false // se especifica que no se desean bordes en la grafica, que no halla regilla ni etiquetas que trae por defecto la libreria.
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    } // se declara una variable let url quien trae la informaciónde la api esta permite que se dibujen en tiempo real las variaciones en las monedas traidas en el json.
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options
    const [prices, setPrices] = useState()// se utiliza useEstate para detectar los cambios en los datos
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    async function getData(){ // se declara una función asíncrona para poder manipular los datos del json
        try{
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1]))) // en esta ocación se utiliza math round para redondear el resultado de del precio traido en el arreglo json
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){ // se utiliza un map para recorrer el arreglo y traer la fecha, esta es traida en un formato diferente por lo tanto seespecifica que se quiere la fecha como mes /día
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null); // se define la referecia de chart null como valor predeterminado
    
    useEffect(_ => {
        getData() // este useEfect se utiliza para crear el canvas y poder dibujar la grafica tipo 0 que se puede observar en las cadr principales, se definen los colores que utiliza para su resultado final
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(149, 14, 61,1)');   
        BGgradient.addColorStop(1, 'rgba(149, 14, 61,0)')
        setGradient(BGgradient)
    },[])
    
    
    
    switch(type){
        case 0: // se utiliza switch para poder definir que dato usará determinada grafica, la gráfica 0 es la que tiene el gradiente u en el caso 1 es solo la linea, tambien se especifican las propiedades de las gáficas que sean responsive que no posea leyenda ni lineas horizontales y verticales

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    return ( //esto retorna un div en el cual se contendrá la grafica dependiendo del tipo
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}