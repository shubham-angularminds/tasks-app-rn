import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK_STATUS,
  UPDATE_TASK,
} from "./actions";

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { task } = action.payload;
      return {
        ...state,
        tasks: [...state.tasks, { ...task }],
      };
    }
    case DELETE_TASK: {
      const { id } = action.payload;
      // const newTasks = [];
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return {
        tasks: newTasks,
      };
    }

    case TOGGLE_TASK_STATUS: {
      const { id } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      return {
        tasks: updatedTasks,
      };
    }

    case UPDATE_TASK: {
      const { task } = action.payload;

      const updatedTasks = state.tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });

      return {
        tasks: updatedTasks,
      };
    }

    default:
      return state;
  }
};

export default taskReducer;
