import React, { useState, useEffect } from 'react';
import GetEvents from '../Events/GetEvents/GetEvents';
import './Home.scss';
import CarrouselEvents from '../Events/CarrouselEvents/CarrouselEvents';
import { searchEvents, getAll } from '../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const Home = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState();

  const validCategories = [
    { value: 'Finanzas e inversión', label: 'Finanzas' },
    { value: 'Gestión empresarial', label: 'Gestión' },
    { value: 'Habilidades directivas', label: 'Habilidades' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Emprendimiento', label: 'Emprendimiento' },
    { value: 'Sociedad', label: 'Sociedad' },
  ];

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const t = setTimeout(search, 200);
    setTimer(t);
  }, [title]);

  useEffect(() => search(), [categories]);

  const toggleCategory = category => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const search = () => {
    if (!title && !categories.length) {
      dispatch(getAll());
      return;
    }
    dispatch(searchEvents({ title, categories }));
  };

  return (
    <>
      <InputGroup pb="4" w="100%">
        <InputRightElement cursor="pointer" onClick={() => setTitle('')}>
          {title ? <CloseIcon /> : <SearchIcon />}
        </InputRightElement>
        <Input
          placeholder="Buscar"
          borderRadius={24}
          background="#FAF9FC"
          border="0"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </InputGroup>
      <div className="filtros-home">
        <div className="botones-filtros-home">
          {validCategories.map(cat => (
            <button
              key={cat.label}
              className={`boton-filtros-home ${
                categories.includes(cat.value) ? 'active' : 'inactive'
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
