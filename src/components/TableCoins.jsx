import React from "react";// se importa react, estilos y coin row quien se encarga de colocar 
import "../styles/TableCoins.css";
import CoinRow from "./CoinRow";

function TableCoins({ coins }) {
  console.log(coins);
  return (
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;