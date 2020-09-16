import React from 'react';
import './style.css'
import { FiLogIn } from 'react-icons/fi'
import logo from '../../images/trash.svg'
import { Link } from 'react-router-dom'

const Home = () => (
    <div id="page-home">
        <div className="content">
            <header>
                <img src={logo} alt="Ecoleta" width="30px" />
                <h2 className="logo-text">Ecoleta</h2>
            </header>
            <main>
                <h1>O mundo agradece a sua ajuda.</h1>
                <p>Encontre um ponto de coleta perto de você e faça a diferença!</p>
                <Link to="/create-point">
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>Cadastre-se</strong>
                </Link>
            </main>
        </div>

    </div>
)

export default Home;