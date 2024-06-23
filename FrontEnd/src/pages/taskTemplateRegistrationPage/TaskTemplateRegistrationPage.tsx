import React, { useState, useEffect } from 'react';
import styles from './TaskTemplateRegistrationPage.module.scss';
import { createTaskApi, getTaskApi } from '../../apis/task/index.api';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListAction } from '../../store/actions/task.action';
import { AppState } from '../../store';
import { message } from 'antd';
import { GetTaskResponse } from '../../apis/task/response/get-task.response';

function TaskTemplateRegistrationPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.taskReducer);
  const [taskName, setTaskName] = useState('');
  const [showMainRight, setShowMainRight] = useState(false);
  const [displaySearch, setDisplaySearch] = useState<GetTaskResponse[]>([]);
  const [createTaskSuccess, setCreateTaskSuccess] = useState(false);
  const [isCheckLength, setIsCheckLength] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    handleGetApi();
  }, []);

  useEffect(() => {
    if (createTaskSuccess) {
      handleGetApi();
      setCreateTaskSuccess(false);
    }
  }, [createTaskSuccess]);

  const handleGetApi = async () => {
    try {
      const response = await getTaskApi();
      dispatch(getTaskListAction(response.data));
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsEmpty(false);
    if (value.length > 30) {
      setIsDuplicate(false);
      return setIsCheckLength(true);
    }
    if (value.length === 0) {
      setIsDuplicate(false);
    }
    setIsCheckLength(false);
    setTaskName(value);
    const data = tasks.filter((item) => item.taskName.toLowerCase().includes(value.toLowerCase()));
    const slicedData = data.length > 0 ? data.slice(0, 3) : [];
    setDisplaySearch(slicedData);
    setShowMainRight(value.length > 0);
  };

  const handleCreateTask = async () => {
    const itemTask = tasks?.find((item) => item.taskName === taskName);
    if (!itemTask) {
      if (taskName.length === 0) {
        setIsDuplicate(false);
        return setIsEmpty(true);
      }
      try {
        await createTaskApi({ taskName });
        setTaskName('');
        setCreateTaskSuccess(true);
        message.success('Tạo công việc thành công');
        setShowMainRight(false);
        return setIsDuplicate(false);
      } catch (error) {
        message.error('Lỗi khi tạo công việc');
      }
    }
    return setIsDuplicate(true);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      const startIndex = displaySearch.length;

      const newData = tasks
        .filter((item) => item.taskName.toLowerCase().includes(taskName.toLowerCase()))
        .slice(startIndex, startIndex + 3);

      setDisplaySearch((prevItems) => {
        const mergedData = [...prevItems];

        for (let i = 0; i < newData.length; i++) {
          const existingIndex = mergedData.findIndex((item) => item.id === newData[i].id);

          if (existingIndex === -1) {
            mergedData.push(newData[i]);
          }
        }

        return mergedData;
      });
    }, 500);
  };

  const handleScroll = () => {
    const container = document.getElementById('mainRightContainer');

    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchMoreData();
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById('mainRightContainer');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [displaySearch]);

  return (
    <div className="p-4">
      <h1 className="text-center mr-2">Task template</h1>
      <div className="content border p-4">
        <p>Tên công việc:</p>
        <input className="w-100 btn-template" type="text" value={taskName} onChange={handleInputChange} />
        <div className={`${styles['main']} d-flex`}>
          <div className={`${styles['main__left']}`}>
            {isCheckLength && <i className="text-danger d-block">Không được quá 30 ký tự</i>}
            {isDuplicate && <i className="text-danger d-block">Trùng công việc</i>}
            {isEmpty && <i className="text-danger d-block">Vui lòng nhập ký tự</i>}
            <button type="button" className="btn btn-success mt-3" onClick={handleCreateTask}>
              Đăng kí
            </button>
          </div>
          {showMainRight && displaySearch.length > 0 && (
            <div className={`${styles['main-right']}`} id="mainRightContainer">
              {displaySearch.map((item: GetTaskResponse) => (
                <div key={item.id} className={`${styles['item-search']} flex gap-2 p-3 items-center`}>
                  <p id="name-search">{item.taskName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskTemplateRegistrationPage;
