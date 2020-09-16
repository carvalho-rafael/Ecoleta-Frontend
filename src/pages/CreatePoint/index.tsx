import React from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import logo from '../../images/trash.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

const CreatePoint = () => (
    <div id="page-create-point">
        <header>
            <div className="logo">
                <img src={logo} alt="logo-ecoleta" width="30px" />
                <h2>Ecoleta</h2>
            </div>
            <Link to="/">
                <FiArrowLeft />
                    Voltar para Home
                </Link>
        </header>
        <main>
            <form action="">
                <h1>Cadastro do <br /> Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade </label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp </label>
                            <input type="text" name="whatsapp" id="whatsapp" />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-12.9786111, -38.4571941]} zoom={13}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-12.9786111, -38.4571941]}>

                        </Marker>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado </label>
                            <select name="uf" id="uf">
                                <option value="0">Bahia</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade </label>
                            <select name="cidade" id="cidade">
                                <option value="1">Jacu</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione os itens abaixo</span>
                    </legend>

                    <ul className="itens-coleta">
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="" />
                            <span>Óleo de cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>

        </main>


    </div>
)

export default CreatePoint;