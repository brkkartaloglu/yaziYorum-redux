import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yorumDuzenle } from "../actions";

const YorumDuzenle = (props) => {
const yaziDetayi = useSelector((state) => state.yaziDetayi);
const post = yaziDetayi.id;
const history = useHistory();
const dispatch = useDispatch();

  const path = props.location.pathname.substring(
    0,
    props.location.pathname.length - 4
  );
  const YORUM_INITIAL = {
    display_name: props.location.state.name,
    body: props.location.state.yorum,
  };
  const [commentBody, setCommentBody] = useState(YORUM_INITIAL);


  const handleOnChange = (event) => {
    setCommentBody({ ...commentBody, [event.target.name]: event.target.value });
  };

  const handleCommentSubmit = (event, commentBody) => {
    event.preventDefault();
    dispatch(yorumDuzenle(path,commentBody,history.push,post))
  };


  return (
    <div>
    <h3>YORUM DUZENLEME FORMU</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          handleCommentSubmit(event, commentBody);
        }}
      >
        <div className="ui mini icon input">
          <input
            disabled
            name="display_name"
            type="text"
            value={commentBody.display_name}
          />
        </div>
        <div className="field">
          <textarea
            name="body"
            placeholder={commentBody.body}
            onChange={handleOnChange}
            value={commentBody.body}
          ></textarea>
        </div>
        <button className="ui black button">
          Yorumu Gönder
        </button>
        <Link
          className="ui black button"
          to={`/posts/${post}`}
        >
          Yorumlara Dön
        </Link>
      </form>
    </div>
  );
};

export default YorumDuzenle;
