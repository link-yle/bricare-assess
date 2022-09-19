<template>
  <div class="todo-item">
    <div class="item-container">
      <div class="item-text">
        <q-checkbox v-model="checkboxModel" class="checkbox" />
        <span :class="{ checked: checkboxModel }">
          {{ task.name }}
        </span>
      </div>
      <div>
        <q-chip v-for="tag in task.tags">{{ tag }}</q-chip>
      </div>
    </div>
    <q-btn
      class="icon"
      flat
      round
      color="primary"
      icon="close"
      size="md"
      aria-label="Delete"
      @click="onDelete"
    />
  </div>
  <q-separator />
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    task: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();

    const checkboxModel = computed({
      get() {
        return props.task.completed;
      },
      set() {
        store.commit('todos/toggleStatus', props.task.id);
      },
    });

    function onDelete() {
      store.commit('todos/delete', props.task.id);
    }

    return { onDelete, checkboxModel };
  },
});
</script>

<style lang="scss" scoped>
.todo-item {
  padding: 0.5rem;
  color: #fff;
  margin: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .checkbox {
    margin-right: 1rem;
  }
  .checked {
    text-decoration: line-through;
    color: var(--text-secondary);
  }
  .icon {
    cursor: pointer;
    font-size: 1.5rem;
    margin-left: 12px;
  }
}
</style>
