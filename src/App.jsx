import React, { useEffect } from 'react';
import { useState } from 'react';

import Calculator from './pages/Calculator.jsx';


function App() {

  

  // //useEffect(
  //   () => {
  //     getJidelnicek({
  //       pohlavi: 'žena',
  //       vek: 30,
  //       vyska: 170,
  //       vaha: 65,
  //       aktivita: 'sedavá',
  //       cil: 'hubnutí',
  //       kalorie: 1800,
  //       bilkoviny: 100,
  //       sacharidy: 200,
  //       tuky: 60,
  //     })
  //   }, []
  // );




  return (
    <>
      <Calculator />
    </>
  )
}

export default App;
