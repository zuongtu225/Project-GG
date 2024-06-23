import Table from 'react-bootstrap/Table';
import styles from './LogworkDetail.module.scss';
import convertDate from '../../utilities/convert-date';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLogworkApi } from '../../apis/logwork/index';
import LogworkEditModal from '../../components/modal/logwork/LogworkEditModal';
import LogworkModal from '../../components/modal/logwork/LogworkModal';
import PopUpDelete from '../../components/modal/logwork/PopUpDelete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LogworkType, RootStateLogwork } from '../../types/logwork/logwork.type';
import { getLogWorkAction } from '../../store/actions/logword.action';

const LogworkDetail = () => {
  const dispatch = useDispatch();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isUpdateListLogWork, setIsUpdateListLogWork] = useState<boolean>(false);
  const logworkData = useSelector((state: RootStateLogwork) => state.logworkReducer.logworks);
  const { id } = useParams();

  const fetchData = async () => {
    const logworkDetail = await getLogworkApi(Number(id));
    dispatch(getLogWorkAction(logworkDetail));
  };

  const renderLogwork = (isUpdate: boolean) => {
    setIsUpdate(isUpdate);
  };

  useEffect(() => {
    fetchData();
  }, [isUpdate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['container__header']}>
          <p className={styles['container__header-title']}> Danh sách công của {logworkData[0]?.task?.taskName}</p>
          <LogworkModal id={Number(id)} taskName={logworkData[0]?.task?.taskName}  status={renderLogwork}
                        update={isUpdate}/>
        </div>
        <Table className={styles['table--striped']} bordered responsive="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Thời gian bắt Đầu</th>
              <th>Sáng/chiều</th>
              <th>Thời gian kết thúc</th>
              <th>Sáng/chiều</th>
              <th>Số công</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {logworkData.length > 0 ? (
              logworkData.map((item: LogworkType, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{convertDate(item.startDate)}</td>
                    <td>{item.startSession === 1 ? 'Buổi Sáng' : 'Buổi Chiều'}</td>
                    <td>{convertDate(item.endDate)}</td>
                    <td>{item.endSession === 2 ? 'Buổi Chiều' : 'Buổi Sáng'}</td>
                    <td>{item.logWork}</td>
                    <td>
                      <PopUpDelete
                        idDelete={item.id}
                        status={renderLogwork}
                        update={isUpdate}
                        
                      />
                      <LogworkEditModal id={Number(id)} data={item} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center' }}>
                  không có dữ liệu logwork
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LogworkDetail;
