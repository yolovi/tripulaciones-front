import React from "react";
import GetEvents from "../Events/GetEvents/GetEvents";
import "./Home.scss";
import CarrouselEvents from "../Events/CarrouselEvents/CarrouselEvents";
const Home = () => {
  return (
    <>
      <h2>ESTÁS EN HOME</h2>
      <h2>SearchBar</h2>
      <div className="filtros-home">
        <h2>Filtros</h2>
        
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
