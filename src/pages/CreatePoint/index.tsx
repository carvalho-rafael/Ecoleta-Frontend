import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../images/trash.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'

import './style.css'

const CreatePoint = () => {
    const [items, setItems] = useState<item[]>([]);
    const [UFs, setUFs] = useState<string[]>([]);
    const [Cities, setCities] = useState<string[]>([]);
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [selectedUF, setselectedUF] = useState('0')
    const [selectedCity, setselectedCity] = useState('0')
    const [selectedItems, setselectedItems] = useState<number[]>([])
    
    const [selectedPosition, SetSelectedPosition] = useState<[number, number]>([0, 0])
    const [initialPosition, SetInitialPosition] = useState<[number, number]>([0, 0])

    interface item {
        id: number;
        title: string;
        image_url: string;
    }

    interface UF {
        sigla: string;
    }

    interface City {
        nome: string;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            SetInitialPosition([
                position.coords.latitude,
                position.coords.longitude
            ])
        })
    }, [])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
            console.log(response.data)
        });
    }, []);

    useEffect(() => {
        api.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
            const UFacron = response.data.map(uf => uf.sigla)
            setUFs(UFacron)
            console.log(UFacron)
        })
    }, []);

    useEffect(() => {
        if (selectedUF !== '0')
            api.get<City[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + selectedUF + '/municipios').then(response => {
                console.log(response.data)
                const cityName = response.data.map(city => city.nome)
                setCities(cityName)
            })
        else
            setCities([])
    }, [selectedUF]);

    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setselectedUF(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setselectedCity(city);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setInputData({ ...inputData, [name]: value })
        console.log(inputData)
    }

    function handleSelectItem(id: number) {
        if(selectedItems.includes(id))
            setselectedItems(selectedItems.filter(item => item !== id))
        else
            setselectedItems([...selectedItems, id])

    }

    function handleClickMap(event: LeafletMouseEvent) {
        SetSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const {name, email, whatsapp} = inputData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        api.post('points', data).then(response => {
            alert("ponto criado");
        }).catch(error => console.log(error));
        console.log(data)
    }

    return (
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
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br /> Ponto de Coleta</h1>
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da Entidade </label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Email </label>
                                <input type="email" name="email" id="email" onChange={handleInputChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp </label>
                                <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço no mapa</span>
                        </legend>

                        <Map center={initialPosition} zoom={13} onclick={handleClickMap}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedPosition}></Marker>
                        </Map>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado </label>
                                <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUF}>
                                    <option value="0">Selecione um estado</option>
                                    {UFs.map(uf => (
                                        <option key={uf} value={uf}>
                                            {uf}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="cidade">Cidade </label>
                                <select name="cidade" id="cidade" value={selectedCity} onChange={handleSelectCity}>
                                    <option value="0">Selecione uma cidade</option>
                                    {}
                                    {Cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
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
                            {items.map(item => (
                                <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    <img src={item.image_url} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar ponto de coleta
                    </button>
                </form>

            </main>


        </div>
    );
}
export default CreatePoint;