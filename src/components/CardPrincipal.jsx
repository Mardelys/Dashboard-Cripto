import { FaPlay } from "react-icons/fa";// se importa un ícono de react icons 
import '../styles/CardPrincipal.css'// se importan los estilos
import { deleteDec, colorDec } from './App'// se importan las funciones para formatear los prcentajes y la condicional correspondiente al color para representar el crecimiento o disminución en el tiempo consultado 
import Graph from "./Graph";// se importa las gráficas 
// se crea la función card principal con las siguientes props, estas props se desectructuraron usando llaves para no usar tener códico repetitivo usando 'props.' si nó directamente el nombre de la prop
function CardPrincipal({ json: { id, //se indica que del json se quiere tomar el id correspondiente al nombre de la moneda, el simbolo que corresponde al el nombre abreviado de esta moneda, el precio, el logo de la cripto, los precios el porcentaje de precio en 1h, 24h, 7dias, 30dias y el año
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency
}, cur = "usd" }) // se establece la moneda por defecto en dolares
{

   
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-title">
                    <img src={image} alt="Icono de cripto" />
                    <h2>{symbol} - {current_price} {cur}</h2>{/* se especifica lo que contendra la primera sección de la card principal, el precio el dolares predeterminado*/}
                    <h2><FaPlay className={`icon-arrow ${colorDec(price_change_percentage_30d_in_currency)}`}/>{deleteDec(price_change_percentage_30d_in_currency,2)}%</h2>{/* Representa el porcentaje de los ultimos 30 dias aplicando las funciones de formateos de ddecimal y el coloreado que indica si el crecimiento es negativo o positivo*/}
                </div>
                <div className="graphic"> {/* este div contiene la gráfica  contiene el titulo capitalización y muestra una gráfica tipo 0 la cual contiene el color de fondo degradado*/}
                    <Graph type={0} coin={id} currency={cur}/> {/* al componente graph se le agregan las props, grafica tipo 0, nombre de la moneda y moneda*/}
                </div>
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">{/*esta tabla es la que se refleja al final con la capitalización de estos tiempos especificados*/}
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> {/* se piden los porcentajes formateados para que se reflejen, especificando cada tiempo, 1h, 24h etc*/}
                                 <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
    }

export default CardPrincipal;