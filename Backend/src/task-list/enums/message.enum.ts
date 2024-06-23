export enum TaskListErrorMessages {
  InvalidDateFormat = 'ngày bắt đầu và ngày kết thúc phải đúng định dạng trong lịch',
  DateOutOfRange = 'Ngày bắt đầu và ngày kết thúc phải trong khoảng từ 01/01/1990 đến 31/12/2100',
  StartAfterEnd = 'Ngày bắt đầu không được sau ngày kết thúc',
  TaskNotRegistered = 'Công việc không đăng ký',
  TaskExits = 'công việc và ngày bắt đầu đã được đăng ký trước đó vui lòng chọn ngày khác để tiếp tục đăng ký công việc',
  UserNotFound = 'user không tồn tại',
  TaskNotFound = 'Công việc không tồn tại',
  SortNotFound = 'Sort không tìm thấy',
}

export enum TaskListSuccess {
  CreateTaskListSuccess = 'Công việc đăng ký thành công',
  UpdateTaskListSuccess = 'Cập nhật công việc thành công',
}

export enum DateRange {
  MinDate = '01/01/1990',
  MaxDate = '31/12/2100',
}
