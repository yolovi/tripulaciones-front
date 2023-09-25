import React from "react";
import GetEvents from "../Events/GetEvents/GetEvents";
import "./Home.scss";
import CarrouselEvents from "../Events/CarrouselEvents/CarrouselEvents";
const Home = () => {
  return (
    <>
      <h2>ESTÁS EN HOME</h2>
      <div className="buscador"></div>
      <h2>SearchBar</h2>
      <div className="filtros-home">
        <div className="botones-filtros-home">
          <button className="boton-filtros-home"><span className="letra-boton">Finanzas</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Gestión</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Habilidades</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Marketing</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Tecnología</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Emprendimiento</span></button>
          <button className="boton-filtros-home"><span className="letra-boton">Sociedad</span></button>
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
