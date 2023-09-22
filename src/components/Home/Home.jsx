import React from "react";
import GetEvents from "../Events/GetEvents/GetEvents";

const Home = () => {
  return (
    <>
      <h2>ESTÁS EN HOME</h2>
      <h2>SearchBar</h2>
      <h2>Filtros</h2>
      <h2>Para ti</h2>
      <section className="paraTi">
    <p>Slider</p>
    <h2>Próximos eventos</h2>
      </section>
      
      <GetEvents />
    </>
  );
};

export default Home;
