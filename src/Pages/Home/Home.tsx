// Styles
import './main.css'

// Resources
import bgTop from './home--top-bg.png'

// Hooks
import { useAuth } from '../../Hooks/useAuth'

// Component
import { Footer } from '../../Components/Footer/Footer'
import { Link, useHistory } from 'react-router-dom'

export const Home: React.FC = () => {
  const go = useHistory()
  const { user } = useAuth()
  return (
    <>
      <main className="home">
        <div
          className="home--top flex-center"
          style={{ backgroundImage: `url(${bgTop})` }}
        >
          <h1 className="upper">se parte</h1>
          <p className="upper">de una sociedad mas segura</p>
          <br />
          <div className="right">
            <Link to="/como-funciona/">leé cómo funciona →</Link>
          </div>
        </div>
        <div className="home--bottom bg-primary box-shadow border-radius-top">
          <div className="home--bottom--top">
            <div>
              <h4 className="upper">compra y vende de forma</h4>
              <h2 className="upper">segura</h2>
            </div>
          </div>
          <div className="home--bottom--center">
            {!!user && (
              <button onClick={() => go.push('/productos/')}>
                {!!user ? 'Ver mis productos' : 'Crear una cuenta'}
              </button>
            )}
            <p>
              Registrá tus productos para generar una traza que ayude a
              verificar la procedencia genuina.
            </p>
          </div>
          <div className="home--bottom--bottom">
            <div className="display-info-container">
              <div className="display-info-item-light">
                <span className="material-icons-outlined">face</span>
                <span>12.000+</span>
              </div>

              <div className="display-info-item-light">
                <span className="material-icons-outlined">directions_bike</span>
                <span>40.000+</span>
              </div>

              <div className="display-info-item-light">
                <span className="material-icons-outlined">person_search</span>
                <span>2.000+</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
