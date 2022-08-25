import React, { useEffect } from "react";
import YaziYorumlari from "./YaziYorumlari";
import { Link, useParams } from "react-router-dom";
import SilModal from "./SilModal";
import { useDispatch, useSelector } from "react-redux";
import { yaziGetir, yorumEkle } from "../actions";

const YaziDetayi = () => {
  const yaziDetayi = useSelector((state) => state.yaziDetayi);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    dispatch(yorumEkle(id, yorum));
  };

  useEffect(() => {
    dispatch(yaziGetir(id));
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <p>{yaziDetayi.content}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>
          Düzenle
        </Link>
        <SilModal yazi={yaziDetayi} />
      </div>
      <YaziYorumlari
        handleSubmit={handleCommentSubmit}
      />
    </React.Fragment>
  );
};

export default YaziDetayi;
