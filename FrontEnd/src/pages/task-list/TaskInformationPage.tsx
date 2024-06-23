import {
  addTypeTaskAction,
  editTypeTaskAction,
  getTaskListByUserLoginAction,
  handleEditTaskAction,
} from '../../store/actions/task-list.action';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { getTaskListApi, removeSortTaskListAPI, updateSortTaskListAPI } from '../../apis/task-list';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootStateTaskList, TaskListType } from '../../types/task-list/task-list.type';
import { useNavigate } from 'react-router-dom';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { RiDeleteBinLine } from 'react-icons/ri';
import { SlControlPause } from 'react-icons/sl';
import './TaskInformationPage.scss';

function TaskInformationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskListData = useSelector((state: RootStateTaskList) => state.taskListReducer.taskList);
  const [isShowOption, setIsShowOption] = useState<boolean>(false);
  const [items, setItems] = useState<TaskListType[]>([]);
  const [idTask, setIdTask] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;
  const userId = 1; //TODO

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sortDragIndex = result.source.index;
    const sortDropIndex = result.destination.index;
    const taskDrag = items[sortDragIndex];
    const taskDrop = items[sortDropIndex];
    const newSortOder = {
      taskDragId: taskDrag?.id,
      taskDropId: taskDrop?.id,
      sortDrag: taskDrag?.sort,
      sortDrog: taskDrop?.sort,
    };
    if (taskDrag.id !== taskDrop.id) {
      await updateSortTaskListAPI(newSortOder);
      handleGetTaskList();
    }
  };

  const handleGetTaskList = async () => {
    const response = await getTaskListApi(userId, items.length, 0);
    dispatch(getTaskListByUserLoginAction(response));
  };

  const fetchMoreData = async () => {
    setOffset(offset + limit);
    const response = await getTaskListApi(userId, limit, offset);
    dispatch(getTaskListByUserLoginAction(response));
  };

  useEffect(() => {
    const taskLists = taskListData?.filter((item: TaskListType) => item.isActive?.data[0] == 1);
    if (taskListData.length === 0) {
      fetchMoreData();
    } else {
      const taskListId = Math.max(...taskListData?.map((item) => item.id));
      const isExistTask = items?.find((item) => item.id == taskListId);
      if (isExistTask) {
        setItems(taskLists);
        return;
      }
      setTimeout(() => {
        setItems(items.concat(taskLists));
      }, 1500);
    }
  }, [taskListData]);

  const handleRegistrationTask = () => {
    dispatch(addTypeTaskAction('ADD'));
    navigate('/task-list/registration');
  };
  const handleEditTask = (item: TaskListType) => {
    dispatch(handleEditTaskAction(item));
    dispatch(editTypeTaskAction('EDIT'));
    navigate('/task-list/registration');
  };

  const handleRightClick = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsShowOption(!isShowOption);
    setIdTask(id);
  };

  const removeSort = async (idTask: number) => {
    await removeSortTaskListAPI(idTask);
    setIsShowOption(false);
    handleGetTaskList();
  };

  return (
    <div className="task-list">
      <div className="task-list__header">
        <h1>List thông tin công việc</h1>
        <button onClick={handleRegistrationTask}>Đăng ký công việc</button>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={''}
        endMessage={''}
        style={{ overflow: 'red' }}
      >
        <table className="task-list__table">
          <thead>
            <tr>
              <th></th>
              <th>Tên công việc</th>
              <th>Thời gian bắt đầu</th>
              <th>Sáng/Chiều</th>
              <th>Thời gian kết thúc</th>
              <th>Sáng/Chiều</th>
              <th>Số công</th>
              <th></th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items?.map((item: TaskListType, index: number) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <tr
                          onContextMenu={(e) => handleRightClick(item.id, e)}
                          ref={provided.innerRef}
                          key={index}
                          {...provided.draggableProps}
                        >
                          <td {...provided.dragHandleProps}>
                            <SlControlPause className="icon-control" />
                          </td>
                          <td>
                            <div
                              className={
                                idTask == item.id && isShowOption
                                  ? 'task-list__table__option'
                                  : 'task-list__table__option--hidden'
                              }
                            >
                              <div
                                className="task-list__table__option--child"
                                onClick={() => navigate(`/task-template/logwork_detail/${item.taskId}`)}
                              >
                                <p></p>
                                <h4>Đăng kí logwork</h4>
                                <LiaClipboardListSolid className="icon-option" />
                              </div>
                              <div className="task-list__table__option--child" onClick={() => removeSort(item.id)}>
                                <p></p>
                                <h4>Xoá công việc</h4>
                                <RiDeleteBinLine className="icon-option" />
                              </div>
                              <button onClick={() => setIsShowOption(false)}>Đóng</button>
                            </div>
                            {item?.task?.taskName.split(' ').join('').length > 25 ? (
                              <p className="task-list__table__tooltip">
                                {item?.task?.taskName.slice(0, 25)}...
                                <span className="task-list__table__tooltiptext">{item?.task?.taskName}</span>
                              </p>
                            ) : (
                              <p className="task-list__table__taskname">{item?.task?.taskName}</p>
                            )}
                          </td>
                          <td>{item.dateStart.split('-').reverse().join('-')}</td>
                          <td>{item.sessionStart == 1 ? 'Buổi sáng' : 'Buổi chiều'}</td>
                          <td>{item.dateEnd.split('-').reverse().join('-')}</td>
                          <td>{item.sessionEnd == 2 ? 'Buổi chiều' : 'Buổi sáng'}</td>
                          <td>{item.workDay}</td>
                          <td>
                            <button className="task-list__table__btn__edit" onClick={() => handleEditTask(item)}>
                              Chỉnh sửa
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </InfiniteScroll> 
    </div>
  );
}
export default TaskInformationPage;
