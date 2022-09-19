import { computed } from 'vue';
import { useStore } from 'vuex';

export function useTodoList() {
  const store = useStore();

  const todos = computed(() => {
    return store.getters['todos/filtered'];
  });

  const filters = computed(() => {
    return store.getters['todos/filters'];
  });

  return {
    todos,
    filters,
  };
}
