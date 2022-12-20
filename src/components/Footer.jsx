import '../styles/Footer.css';
import LogoMarde from '../img/Logo-marde.png';// se importan estilos y una imágen correspondiente a mi marca personal y esta función footer solo retorna la información que se lee acontinuación. sería un componente no funcional


const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-up">
                <div className="footer-p">
                    <p>DESCARGO DE RESPONSABILIDAD IMPORTANTE: todo el contenido disponible en nuestro sitio web, en los sitios web hipervinculados,
                        y en las aplicaciones, foros, blogs, cuentas de redes sociales y otras plataformas asociados ("Sitio") tienen como único
                        objetivo proporcionarle información general procedente de fuentes externas.</p>
                </div>
                <div className="footer-c">
                    <p>Crypto Stadistics</p>
                    <p>© 2022</p>
                </div>
            </div>
            <div className="footer-down">
                <p>Developed by</p>
                <div>
                  <img src={LogoMarde} alt="Logo Marde" />
                   
                </div>
            </div>
        </div>
    );
}
export default Footer;