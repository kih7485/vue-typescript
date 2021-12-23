<template>
  <div>
    <h1>Vue Todo with Typescript</h1>
    <TodoInput :item="todoText" @input="updateTodoText" @add="addTodoItem"></TodoInput>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
export default Vue.extend({
  components: {
    TodoInput
  },
  data(){
    return {
      todoText: ""
    };
  },
  methods: {
    updateTodoText(text: string) {
      this.todoText = text;
    },
    addTodoItem(){
      const text = this.todoText;
      localStorage.setItem(text, text); 
      this.initTodoText();
    },
    initTodoText(){
      this.todoText = ""
    }
  }
});
</script>

<style scoped></style>
