import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegistrationTasks.scss';
import { GetTaskResponse } from '../../apis/task/response/get-task.response';
import { taskName } from '../../store/reducers/name-task.slice';
import { IdPropSelectTask, TaskName } from '../../types/registration-task/registration-task.type';
import { RootStateTaskList } from '../../types/task-list/task-list.type';
import { Tooltip } from 'antd';

const SelectTask = (props: IdPropSelectTask) => {
  const taskList: TaskName[] | null = props.taskList;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<GetTaskResponse | null>();
  const [filteredTaskName, setFilteredTaskName] = useState<TaskName[]|null|undefined>(taskList);
  const taskEditFromListTask = useSelector((state: RootStateTaskList) => state.taskListReducer.task);
  const typeEdit = useSelector((state: RootStateTaskList) => state.taskListReducer.type);
  const selectTaskRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickOutside = (event: MouseEvent) => {
    if (selectTaskRef.current && !selectTaskRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: GetTaskResponse) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm('');
    dispatch(taskName({ option, id: props.id }));
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const searchResult = filteredTaskName?.filter((item: TaskName) => {
      return item?.taskName?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
    if (searchTerm?.length === 0) {
      setFilteredTaskName(taskList);
    } else {
      setFilteredTaskName(searchResult);
    }
  }, [searchTerm, taskEditFromListTask, selectedOption, typeEdit, props.taskList]);

  useEffect(() => {
    if (typeEdit == 'EDIT') {
      setSelectedOption({
        id: taskEditFromListTask?.task?.id,
        taskName: taskEditFromListTask?.task?.taskName,
        createdAt: taskEditFromListTask?.task?.createdAt,
        updatedAt: taskEditFromListTask?.task?.updatedAt,
      });
    }
  }, []);

  return (
    <div className="custom-select" ref={selectTaskRef}>
      <div className="custom-select__header" onClick={() => setIsOpen(true)}>
        {selectedOption ? (
          <input
            className="custom-select__header-input"
            type="text"
            value={selectedOption?.taskName}
            onChange={(e) => {
              setSelectedOption({ ...selectedOption, taskName: e.target.value });
              if (!e.target.value) {
                setSelectedOption(null);
              }
            }}
          />
        ) : (
          <input
            className="custom-select__header-input"
            type="text"
            placeholder="Tên công việc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      {isOpen && (
        <div className="custom-select__selected">
          {filteredTaskName ? (
            filteredTaskName?.map((option: TaskName) => (
              <div key={option?.id} className="custom-select__selected-option">
                <Tooltip placement="bottom" title={option?.taskName}>
                  <span className="custom-select__selected-option-tooltip">{option?.taskName}</span>
                </Tooltip>
                <button onClick={() => handleSelect(option)}>Select</button>
              </div>
            ))
          ) : (
            <div>Không có công việc</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectTask;
