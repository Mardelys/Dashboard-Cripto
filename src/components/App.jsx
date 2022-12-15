import { useEffect, useState } from 'react';
import '../styles/App.css';
import CardPrincipal from '../components/CardPrincipal';

export default function App() {
const [coins,setCoins] = useState()
  const getData = async _ => {
  const res =  await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y ")
   const json = await res.json()
   setCoins(json)
  } 
  useEffect(()=>{
   getData()
  },[])

  return (
   !coins ? "Cargando..." :(
   <div className='App'>
      <ThemeProvider>
       <Header currencys={currency} fun={setSelCur} cur={selCur}/>
      </ThemeProvider>
   <main>
       <CardPrincipal json={coins[0]} cur={selCur}/>
       <div className="cards_con">
         { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
           if(index != 0) {
            return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
           }
         })
         }
       </div>
     </main>
     <Convert/>
     <TableCoins coins={coins}/>
     <Footer/>
   </div>
 )
 )

}

export function deleteDec(val, decimal) {
   return val.toFixed(decimal)
 }
 export function colorDec(num){
   return num > 0 ? "green" : "red"
 }
 export const numberF = Intl.NumberFormat("es-ES")
