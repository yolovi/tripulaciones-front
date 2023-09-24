import React from "react";
import GetEvents from "../Events/GetEvents/GetEvents";
import "./Home.scss";
import CarrouselEvents from "../Events/CarrouselEvents/CarrouselEvents";
const Home = () => {
  return (
    <>
      <h2>ESTÁS EN HOME</h2>
      <h2>SearchBar</h2>
      <h2>Filtros</h2>
      <h2>Para ti</h2>
      <section className="paraTi">
        <CarrouselEvents />
        <h2>Próximos eventos</h2>
      </section>
      <section>
        <GetEvents />
      </section>
    </>
  );
};

export default Home;
