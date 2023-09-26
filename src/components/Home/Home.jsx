import React, { useState, useEffect } from 'react';
import GetEvents from '../Events/GetEvents/GetEvents';
import './Home.scss';
import CarrouselEvents from '../Events/CarrouselEvents/CarrouselEvents';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

const Home = () => {
  const validCategories = [
    { value: 'Finanzas e inversión', label: 'Finanzas' },
    { value: 'Gestión empresarial', label: 'Gestión' },
    { value: 'Habilidades directivas', label: 'Habilidades' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Emprendimiento', label: 'Emprendimiento' },
    { value: 'Sociedad', label: 'Sociedad' },
  ];

  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [timer, setTimer] = useState();

  //retrasa la busqueda unos milisegundos para las busquedas de texto
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const t = setTimeout(search, 600);
    setTimer(t);
  }, [searchText, categories]);

  const toggleCategory = category => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const search = () => {
    console.log(searchText);
    console.log(categories);
  };

  return (
    <>
      <InputGroup pb="4" w="100%">
        <InputRightElement pointerEvents="none">
          <SearchIcon />
        </InputRightElement>
        <Input
          placeholder="Buscar"
          borderRadius={24}
          background="#FAF9FC"
          border="0"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </InputGroup>
      <div className="filtros-home">
        <div className="botones-filtros-home">
          {validCategories.map(cat => (
            <button
              className={`boton-filtros-home ${
                categories.includes(cat.value) ? 'active' : ''
              }`}
              onClick={() => toggleCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <section className="paraTi">
        <h2>Para ti</h2>
        <CarrouselEvents />
      </section>
      <section className="proximos-eventos">
        <h2 className="titulo">Próximos eventos</h2>
        <GetEvents />
      </section>
    </>
  );
};

export default Home;
