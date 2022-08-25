import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SilModulYorum from "./SilModulYorum";

const YorumListesi = (props) => {
  const yaziDetayi = useSelector((state) => state.yaziDetayi);
  const yorumlar = useSelector(state=>state.yaziDetayi.yorumlar)
  return (
    <>
      <h3>Yorumlar</h3>
      {yorumlar.map((yorum) => {
        return (
          <div className="ui relaxed list" key={yorum.id}>
            <div className="item">
              <img
                className="ui avatar image"
                src="https://semantic-ui.com/images/avatar2/small/matthew.png"
              ></img>
              <div className="content">
                <span className="header">{yorum.display_name}</span>
                <div className="description">{yorum.body}</div>
              </div>
            </div>
            <div className="ui buttons">
              <Link
                className="ui  blue basic button"
                to={{
                  pathname: `/posts/${yaziDetayi.id}/comments/${yorum.id}/edit`,
                  state: {
                    yorum: yorum.body,
                    name: yorum.display_name,
                  },
                }}
              >
                Düzenle
              </Link>

              <SilModulYorum  yorum={yorum} ></SilModulYorum>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default YorumListesi;
