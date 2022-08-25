import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yaziListesiGetir } from "../actions";

const YaziListesi = () => {
  const yaziListesi = useSelector((state) => state.yaziListesi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(yaziListesiGetir());
  }, []);

  return (
    <React.Fragment>
      <div>
        <i className="tr flag"></i> <i className="book icon"></i>
        <h3 align="center">Türkçe Yazı Yorum Uygulaması (Redux Versiyonu)</h3>
      </div>

      <div>
        <Link to="/yaziekle">
          <b>Yazı Ekle</b>
        </Link>
      </div>
      <div className="ui relaxed divided list">
        {yaziListesi.map((yazi) => {
          return (
            <div className="item" key={yazi.id}>
              <i className="large github middle aligned icon"></i>
              <div className="content">
                <Link to={`/posts/${yazi.id}`} className="header">
                  {yazi.title}
                </Link>
                <div className="description">{yazi.created_at}</div>
              </div>
            </div>
          );
        })}{" "}
      </div>
    </React.Fragment>
  );
};

export default YaziListesi;
