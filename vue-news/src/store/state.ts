import { NewsItem } from "@/api";

const state = {
  news: [] as NewsItem[],
};
//state의 값은 mutations 에서 바꿔주어야 한다.

//node_modules/vuex/types/vue.d.ts
type RootState = typeof state;

export { state, RootState };
