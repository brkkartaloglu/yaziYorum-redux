import axios from "axios";
import { api } from "../api";
import alertify from "alertifyjs";

export const yaziListesiGetir = () => (dispatch) => {
  api()
    .get("/posts")
    .then((response) => {
      dispatch({ type: "YAZI_LISTESI_GETIR", payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: "YAZI_LISTESI_GETIR_HATA",
        payload: "Yazı Listesi getirilirken hata oluştu.",
      });
    });
};

export const yaziGetir = (id) => (dispatch) => {
  axios
    .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
    .then((responses) => {
      const payload = {
        ...responses[0].data,
        yorumlar: responses[1].data,
      };
      dispatch({ type: "YAZI_GETIR", payload: payload });
    })
    .catch(() => {
      dispatch({
        type: "YAZI_GETIR_HATA",
        payload: "Yazı yüklenirken hata oluştu.",
      });
    });
};

export const yaziDuzenle = (id, yazi, push) => (dispatch) => {
  api()
    .put(`/posts/${id}`, yazi)
    .then((response) => {
      dispatch({ type: "YAZI_DUZENLE", payload: response.data });
      push(`/posts/${id}`);
    })
    .catch((error) => {
      dispatch({
        type: "YAZI_DUZENLE_HATA",
        payload: error.response.data.errorMessage,
      });
      alertify.error(error.response.data.errorMessage)
    });
};

export const yorumDuzenle=(path,commentBody,push,post)=>(dispatch)=>{


    api()
    .put(`${path}`, commentBody)
    .then((response) => {
        dispatch({ type: "YORUM_DUZENLE", payload: response.data });
      push(`/posts/${post}`);
    })
    .catch((error) => {
        dispatch({
            type: "YORUM_DUZENLE_HATA",
            payload: error.response.data.errorMessage,
          });
          alertify.error(error.response.data.errorMessage)
    });
}



export const yorumEkle = (id, yorum) => (dispatch) => {
  api()
    .post(`/posts/${id}/comments`, yorum)
    .then((response) => {
      dispatch({ type: "YORUM_EKLE", payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: "YORUM_EKLE_HATA",
        payload: "Yorum eklenirken hata oluştu.",
      });
      alertify.error(error.response.data.errorMessage)
    });
};

export const yaziSil = (id, close, push) => (dispatch) => {
  api()
    .delete(`/posts/${id}`)
    .then(() => {
      dispatch({
        type: "YAZI_SIL",
        payload: id,
      });
      close();
      push(`/`);
    })
    .catch(() => {
      dispatch({
        type: "YAZI_SIL_HATA",
        payload: "Yazı silinirken hata oluştu.",
      });
    });
};

export const yorumSil = (yaziDetayi_id, id, close, push) => (dispatch) => {

  api()
    .delete(`/posts/${yaziDetayi_id}/comments/${id}`)
    .then(() => {
      //modal close
      close();
      //state güncelle
      dispatch(yaziGetir(yaziDetayi_id));
      //push
      push(`/posts/${yaziDetayi_id}`); 
      dispatch({
        type: "YORUM_SIL",
        payload: id,
      });
    })
    .catch(() => {
      dispatch({
        type: "YORUM_SIL_HATA",
        payload: "Yorumu silme işleminde hata oluştu",
      });
    });
};

export const yaziEkle = (yazi, push) => (dispatch) => {
  api()
    .post("/posts", yazi)
    .then((response) => {
      dispatch({ type: "YAZI_EKLE", payload: response.data });
      push("/");
    })
    .catch((error) => {
      dispatch({
        type: "YAZI_EKLE_HATA",
        payload: error.response.data.errorMessage,
      });
      alertify.error(error.response.data.errorMessage)
    });
};
