import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { logworkAddProps } from '../../../apis/logwork/response/logwork-detail.response';
import { Space, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { createLogWorkAPI } from '../../../apis/logwork';
import '../logWork.scss';
import { LogWorkRequest, itemLogWorkRequest } from '../../../apis/logwork/requests/logwork.request';
const { RangePicker } = DatePicker;
function LogworkModal(props: logworkAddProps) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [blocks, setBlocks] = useState<LogWorkRequest[]>([
    { id: 0, startDate: null, endDate: null, logWork: null, startSession: 1, endSession: 2 },
  ]);
  const [lastChangedBlockId, setLastChangedBlockId] = useState<number | null>(0);
  const [isCheckTotalDate, setIsCheckTotalDate] = useState<boolean>(false);
  const [tempRange, setTempRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [blocksStatus, setBlocksStatus] = useState<{ [key: number]: boolean }>({});
  const [isCheckDate, setIsCheckDate] = useState<boolean>(false);
  const limit = 5;
  const handleClose = () => {
    setShow(false);
    setBlocks([{ id: 0, startDate: null, endDate: null, logWork: null, startSession: 1, endSession: 2 }]);
    setBlocksStatus({});
  };

  const handleDateChange = (dates: RangeValue<Dayjs> | null, blockId: number) => {
    const startDate = dates?.[0]?.format('YYYY/MM/DD') || null;
    const endDate = dates?.[1]?.format('YYYY/MM/DD') || null;
    const isOverlapping = blocks.some((block: LogWorkRequest) => {
      if (block.id !== blockId) {
        const existingStart = block.startDate ? dayjs(block.startDate, 'YYYY/MM/DD') : null;
        const existingEnd = block.endDate ? dayjs(block.endDate, 'YYYY/MM/DD') : null;
        if (startDate && endDate && existingStart && existingEnd) {
          return (
            (dayjs(startDate).isAfter(existingStart) && dayjs(startDate).isBefore(existingEnd)) ||
            (dayjs(endDate).isAfter(existingStart) && dayjs(endDate).isBefore(existingEnd)) ||
            (existingStart.isAfter(dayjs(startDate)) && existingStart.isBefore(dayjs(endDate))) ||
            (existingEnd.isAfter(dayjs(startDate)) && existingEnd.isBefore(dayjs(endDate))) ||
            (dayjs(startDate).isSame(existingStart, 'day') && existingEnd.isBefore(dayjs(endDate))) ||
            (dayjs(startDate).isSame(existingStart, 'day') && existingStart.isBefore(dayjs(endDate)))
          );
        }
      }
      return false;
    });
    if (isOverlapping) {
      alert('Khoảng thời gian chọn không hợp lệ vì chồng chéo với khoảng thời gian đã tồn tại.');
      setTempRange(null);
      return;
    }
    setIsCheckTotalDate(!isCheckTotalDate);
    setBlocks((prevBlocks: LogWorkRequest[]) =>
      prevBlocks.map((block: LogWorkRequest) => {
        if (block.id === blockId && startDate !== endDate) {
          return { ...block, startDate, endDate };
        }
        if (block.id === blockId && startDate === endDate) {
          return { ...block, startDate, endDate, logWork: 0 };
        }
        return block;
      }),
    );
    setIsCheckTotalDate(!isCheckTotalDate);
    setLastChangedBlockId(blockId);
    setIsCheckDate(!isCheckDate);
  };

  const handleAddBlock = () => {
    if (blocks.length < 5) {
      const maxId = blocks.length > 0 ? Math.max(...blocks.map((block) => block.id)) + 1 : 0;
      const newBlock = {
        id: maxId,
        startDate: null,
        endDate: null,
        logWork: null,
        startSession: 1,
        endSession: 2,
      };
      setBlocks((prevBlocks: LogWorkRequest[]) => [...prevBlocks, newBlock]);
      setLastChangedBlockId(maxId);
    }
  };

  const disabledDate = (current: Dayjs, currentBlockId: number) => {
    const currentDate = dayjs(current);
    if (currentDate.isAfter(dayjs().endOf('day'))) {
      return true;
    }
    const disabledRanges = [];
    const selectedDates = blocks
      .filter((block: LogWorkRequest) => block.id !== currentBlockId && block.startDate && block.endDate)
      .map((block: LogWorkRequest) => ({
        id: block.id,
        startDate: block.startDate,
        endDate: block.endDate,
        endSession: block.endSession,
        startSession: block.startSession,
      }));
    disabledRanges.push(...selectedDates);
    for (const range of disabledRanges) {
      let startDate = dayjs(range.startDate);
      let endDate = dayjs(range.endDate);
      if (range.endSession === 2) {
        endDate = endDate.add(1, 'day');
      }
      if (range.startSession === 2) {
        startDate = startDate.add(1, 'day');
      }
      if (currentDate.isSame(startDate) || (currentDate.isAfter(startDate) && currentDate.isBefore(endDate))) {
        return true;
      }
    }
    const checkStartDate = disabledRanges.find((block) => {
      return block.id === currentBlockId && block.startDate !== null && block.startDate === block.endDate;
    });
    if (checkStartDate) {
      return currentDate.isSame(checkStartDate.startDate, 'day');
    }
    const matchingBlocks = blocks.filter(
      (block: LogWorkRequest) =>
        block.endDate !== null &&
        block.startDate !== null &&
        blocks.some(
          (otherBlock) =>
            otherBlock.id !== block.id &&
            otherBlock.startDate !== null &&
            otherBlock.endDate !== null &&
            otherBlock.endDate === block.startDate,
        ),
    );
    if (matchingBlocks && matchingBlocks.length > 0) {
      return currentDate.isSame(matchingBlocks[0]?.startDate, 'day');
    }
    return false;
  };

  const handleRemoveBlock = (id: number) => {
    const updatedBlocks = blocks.filter((block: LogWorkRequest) => block.id !== id);
    setBlocks(updatedBlocks);
  };

  const handleSessionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    blockId: number,
    sessionType: 'start' | 'end',
  ) => {
    const value = e.target.value;
    setBlocks((prevBlocks: LogWorkRequest[]) =>
      prevBlocks.map((block: LogWorkRequest) => {
        if (block.id === blockId) {
          const updatedBlock = { ...block, [sessionType === 'start' ? 'startSession' : 'endSession']: Number(value) };
          return updatedBlock;
        } else {
          return block;
        }
      }),
    );
    setIsCheckTotalDate(!isCheckTotalDate);
    setLastChangedBlockId(blockId);
    setIsCheckDate(!isCheckDate);
  };

  useEffect(() => {
    if (lastChangedBlockId !== null) {
      setBlocks((prevBlocks: LogWorkRequest[]) =>
        prevBlocks.map((block: LogWorkRequest) => {
          let newLogWork = 0;
          if (block.startDate && block.endDate) {
            const startDayjs = dayjs(block.startDate, 'YYYY/MM/DD');
            const endDayjs = dayjs(block.endDate, 'YYYY/MM/DD');
            newLogWork = endDayjs.diff(startDayjs, 'day');
          }
          if (
            block.id === lastChangedBlockId &&
            block.startDate !== null &&
            block.endDate !== null &&
            block.startSession !== null &&
            block.endSession !== null
          ) {
            if (
              block.startDate !== null &&
              block.endDate !== null &&
              block.startSession !== null &&
              block.endSession !== null &&
              block.startDate !== block.endDate &&
              block.startSession === 1 &&
              block.endSession === 2
            ) {
              newLogWork = newLogWork && newLogWork + 1;
            } else if (
              block.startDate !== null &&
              block.endDate !== null &&
              block.startSession !== null &&
              block.endSession !== null &&
              block.startSession === 2 &&
              block.endSession === 1
            ) {
              newLogWork = newLogWork && newLogWork + 0;
            } else if (
              block.startDate !== null &&
              block.endDate !== null &&
              block.startSession !== null &&
              block.endSession !== null &&
              block.startDate === block.endDate &&
              block.startSession === block.endSession
            ) {
              newLogWork = 0.5;
            } else if (
              block.startDate !== null &&
              block.endDate !== null &&
              block.startSession !== null &&
              block.endSession !== null &&
              block.startDate === block.endDate &&
              block.startSession !== block.endSession
            ) {
              newLogWork = 1;
            } else if (
              block.startDate !== null &&
              block.endDate !== null &&
              block.startSession !== null &&
              block.endSession !== null &&
              block.startSession &&
              block.endSession
            ) {
              newLogWork = newLogWork && newLogWork + 0.5;
            }
            return { ...block, logWork: newLogWork };
          }
          return block;
        }),
      );
    }
  }, [isCheckTotalDate]);

  useEffect(() => {
    const arrFullDay: itemLogWorkRequest[] = [];
    const arrMorning: itemLogWorkRequest[] = [];
    const arrAfternoon: itemLogWorkRequest[] = [];
    blocks.forEach((item) => {
      if (item.startDate !== item.endDate) {
        if (item.startSession === 1 && item.endSession === 2) {
          const startDateExists = arrFullDay.some((block: itemLogWorkRequest) => block.startDate === item.startDate);
          const endDateExists = arrFullDay.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!startDateExists && !endDateExists) {
            arrFullDay.push({ startDate: item.startDate, id: item.id }, { endDate: item.endDate, id: item.id });
          }
        } else if (item.startSession === 9999 && item.endSession === 2) {
          const startDayAfternoon = arrAfternoon.some(
            (block: itemLogWorkRequest) => block.startDate === item.startDate,
          );
          if (!startDayAfternoon) {
            arrAfternoon.push({ startDate: item.startDate });
            arrFullDay.push({ endDate: item.endDate, id: item.id });
          }
        } else if (item.startSession === 1 && item.endSession === 1) {
          const endDayMorning = arrAfternoon.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!endDayMorning) {
            arrMorning.push({ endDate: item.endDate, id: item.id });
            arrFullDay.push({ startDate: item.startDate, id: item.id });
          }
        } else {
          const startDayAfternoon = arrAfternoon.some(
            (block: itemLogWorkRequest) => block.startDate === item.startDate,
          );
          const endDayMorning = arrAfternoon.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!startDayAfternoon && !endDayMorning) {
            arrAfternoon.push({ startDate: item.startDate, id: item.id });
            arrMorning.push({ endDate: item.endDate, id: item.id });
          }
        }
      } else {
        if (item.startSession === 1 && item.endSession === 1) {
          const startDayMorning = arrMorning.some((block: itemLogWorkRequest) => block.startDate === item.startDate);
          const endDayMorning = arrMorning.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!startDayMorning && !endDayMorning) {
            arrMorning.push({ startDate: item.startDate, id: item.id }, { endDate: item.endDate, id: item.id });
          }
        } else if (item.startSession === 2 && item.endSession === 2) {
          const startDayAfternoon = arrAfternoon.some(
            (block: itemLogWorkRequest) => block.startDate === item.startDate,
          );
          const endDayAfternoon = arrAfternoon.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!startDayAfternoon && !endDayAfternoon) {
            arrAfternoon.push({ startDate: item.startDate, id: item.id }, { endDate: item.endDate, id: item.id });
          }
        } else {
          const startDayMorning = arrFullDay.some((block: itemLogWorkRequest) => block.startDate === item.startDate);
          const endDayAfternoon = arrFullDay.some((block: itemLogWorkRequest) => block.endDate === item.endDate);
          if (!startDayMorning && !endDayAfternoon) {
            arrFullDay.push({ startDate: item.startDate, id: item.id }, { endDate: item.endDate, id: item.id });
          }
        }
      }
    });
  }, [isCheckDate]);

  const handleAddLogWork = async () => {
    const updatedBlocksStatus = { ...blocksStatus };
    let hasMissingInfo = false;
    blocks.forEach((block: LogWorkRequest) => {
      const isMissingInfo = !block.startDate || !block.endDate || !block.startSession || !block.endSession;
      updatedBlocksStatus[block.id] = isMissingInfo;
      if (isMissingInfo) {
        hasMissingInfo = true;
      }
    });
    setBlocksStatus(updatedBlocksStatus);
    if (hasMissingInfo) {
      return;
    }
    const blocksWithoutId = blocks.map(({ ...rest }) => rest);
    const response = await createLogWorkAPI(props.id, blocksWithoutId);
    if (response) {
      setBlocks([{ id: 0, startDate: null, endDate: null, logWork: null, startSession: 1, endSession: 2 }]);
      props.status(!props.update);
      handleClose();
    }
  };

  const handleCloseModal = () => {
    setBlocks([{ id: 0, startDate: null, endDate: null, logWork: null, startSession: null, endSession: null }]);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Đăng ký
      </Button>
      <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký Logwork : {props.taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-4 border p-4" style={{ zIndex: 2 }}>
            <div>
              <div>
                {blocks.map((block: LogWorkRequest, index: number) => {
                  return (
                    <div key={index} className="border p-4 mb-4">
                      <p>Ngày bổ sung công</p>
                      <Space direction="vertical" size={12}>
                        <RangePicker
                          value={
                            block.startDate && block.endDate
                              ? [dayjs(block.startDate, 'YYYY/MM/DD'), dayjs(block.endDate, 'YYYY/MM/DD')]
                              : tempRange
                          }
                          onChange={(dates: RangeValue<Dayjs>) => handleDateChange(dates, block.id)}
                          disabledDate={(current) => disabledDate(dayjs(current), block.id)}
                        />
                      </Space>
                      <div style={{ width: '290px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <p className="mt-2">Buổi ngày bắt đầu</p>
                          <select
                            name="startSession"
                            className="form-select"
                            value={block.startSession || ''}
                            onChange={(e) => handleSessionChange(e, block.id, 'start')}
                            id={`startSession-${block.id}`}
                          >
                            <option value={1}>Sáng</option>
                            <option value={2}>Chiều</option>
                          </select>
                        </div>
                        <div>
                          <p className="mt-2">Buổi ngày kết thúc</p>
                          <select
                            className="form-select"
                            name="endSession"
                            value={block.endSession || ''}
                            onChange={(e) => handleSessionChange(e, block.id, 'end')}
                            id={`endSession-${block.id}`}
                          >
                            <option value={1}>Sáng</option>
                            <option value={2}>Chiều</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2">Tổng số công</p>
                      <input
                        disabled
                        style={{ width: '290px' }}
                        value={`${(block.startDate !== null && block.logWork) || ''}`}
                        type="text"
                      />
                      <div className="mt-2">
                        {blocks.length > 1 && (
                          <button className="btn btn-danger" onClick={() => handleRemoveBlock(block.id)}>
                            Xóa
                          </button>
                        )}
                      </div>
                      <i style={{ color: 'red' }}>{blocksStatus[block.id] ? 'Bạn chưa chọn đầy đủ' : null}</i>
                    </div>
                  );
                })}
                {blocks.length < limit && (
                  <button className="btn btn-warning" onClick={handleAddBlock}>
                    Thêm
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddLogWork}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogworkModal;
