import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yorumSil } from "../actions";
import alertify from "alertifyjs";

const SilModulYorum = ({ yorum}) => {
  const [open, setOpen] = useState(false);
  const hata = useSelector(state=>state.yorumSilHata)
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const history = useHistory();
  const yaziDetayi_id = useSelector((state) => state.yaziDetayi.id);

  const dispatch = useDispatch();
  

    const handleDelete = (id) => {
      dispatch(yorumSil(yaziDetayi_id, id, close, history.push));
      alertify.error(yorum.display_name+ " kullanıcısının "+ ` "${yorum.body}" ` + " içerikli yorumu silindi.");
    };

  return (
    <React.Fragment>
      <Button className="ui  red basic button" onClick={show}>
        Sil
      </Button>

      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yorumu Sil</Modal.Header>
        <Modal.Content>
          <p>
            Yorumu silmek istiyor musunuz?
          </p>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            <Icon name="remove" /> İptal Et
          </Button>
          <Button positive onClick={() => handleDelete(yorum.id)}>
            <Icon name="checkmark" /> Sil
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default SilModulYorum;
