import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yaziDuzenle, yaziEkle } from "../actions";
import alertify from "alertifyjs";

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({
    title: "",
    content: "",
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const onInputChange = (event) =>
    setYazi({ ...yazi, [event.target.name]: event.target.value });

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (props.yazi?.title) {
      dispatch(yaziDuzenle(id, yazi, history.push));
    } else {
      dispatch(yaziEkle(yazi, history.push));
      alertify.success(yazi.title + " yazısı eklendi.");
    }
  };

  useEffect(() => {
    if (props.yazi?.title && props.yazi?.content)
      setYazi({ title: props.yazi.title, content: props.yazi.content });
  }, [props.yazi]);

  return (
    <React.Fragment>
      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>

          <input
            value={yazi.title}
            type="text"
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı İçeriği</label>
          <textarea
            value={yazi.content}
            rows="3"
            name="content"
            onChange={onInputChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <Link
          className="ui button"
          to={yazi.title ? `/posts/${props.yazi.id}` : `/`}
        >
          İptal Et
        </Link>
      </div>
    </React.Fragment>
  );
};

export default YaziFormu;
