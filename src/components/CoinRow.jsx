import React from "react";// se importa react, los estilos y los graficos
import "../styles/CoinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from './App'

export default function CoinRow({ coin, index }) {// ésta función se encarga de traer los datos de la api, para reflejarlos en la tabla que sale al final, trael el índice de cada cripto, la imagen , el simbolo, los precios, el porcentaje etc.
  console.log(index);
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>{/* Se refleja la grafica de cada una de las cripto, dinbuja la grafica tipo 1 que es una linea, si el porcentaje es menor que 0 la dibuja color rojo, si ha aumentado ésta es verde*/}
    </tr>
  );
}