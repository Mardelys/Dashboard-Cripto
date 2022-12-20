import React from 'react';
import '../styles/Header.css';// se importa react y los estilos correspondientes 

export default function Header({currencys, fun, cur}){// se declara una función que se exporta por defecto al crearla 
  
  return ( // esta función retorna el título y el botón de seleccionar la moneda en la que se quieren ver los precios de las criptos, por defecto esta definida en usd
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>{/*se crea un componente delector el cual tiene definida las props de la moneda, esto despliega la lista de monedas en la que se pueden ver los precios*/}
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>{/* mediante su id se le cloca un onChange para que al seleccionar una moneda esta refleje el valor seleccionado en el selector*/}
      
      {/* se recorre el arreglo traido por la api para poder ubicar el índice, llave y las props necesarias para poder refrescar los cambios en toda la página dependiendo de las monedas*/}
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      </div>
    </header>
  )
}