import { useEffect, useState } from "react";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "../styles/Convert.css"; // Estilos


export default function Convert() {
  const [coin, setCoin] = useState([])
  const [selCoin1, setSelCoin1] = useState("btc")
  const [selCoin2, setSelCoin2] = useState("eth")
  const [mainTxt, setMainTxt] = useState(0)
  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1") 
    const json = await res.json() 
    setCoin(json);

    // Establecer el valor de los datos obtenidos
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);

  useEffect(_ => {// se utiliza el useEfect donde se utilizan unas variables para poder condicionar el convertidor
    let a,b // se utiliza por each para recorrer el arreglo json que se trae de la api con las monedas 
    coin.forEach(({symbol, current_price}) =>{
      if(symbol == selCoin1){ //se condiciona que si el simbolo es igual a la moneda seleccionada realizar la operación para dar como resultado la conversion 
        a = (mainTxt * current_price) / 1
      }else if(symbol == selCoin2){ // y en esta sección solo se puede ver el valor que da como resultado la operación ya que no se puede incluir ningun número en el 2do input
        b = current_price
      }
    })
     a ? setRes(a / b) : setRes(0)
  },[mainTxt,selCoin1,selCoin2])

  return (
    <div className="contenedor"> {/*se retorna un contenedor para el convertidor*/}
      <h2>Comparación de Monedas</h2>

      <div className="input-convert"> 
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />{/* se agrega el componente input 1 que es el que recibe el valor a convertir*/}

        <FaExchangeAlt className="icono" />{/* ícono de las flechas importado de react icons*/}

        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/> {/*segundo input en el cual solo se puede ver el resultado de la conversión*/}
      </div>
    </div>
  );
}