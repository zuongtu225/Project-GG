import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './notification-detail.scss';
import { useEffect, useState } from 'react';
import { getDetailNotificationAPI } from '../../apis/notification';
import { NotificationDetailType } from '../../apis/notification/responses/notification.response';

interface NotificationDetailProps {
  show: boolean;
  notificationId: number;
  onHide: () => void;
}

const NotificationDetail = (props: NotificationDetailProps) => {
  const [dataOneNotification, setDataOneNotification] = useState<NotificationDetailType>();
  const data = async () => {
    const notification = await getDetailNotificationAPI(props.notificationId);
    setDataOneNotification(notification);
  };

  useEffect(() => {
    data();
  }, [props.notificationId]);

  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-center"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Thông báo</h4>
          <div className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control disabled type="text" value={dataOneNotification?.title} />
          </div>
          <div>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              disabled
              className="detail__content"
              type="text"
              value={dataOneNotification?.content}
            />
          </div>
          <div className="mt-3">
            <span className="fw-bold">Start Date:</span> {dataOneNotification?.startDate} -{' '}
            <span className="fw-bold">End Date:</span>
            {dataOneNotification?.endDate}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationDetail;
