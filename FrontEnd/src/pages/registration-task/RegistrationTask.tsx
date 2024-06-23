import { ChangeEvent, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import SelectTask from './SelectTask';
import moment from 'moment';
import './RegistrationTasks.scss';
import { ErrorTaskName, State, TaskEdit, TaskList, TaskName } from '../../types/registration-task/registration-task.type';
import { createRegistrationTask } from '../../apis/registrationTask/registration-task.api';
import { RootStateTaskList } from '../../types/task-list/task-list.type';
import { updateTaskList } from '../../apis/registrationTask/update-task';
import { useNavigate } from 'react-router-dom';
import { getTaskApi } from '../../apis/task/get-task.api';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { RangePickerProps } from 'antd/es/date-picker';

export const RegistrationTask = () => {
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);
  const taskEditFromListTask = useSelector((state: RootStateTaskList) => state.taskListReducer.task);
  const typeEdit = useSelector((state: RootStateTaskList) => state.taskListReducer.type);
  const [filteredOptions, setFilteredOptions] = useState<TaskName[] | null>(null);
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  const taskEdit = {
    id: taskEditFromListTask.id,
    userId: 1,
    idComponent: 1,
    taskId: taskEditFromListTask.taskId,
    sessionStart: taskEditFromListTask.sessionStart,
    sessionEnd: taskEditFromListTask.sessionEnd,
    workDay: taskEditFromListTask.workDay,
    dateStart: dayjs(moment(taskEditFromListTask?.dateStart, 'YYYY-MM-DD').toDate()),
    dateEnd: dayjs(moment(taskEditFromListTask?.dateEnd, 'YYYY-MM-DD').toDate()),
  };

  const taskName = useSelector((state: State) => state.nameTask);
  const id: number = taskName.value.id;
  const [taskEditState, setTaskEditState] = useState<TaskEdit>(taskEdit);
  const [numTasksArray, setNumTasksArray] = useState<TaskList[]>([
    {
      idComponent: 1,
      taskId: undefined,
      dateStart: null,
      dateEnd: null,
      sessionStart: 1,
      sessionEnd: 2,
      workDay: 0,
    },
  ]);

  const [errors, setErrors] = useState<ErrorTaskName[]>([]);

  const differenceDayss = (endDate: Dayjs | null, startDate: Dayjs | null) => {
    if (endDate != null && startDate != null) {
      const oneDay = 24 * 60 * 60 * 1000;
      const endDateTime = endDate.toDate().getTime();
      const startDateTime = startDate.toDate().getTime();
      const differenceDays = Math.round((endDateTime - startDateTime) / oneDay);
      return differenceDays;
    }
    return 0;
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  useEffect(() => {
    getTaskApi().then((resolve) => setFilteredOptions(resolve));
  }, []);

  useEffect(() => {
    numTasksArray.length == 5 || typeEdit == 'EDIT' ? setIsDisabledBtn(true) : setIsDisabledBtn(false);
    if (typeEdit == 'EDIT') {
      const changeTaskNameTaskUpdate = () => {
        const newTask = {
          ...taskEditState,
          taskId: taskName?.value?.option?.id,
        };
        setTaskEditState(newTask);
      };
      changeTaskNameTaskUpdate();
    }

    const updatedTasksArray = () => {
      const array = numTasksArray?.map((item: TaskList) => {
        if (item?.idComponent == id) {
          return { ...item, taskId: taskName?.value?.option?.id };
        }
        return item;
      });
      setNumTasksArray(array);
    };

    updatedTasksArray();
  }, [taskName, numTasksArray.length]);

  const handleDeleteComponent = (id: number) => {
    const newData = numTasksArray.filter((item) => item?.idComponent !== id);
    setNumTasksArray(newData);
  };

  const handleAddComponent = () => {
    const maxId = numTasksArray.length;
    const newTaskList = {
      idComponent: maxId + 1,
      taskId: undefined,
      dateStart: null,
      dateEnd: null,
      sessionStart: 1,
      sessionEnd: 2,
      workDay: 0,
    };
    setNumTasksArray((prev) => [...prev, newTaskList]);
  };

  const handleChangeDates = (dates: RangeValue<Dayjs> | null, id: number) => {
    const dateEnd = dates?.[1] || null;
    const dateStart = dates?.[0] || null;
    const distanceDay = differenceDayss(dateEnd, dateStart);
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      handleChangeTimeStart(item?.sessionStart, id);
      handleChangeTimeEnd(item?.sessionEnd, id);
      let effort = 0;
      if (item?.idComponent === id) {
        if (distanceDay == 0) {
          const timeEnd = distanceDay == 0 && item?.sessionStart == 2 ? 2 : item?.sessionEnd;
          effort = item?.sessionStart == 1 && item?.sessionEnd == 2 ? distanceDay + 1 : distanceDay + 0.5;
          return { ...item, dateStart: dateStart, dateEnd: dateEnd, workDay: effort, sessionEnd: timeEnd };
        }
        if (distanceDay != 0) {
          if (item?.sessionStart == 1 && item?.sessionEnd == 1) {
            effort = distanceDay + 0.5;
          } else if (item?.sessionStart == 1 && item?.sessionEnd == 2) {
            effort = distanceDay + 1;
          } else if (item?.sessionStart == 2 && item?.sessionEnd == 1) {
            effort = distanceDay;
          } else if (item?.sessionStart == 2 && item?.sessionEnd == 2) {
            effort = distanceDay + 0.5;
          }
          return { ...item, dateStart: dateStart, dateEnd: dateEnd, workDay: effort };
        }
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };

  const changeDateUpdateTask = (dates: RangeValue<Dayjs> | null) => {
    const end = dates?.[1] || null;
    const start = dates?.[0] || null;
    let timeEnd = taskEditState?.sessionEnd;
    const distanceDay = differenceDayss(end, start);
    let effort = 0;
    if (distanceDay == 0) {
      if (taskEditState?.sessionStart == 2) {
        timeEnd = 2;
      }
      effort = taskEditState?.sessionStart == 1 && taskEditState?.sessionEnd == 2 ? 1 : 0.5;
      setTaskEditState((pre) => ({ ...pre, dateStart: start, dateEnd: end, sessionEnd: timeEnd, workDay: effort }));
    }
    if (distanceDay != 0) {
      if (taskEditState?.sessionStart == 1 && taskEditState?.sessionEnd == 1) {
        effort = distanceDay + 0.5;
      } else if (taskEditState?.sessionStart == 1 && taskEditState?.sessionEnd == 2) {
        effort = distanceDay + 1;
      } else if (taskEditState?.sessionStart == 2 && taskEditState?.sessionEnd == 1) {
        effort = distanceDay;
      } else if (taskEditState?.sessionStart == 2 && taskEditState?.sessionEnd == 2) {
        effort = distanceDay + 0.5;
      }
      setTaskEditState((pre) => ({ ...pre, dateStart: start, dateEnd: end, workDay: effort }));
    }
  };

  const handleChangeTimeStart = (time: number, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const distanceDay = differenceDayss(item?.dateEnd, item?.dateStart);
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
        let effort: number = 0;
        if (distanceDay == 0 && time == 2) {
          effort = distanceDay + 0.5;
          return {
            ...item,
            sessionStart: time,
            sessionEnd: 2,
            workDay: effort,
          };
        } else if (distanceDay == 0 && time == 1) {
          effort = item?.sessionEnd == 2 ? distanceDay + 1 : distanceDay + 0.5;
          return { ...item, sessionStart: time, workDay: effort };
        } else if (
          (distanceDay != 0 && time == 1 && item?.sessionEnd == 1) ||
          (distanceDay != 0 && time == 2 && item?.sessionEnd == 2)
        ) {
          effort = distanceDay + 0.5;
          return { ...item, sessionStart: time, workDay: effort };
        } else if (distanceDay != 0 && time == 1 && item?.sessionEnd == 2) {
          effort = distanceDay + 1;
          return { ...item, sessionStart: time, workDay: effort };
        } else if (distanceDay != 0 && time == 2 && item?.sessionEnd == 1) {
          effort = distanceDay;
          return { ...item, sessionStart: time, workDay: effort };
        }
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };

  const changeTimeStartTaskUpdate = (time: number) => {
    const distanceDay = differenceDayss(taskEditState?.dateEnd, taskEditState?.dateStart);
    let effort: number = 0;
    if (distanceDay == 0) {
      const timeEnd = distanceDay == 0 && time == 2 ? 2 : taskEditState?.sessionEnd;
      effort = time == 1 && taskEditState?.sessionEnd == 2 ? distanceDay + 1 : distanceDay + 0.5;
      setTaskEditState((pre) => ({ ...pre, sessionStart: time, sessionEnd: timeEnd, workDay: effort }));
    } else if (
      (distanceDay != 0 && time == 1 && taskEditState?.sessionEnd == 1) ||
      (distanceDay != 0 && time == 2 && taskEditState?.sessionEnd == 2)
    ) {
      effort = distanceDay + 0.5;
      setTaskEditState((pre) => ({ ...pre, sessionStart: time, workDay: effort }));
    } else if (distanceDay != 0 && time == 1 && taskEditState?.sessionEnd == 2) {
      effort = distanceDay + 1;
      setTaskEditState((pre) => ({ ...pre, sessionStart: time, workDay: effort }));
    } else if (distanceDay != 0 && time == 2 && taskEditState?.sessionEnd == 1) {
      effort = distanceDay;
      setTaskEditState((pre) => ({ ...pre, sessionStart: time, workDay: effort }));
    }
  };

  const handleChangeTimeEnd = (time: number, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const distanceDay = differenceDayss(item?.dateEnd, item?.dateStart);
      let effort: number = 0;
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
        if (distanceDay != 0 && item?.sessionStart == 2 && time == 1) {
          effort = distanceDay;
          return { ...item, sessionEnd: time, workDay: effort };
        }
        const timeEnd = distanceDay == 0 && item?.sessionStart == 2 ? 2 : time;
        effort = item?.sessionStart == 1 && timeEnd == 2 ? distanceDay + 1 : distanceDay + 0.5;
        return { ...item, sessionEnd: timeEnd, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };

  const changeTimeEndTaskUpdate = (time: number) => {
    const distanceDay = differenceDayss(taskEditState?.dateEnd, taskEditState?.dateStart);
    let effort: number = 0;
    if (distanceDay == 0) {
      if (taskEditState?.sessionStart == 2) {
        setTaskEditState((pre) => ({ ...pre, sessionEnd: 2, workDay: 0.5 }));
      } else {
        effort = time == 2 && taskEditState?.sessionStart == 1 ? distanceDay + 1 : distanceDay + 0.5;
        setTaskEditState((pre) => ({ ...pre, sessionEnd: time, workDay: effort }));
      }
    }
    if (
      (distanceDay != 0 && time == 1 && taskEditState?.sessionStart == 1) ||
      (distanceDay != 0 && time == 2 && taskEditState?.sessionStart == 2)
    ) {
      effort = distanceDay + 0.5;
      setTaskEditState((pre) => ({ ...pre, sessionEnd: time, workDay: effort }));
    } else if (time == 1 && taskEditState?.sessionStart == 2) {
      effort = distanceDay;
      setTaskEditState((pre) => ({ ...pre, sessionEnd: time, workDay: effort }));
    } else if (time == 2 && taskEditState?.sessionStart == 1) {
      effort = distanceDay + 1;
      setTaskEditState((pre) => ({ ...pre, sessionEnd: time, workDay: effort }));
    }
  };

  const handleTaskRegistration = () => {
    const newErrors: ErrorTaskName[] = [];
    if (typeEdit == 'EDIT') {
      const updateTask = {
        userId: 1,
        taskId: taskEditState.taskId,
        dateStart: dayjs(taskEditState.dateStart).format('DD/MM/YYYY'),
        dateEnd: dayjs(taskEditState.dateEnd).format('DD/MM/YYYY'),
        sessionStart: taskEditState.sessionStart,
        sessionEnd: taskEditState.sessionEnd,
        workDay: taskEditState.workDay,
      };
      updateTaskList(updateTask, taskEditState.id);
      navigate('/task/information');
    } else {
      const newArray = numTasksArray.map((item) => {
        if (item?.taskId == undefined) {
          const error = { msg: 'Vui lòng chọn tên công việc', id: item?.idComponent };
          newErrors.push(error);
          return null;
        } else {
          const formattedItem = {
            ...item,
            userId: 1,
            dateStart: item?.dateStart?.format('DD/MM/YYYY'),
            dateEnd: item?.dateEnd?.format('DD/MM/YYYY'),
          };
          formattedItem;
          return formattedItem;
        }
      });
      setErrors(newErrors);
      if (newArray.some((item) => item === null)) {
        console.log('Vui lòng điền thông tin công việc.');
        return;
      } else {
        createRegistrationTask(newArray);
        navigate('/task/information');
      }
    }
  };

  return (
    <>
      <h3 className="title-signup-task">{typeEdit == 'EDIT' ? `Chỉnh sửa công việc` : `Đăng ký công việc `}</h3>
      {typeEdit == 'EDIT' ? (
        <div className="signup-task-container">
          <div className="signup-task-container__content">
            <div>
              <p>Tên công việc </p>
              <div>
                <SelectTask taskList={filteredOptions} id={taskEditState?.idComponent} />
              </div>
            </div>
            <RangePicker
              disabledDate={disabledDate}
              defaultValue={[taskEdit?.dateStart, taskEdit?.dateEnd]}
              onChange={(dates: RangeValue<Dayjs>) => {
                changeDateUpdateTask(dates);
              }}
            />
            <div className="signup-task-container__content-timepicker">
              <div>
                <p>Ngày bắt đầu</p>

                <select
                  className="time"
                  value={taskEditState?.sessionStart}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => changeTimeStartTaskUpdate(Number(e.target.value))}
                >
                  <option value="1">Sáng</option>
                  <option value="2">Chiều</option>
                </select>
              </div>
              <div>
                <p>Ngày kết thúc</p>

                <select
                  className="time"
                  value={taskEditState?.sessionEnd}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => changeTimeEndTaskUpdate(Number(e.target.value))}
                >
                  <option value="1">Sáng</option>
                  <option value="2">Chiều</option>
                </select>
              </div>
            </div>

            <div className="signup-task-container__content-effort">
              <span>Công số</span> <input disabled type="text" value={taskEditState?.workDay} />
            </div>
          </div>
          <button
            disabled={numTasksArray.length == 1}
            onClick={() => handleDeleteComponent(taskEditState?.idComponent)}
            className="signup-task-container__btn-delete-component"
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <>
          {numTasksArray?.map((item: TaskList) => {
            const error = errors.find((err) => err.id === item?.idComponent);
            return (
              <div key={item.idComponent} className="signup-task-container">
                <div className="signup-task-container__content">
                  <div>
                    <p>Tên công việc </p>
                    <div>
                      <SelectTask taskList={filteredOptions} id={item?.idComponent} />
                    </div>
                    <p className="signup-task-container__content-error" key={error?.id}>
                      {error ? error?.msg : ''}
                    </p>
                  </div>
                  <RangePicker
                    disabledDate={disabledDate}
                    onChange={(dates: RangeValue<Dayjs>) => {
                      handleChangeDates(dates, item?.idComponent);
                    }}
                  />
                  <div className="signup-task-container__content-timepicker">
                    <div>
                      <p>Ngày bắt đầu</p>
                      <select
                        className="time"
                        value={item?.sessionStart}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleChangeTimeStart(Number(e.target.value), item?.idComponent)
                        }
                        name=""
                        id=""
                      >
                        <option value="1">Sáng</option>
                        <option value="2">Chiều</option>
                      </select>
                    </div>

                    <div>
                      <p>Ngày kết thúc</p>
                      <div>
                        <select
                          className="time"
                          value={item?.sessionEnd}
                          name=""
                          id=""
                          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleChangeTimeEnd(Number(e.target.value), item?.idComponent)
                          }
                        >
                          <option value="2">Chiều</option>
                          <option value="1">Sáng</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="signup-task-container__content-effort">
                    <span>Công số</span> <input disabled type="text" value={item?.workDay} />
                  </div>
                </div>
                <button
                  disabled={numTasksArray.length == 1}
                  onClick={() => handleDeleteComponent(item?.idComponent)}
                  className="signup-task-container__btn-delete-component"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </>
      )}

      <div className="btn-signup-task-group">
        <button onClick={handleTaskRegistration} className="btn-signup-task">
          {typeEdit == 'EDIT' ? `Chỉnh sửa` : `Đăng ký`}
        </button>
        <button
          disabled={numTasksArray.length == 5 || typeEdit == 'EDIT'}
          onClick={handleAddComponent}
          className={`btn-signup-task ${isDisabledBtn ? 'disabled-btn-signup-task' : ''}`}
        >
          Thêm
        </button>
      </div>
    </>
  );
};
