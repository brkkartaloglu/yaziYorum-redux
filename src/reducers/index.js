const INITIAL_STATE = {
  yaziListesi: [],
  yaziListesiHata: "",
  yaziDetayi: { title: "", created_at: "", id: "", content: "", yorumlar: [] },
  yaziDetayiHata: "",
  yorumEkleHata: "",
  yaziSilHata: "",
  yaziDuzenleHata: "",
  yaziEkleHata: "",
  yorumSilHata: "",
  yorumDuzenleHata: "",
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "YAZI_LISTESI_GETIR":
      return { ...state, yaziListesi: action.payload, yaziListesiHata: "" };

    case "YAZI_LISTESI_GETIR_HATA":
      return { ...state, yaziListesiHata: action.payload };

    case "YAZI_GETIR":
      return { ...state, yaziDetayi: action.payload, yaziDetayiHata: "" };

    case "YAZI_GETIR_HATA":
      return { ...state, yaziDetayiHata: action.payload };

    case "YAZI_DUZENLE":
      return {
        ...state,
        yaziDetayi: { ...state.yaziDetayi, ...action.payload },
        yaziDuzenleHata: "",
      };

    case "YAZI_DUZENLE_HATA":
      return { ...state, yaziDuzenleHata: action.payload };

    case "YORUM_DUZENLE":
      return {
        ...state,
        yaziDetayi: {
          ...state.yaziDetayi,
          yorumlar: state.yaziDetayi.yorumlar.map((yorum) =>
            yorum.id === action.payload.id ? action.payload : yorum
          ),
        },
        yorumDuzenleHata: "",
      };

    case "YORUM_DUZENLE_HATA":
      return { ...state, yorumDuzenleHata: action.payload };

    case "YAZI_EKLE":
      return {
        ...state,
        yaziDetayi: { ...state.yaziDetayi, ...action.payload },
        yaziEkleHata: "",
      };

    case "YAZI_EKLE_HATA":
      return { ...state, yaziEkleHata: action.payload };

    case "YORUM_EKLE":
      return {
        ...state,
        yaziDetayi: {
          ...state.yaziDetayi,
          yorumlar: [...state.yaziDetayi.yorumlar, action.payload],
        },
        yorumEkleHata: "",
      };

    case "YORUM_EKLE_HATA":
      return { ...state, yorumEkleHata: action.payload };

    case "YAZI_SIL":
      return {
        ...state,
        yaziListesi: state.yaziListesi.filter(
          (yazi) => yazi.id !== action.payload
        ),
        yaziSilHata: "",
      };

    case "YAZI_SIL_HATA":
      return { ...state, yaziSilHata: action.payload };

    case "YORUM_SIL":
      return {
        ...state,
        yorumlar: state.yaziDetayi.yorumlar.filter(
          (yorum) => yorum.id !== action.payload
        ),
        yorumSilHata: "",
      };
    case "YORUM_SIL_HATA":
      return { ...state, yorumSilHata: action.payload };
    default:
      return state;
  }
};
