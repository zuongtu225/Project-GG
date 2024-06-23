import { createAction } from '@reduxjs/toolkit';
import { PayloadActionCreator } from '@reduxjs/toolkit/src/createAction';
import { LogworkType } from '../../types/logwork/logwork.type';

const getLogWorkAction: PayloadActionCreator<LogworkType[]> = createAction('GET_LOGWORK');

export { getLogWorkAction };
