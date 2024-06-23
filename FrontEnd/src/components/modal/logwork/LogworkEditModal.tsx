import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LogworkEditModalProps } from '../../../apis/logwork/responses/logwork-detail.response';
import { Space, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function LogworkEditModal(props: LogworkEditModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{ padding: '5px', marginLeft: '10px' }}
        variant="warning"
        onClick={handleShow}
        className="btn-edit"
      >
        Chỉnh sửa
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Logwork : {props.data?.task.taskName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-4 border p-4">
            <div>
              <div>
                <div className="border p-4 mb-4">
                  <p>Ngày bổ sung công </p>
                  <Space direction="vertical" size={12}>
                    <RangePicker />
                  </Space>
                  <div style={{ width: '290px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="mt-2">Buổi ngày bắt đầu</p>
                      <select name="startSession" id="">
                        <option value="">chọn</option>
                      </select>
                    </div>
                    <div>
                      <p className="mt-2">Buổi ngày kết thúc</p>
                      <select name="endSession" id="">
                        <option value="">chọn</option>
                      </select>
                    </div>
                  </div>
                  <p className="mt-2">Tổng số công</p>
                  <input disabled style={{ width: '290px' }} value={props.data?.logWork} type="text" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogworkEditModal;
