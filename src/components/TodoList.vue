<template>
  <div class="todo-list">
    <TodoInput class="col-8" :allTags="allTags" />
    <div class="row tags-container">
      <q-select
        class="col-12"
        bg-color="grey-1"
        v-model="filters.tags"
        borderless
        :options="allTags"
        multiple
        use-chips
        stack-label
        label="Filter by tags"
        @update:model-value="(tags) => setFilters({ tags })"
      />
    </div>
    <div class="list-container">
      <TodoItem v-for="todo in todos" :key="todo.id" :task="todo" />
    </div>
    <div class="footer">
      <span>{{ taskLeft }} left</span>
      <div class="filter-buttons">
        <button
          v-for="filterType in filterTypes"
          :key="filterType"
          :class="{ active: filters.filter === filterType }"
          @click="setFilters({ filter: filterType })"
        >
          {{ filterType }}
        </button>
      </div>

      <button @click="clearCompleted">Clear completed</button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useTodoList } from '@/composables/useTodoList';
import { useQuasar } from 'quasar';
import TodoInput from '@/components/TodoInput.vue';
import TodoItem from '@/components/TodoItem.vue';
import { allTags } from '@/constants';

export default defineComponent({
  components: { TodoInput, TodoItem },
  setup() {
    const store = useStore();
    const { todos, filters } = useTodoList();
    const $q = useQuasar();

    const taskLeft = computed(() => {
      return store.getters['todos/active'].length;
    });

    const clearCompleted = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'Would you like to clear completed tasks',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        store.commit('todos/clearCompleted');
      });
    };

    const setFilters = (value) => {
      store.commit('todos/setFilter', value);
    };

    return {
      allTags,
      todos,
      filters,
      taskLeft,
      filterTypes: ['All', 'Active', 'Completed'],
      setFilters,
      clearCompleted,
    };
  },
});
</script>

<style lang="scss">
.todo-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 80vh;
  display: flex;
  flex-direction: column;

  .tags-container {
    background: var(--todo-bg-color);
    padding: 1rem;
  }

  .list-container {
    flex-grow: 1;
    overflow: auto;
    background: var(--todo-bg-color);
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
  }

  .footer {
    background: var(--todo-bg-color);
    display: flex;
    padding: 1rem;
    align-items: center;
    color: var(--text-secondary);

    button {
      background: none;
      border: none;
      color: inherit;
      margin-right: 1rem;
      cursor: pointer;
    }

    .filter-buttons {
      margin-left: 3rem;
      flex-grow: 1;

      button.active {
        color: #3bd1f2;
      }
    }
  }
}
</style>
