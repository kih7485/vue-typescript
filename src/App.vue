<template>
  <div>
    <header>
       <h1>Vue Todo with Typescript</h1>
    </header>
   <main>
     <TodoInput :item="todoText" @input="updateTodoText" @add="addTodoItem"></TodoInput> 
     <div>
       <ul>
         <TodoListItem v-for="(todoItem, index) in todoItems" :key="index" :index="index" :todoItem="todoItem" @remove="removeTodoItem" @toggle="toggleTodoItemComplete"></TodoListItem>
       </ul>
     </div>
   </main>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-list-v1";
const storage = {
  save(todoItems: Todo[]) : void{ 
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): Todo[]{
    const todoItems = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const result = JSON.parse(todoItems);

    return result;
  }
}
export interface Todo{
   title: string;
   done: boolean;
}
export default Vue.extend({
  components: {
    TodoInput,
    TodoListItem
  },
  data(){
    return {
      todoText: "",
      todoItems: [] as Todo[] 
    };
  },
  methods: {
    updateTodoText(text: string) {
      this.todoText = text;
    },
    addTodoItem(){
      const text = this.todoText;
      const todo: Todo = {
        title: text,
        done: false
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      // localStorage.setItem(text, text); 
      this.initTodoText();
    },
    initTodoText(){
      this.todoText = ""
    },
    fetchTodoItems(){ 
       this.todoItems = storage.fetch().sort((a,b) => {
         if(a.title < b.title) { return -1 }
         if(a.title > b.title) { return 1 }
         return 0;
       }) ;
    },
    toggleTodoItemComplete(todoItem: Todo,index: number){
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done
      });
      storage.save(this.todoItems);
    },
    removeTodoItem(index: number){ 
      console.log("remove", index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    }
  },
  created(){
    this.fetchTodoItems();
  }
});
</script>

<style scoped></style>
