import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LogwordDeleteModalProps } from '../../../apis/logwork/responses/logwork-detail.response';
import { deleteLogworkApi } from '../../../apis/logwork';

const PopUpDelete = (props: LogwordDeleteModalProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    await deleteLogworkApi(props.idDelete);
    props.status(!props.update);
    handleClose();
  };

  return (
    <>
      <Button style={{ padding: '5px', marginRight: '5px' }} variant="danger" onClick={handleShow}>
        Xóa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Xóa Logwork </Modal.Title>
        </Modal.Header>
        <Modal.Body> bạn có muốn xóa logwork này không !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUpDelete;
