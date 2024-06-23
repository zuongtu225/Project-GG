import { createSlice } from '@reduxjs/toolkit';

export const nameTaskSlice = createSlice({
  name: 'nameTask',
  initialState: { value: { option: { taskName: '', id: 0 }, id: 0 } },
  reducers: {
    taskName: (state, action) => {
      state.value = action.payload;
      return state;
    },
  },
  extraReducers: {},
});

export const { taskName } = nameTaskSlice.actions;
export default nameTaskSlice.reducer;
