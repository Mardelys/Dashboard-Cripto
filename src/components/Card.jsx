import "../styles/Card.css" // se importan los estilos correspondientes
import Graph from "./Graph" // se importa las gráficas
import {colorDec} from './App'

export default function Card({coinId, cur, porcentaje, price, img}){{/* se crea y exporta por defecto la función car, y se le pasan las props que queremos que refleje el id, la moneda el porcentaje de estadisticas el precio y la imágen correspondiente al ícono de la moneda*/}
    return (
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>{/* se especifica que se formatea el porcentaje para que solo muestre 2 decimales*/}
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/> {/* se agrega el componente graph para que dibuje la gráfica y se le especifican las prps*/}
            </div>
        </div>
    )
}