import { Link } from 'react-router-dom'

// Styles
import './main.css'

export const ComoFunciona = () => {
  return (
    <main className="como-funciona">
      <div className="como-funciona--top bg-primary flex-center upper box-shadow border-radius-bottom">
        <h2>¿Cómo funciona?</h2>
      </div>
      <div className="como-funciona--bottom">
        <p>
          No es robado es una plataforma en la que podes registrar los productos
          que compras con sus datos y características distintivas.
        </p>
        <p>
          Esto es útil para cuando alguien se decida a comprar un producto
          usado, un teléfono, una bicicleta o una notebook por ejemplo, pueda
          consultar si el vendedor es el dueño del producto, y desde cuando lo
          es, y si tuvo otros dueños anteriores.
        </p>
        <p>
          El sistema busca generar una traza del producto que garantice la
          genuina procedencia del mismo, en lo posible desde la tienda o
          fabricante, hasta el fin de su vida útil.
        </p>
        <p>
          Como funciona el sistema: un producto es cargado al sistema por una
          tienda, fabricante o por su primer dueño. Cuando es vendido, se
          transfiere de un propietario a otro y esa operación queda registrada
          en el historial del producto.
        </p>
        <p>
          Cualquier persona con el número de serie o identificador único del
          producto puede ver la taza completa del producto.
        </p>
        <p>
          Esta información es muy útil para evitar comprar productos de dudosa
          procedencia.
        </p>
        <p>
          El sistema será libre y gratuito, y se guardará solo el email y un
          nombre de los usuarios, garantizando la privacidad de los mismos.
        </p>
      </div>
      <footer className="bg-primary left">
        <Link to="/" className="left upper outlined">
          ← Atrás
        </Link>
      </footer>
    </main>
  )
}
