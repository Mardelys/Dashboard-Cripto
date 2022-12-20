import React, {useState, useRef} from "react"; // se importa react, los estilos y se utilizará la función deleDec para poder mostrar pocos decimales 
import "../styles/Convert.css";
import {deleteDec} from './App'

export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) { // se crea una función imputconvert que se exporta por defecto para poder importarla, se le asignan sus respectivas props, este inpiut corresponde al input donde se escribe la cantidad a convertir 
  const selRef = useRef(null)
  const [selVal, setSelVal] = useState(sel)

  return (// retorna un div que contiene dentro un input al que se le especifica como debe mostrarse, este input permitirá ingresar texto
    <>
      <div className="input">
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>// se convierte el texto ingresado en número para poder realizar la operación de conversión
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}{/* se crea otro input correspponde al que solo reflejará el resultado de la conversión, éste input esta condicionado para ser solo lectura, se utiliza deletDec para solo traer 4 decimales ya que trae demasiados números al convertirlo a la siguiente moneda*/}
        
        <div className="select"> {/* se agrega un selector el cual refleja el id de la moneda para que sea mas facil de identificar por el usuario, trae todas las monedas de la api*/}
          <img src="" alt="" />
          <select value={selVal} ref={selRef} onChange={() => {
              setSelVal(selRef.current.value)
              fun(selRef.current.value)
            }}>
            {coin.map((co) => {
              if(co.symbol === selVal){ {/* se condiciona el uso de los input, si esta seleccionado el valor que no salga en la lista para seleccionar nuevamente, así se evita que se seleccione la misma moneda en ambos input*/}
                selRef.current.previousSibling.src = co.image
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              }else if(co.symbol != other){
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              
            })}
          </select>
        </div>
      </div>
    </>
  );
}