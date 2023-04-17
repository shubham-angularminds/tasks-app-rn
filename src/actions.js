export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK_STATUS = "TOGGLE_TASK_STATUS";
export const UPDATE_TASK = "UPDATE_TASK";

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: {
    task,
  },
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: {
    id,
  },
});

export const toggleTaskStatus = (id) => ({
  type: TOGGLE_TASK_STATUS,
  payload: {
    id,
  },
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: {
    task,
  },
});
