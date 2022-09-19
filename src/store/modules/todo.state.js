import { v4 as uuidv4 } from 'uuid';
import { allTags } from '@/constants';

const state = () => ({
  all: [],
  filters: {
    filter: 'All',
    tags: allTags,
  },
});

const getters = {
  active(state) {
    return state.all.filter((task) => task.completed === false);
  },
  completed(state) {
    return state.all.filter((task) => task.completed === true);
  },
  filters(state) {
    return state.filters;
  },
  filtered(state) {
    return state.all.filter((task) => {
      let matches = true;

      let containsTag = false;

      if (state.filters.tags.length) {
        state.filters.tags.forEach((tag) => {
          if (task.tags?.includes(tag)) {
            containsTag = true;
          }
        });

        if (!containsTag) {
          matches = false;
        }
      }

      if (
        (state.filters.filter === 'Completed' && !task.completed) ||
        (state.filters.filter === 'Active' && task.completed)
      ) {
        matches = false;
      }

      return matches;
    });
  },
};

const actions = {};

const mutations = {
  create(state, todo) {
    state.all.push({
      id: uuidv4(),
      name: todo.name,
      tags: todo.tags,
      completed: false,
    });
  },
  toggleStatus(state, taskId) {
    const selectedTask = state.all.find((task) => task.id === taskId);
    selectedTask.completed = !selectedTask.completed;
  },
  delete(state, taskId) {
    state.all = state.all.filter((task) => task.id !== taskId);
  },
  clearCompleted(state) {
    state.all = state.all.filter((task) => task.completed === false);
  },
  setFilter(state, filters) {
    state.filters = {
      ...state.filters,
      ...filters,
    };
  },
};

export const todos = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
