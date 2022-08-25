import React from "react";
import YaziFormu from "./YaziFormu";
import { useSelector } from "react-redux";

const YaziDuzenle = () => {

  const yazi = useSelector((state) => state.yaziDetayi);

  return (
    <div>
      <h1>Yazi Duzenleme Formu</h1>
      <YaziFormu yazi={yazi} />
    </div>
  );
};

export default YaziDuzenle;
