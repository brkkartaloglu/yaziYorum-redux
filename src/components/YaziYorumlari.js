import React from "react";
import YorumListesi from "./YorumListesi";
import YorumFormu from "./YorumFormu";


const YaziYorumlari = (props) => {
  
  return (
    <React.Fragment>
      <YorumListesi />
      <YorumFormu handleSubmit={props.handleSubmit} />
    </React.Fragment>
  );
};

export default YaziYorumlari;
