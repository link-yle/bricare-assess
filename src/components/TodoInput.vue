<template>
  <div class="row no-wrap input-container">
    <q-input
      class="col-8"
      outlined
      clearable
      v-model="inputModel"
      name="todo"
      @keyup.enter="onAdd"
      placeholder="New todo"
      bg-color="grey-1"
      label="Task"
    />
    <q-select
      class="col-4"
      bg-color="grey-1"
      v-model="tags"
      borderless
      rounded
      :options="allTags"
      multiple
      use-chips
      stack-label
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    allTags: { type: Array, required: true },
  },
  setup() {
    const store = useStore();
    const inputModel = ref('');
    const tags = ref(['urgent']);

    const onAdd = (e) => {
      store.commit('todos/create', {
        name: inputModel.value,
        tags: tags.value,
      });
      inputModel.value = '';
      e.target.blur();
    };

    return {
      tags,
      inputModel,
      onAdd,
    };
  },
});
</script>

<style lang="scss">
.input-container {
  background: var(--todo-bg-color);
  padding: 1rem;
}
</style>
