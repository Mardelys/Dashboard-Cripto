//Se importan los hooks useEffect y useState para manipular los estados de los componentes de la página, se importan los estilos y por último se importan los componentes que se crearon, ya que este es el componente principal de página
import {useEffect, useState} from 'react'
import "../styles/App.css"; 
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card';
import Convert from './Convert';
import Footer from './Footer';
import Header from './Header';

// Se exporta la función App que contine los estados de las props que se van a utilizar para especificar las acciones de los componentes. El nombre de la props por ejemplo 'cois' contiene el valor inicial del estado de esta props mientras las que contienen set delante ejemplo 'setCoins' son las props con el estado modificado por lo tanto cuando dicho cambio ocurra sucede determinada acción en el componente
export default function App() {
  const [coins, setCoins] = useState()
  const [currency, setCurrency] = useState()
  const [selCur, setSelCur] = useState("usd")
  // Se declara una función asíncrona para llamar la api mediante un await fetch(el await se coloca para indicarle al navegador que espere que cargue la api y evitar errores en el cargue de la página, se coloca el link de la api especificando lo que se necesita de ella, en la página se importa la información de 6 criptomonedas, el precio, el porcentaje y capitalización de mercado
  const getData = async () =>{// se puede observar dentro del link de la api una variable llamada selCur quien trae el selector de monedas que se encuentra en el head, al no especificar la moneda en el enlace puede traer todas las opciones disponibles
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json() // se utiliza el await para indicar que espere la carga del json que son los datos traidos de la api
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json)
    setCurrency(cur)
  }
  useEffect(() => {// se utilizan los useffect para traer los datos una vez se haga el renderizado de la página, los corchetes despues de las llaves indica que se repetirá una vez, si no se colocan la página se renderizaría cada vez que reporte un cambio en la página, y en los datos.
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])

  
  return (// La función App retorna una condicional para poder hacer que el navegador espere los datos traidos de la api, mientras se esperan los datos externos sale cargando en la pantalla, una vez que esten todos los datos,la página  se muestra sin problemas.
    !coins ? "Cargando..." :(
    <div className='App'> {/* se define un div que es el contenedor de toda la aplicación*/}
        <Header currencys={currency} fun={setSelCur} cur={selCur}/>{/*se trae el componente header con sus props que son la moneda, el selector para poder acceder a las dicersas monedas que trae la api, la currency la cual es definida por defecto con usd para que los valores representados en los precios de las criptos sea siempre en dolares**/}
        <Convert/>{/*se agrega el componente que corresponde al convertidos de moneda*/}
      <main>
        
        <CardPrincipal json={coins[0]} cur={selCur}/>{/* se agregan las card principales y se le especifica a cada una de ellas que dato debe extraer del json traido por la api, estas estan organizadas por capitalizacion de mercado por lo tanto al acceder a la posicion 0 y 1 se trae las criptomonedas mas populares en la actualidad, bitcoin y ethereum*/}
        <CardPrincipal json={coins[1]} cur={selCur}/>
        
        
      </main>
      <div className="cards_con"> {/* se agregan unos componentes llamados card, quienes corresponden a las siguientes posiciones en el arreglo json traido por la api, se le especifican unas props diferentes ya que no son iguales a las card principales, solo se mapea del arreglo las especificadas a continuación, en la api se especifica cuanrtos datos y monedas se quiere traer, por lo tanto esta car dibujara las páginas pedidas a ala api restantes.*/}
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            if(index != 0 && index != 1) {{/* trae las páginas llamadas en la api, sin embargo se debe aplicar una condicional que corresponde a las criptomonedas llamadas en la card principal, esto evita que las criptomonedas que ya se reflejan no se repitan en la card pequeñas*/}
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
        {/* se agrega la tabla de las criptomonedas, esta refleja todas las criptomonedas, con porcentajes y pequeñas gráficas*/ }
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  )
  )

} //ésta función deleteDec ayuda a formatear los porcentajes, ya que esto trae muchos números y al aplicar esta función se traen 2
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
// esta función se encarga de evaluar los datos de los porcentajes de crecimiento de las cripto, esta evalúa una condicional, la cual si el porcentaje es menor a cero el número se refleja en rojo indicando disminución y verde superior a 0 que indica aumento.
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
// esta función formatea los valores de las cripto, colocando un punto cada 3 números como se entiende en español, ya que la api es extrangera y trae los valores separados por ',' .
export const numberF = Intl.NumberFormat("es-ES")