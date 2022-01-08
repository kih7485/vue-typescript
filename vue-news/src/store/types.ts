// store/types.ts
import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { RootState } from "./state";
import { Getters } from "./getters";

type MyMutations = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};
type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
type MyGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export type MyStore = Omit<
  Store<RootState>,
  "commit" | "dispatch" | "getters"
> &
  MyMutations &
  MyActions &
  MyGetters;
//omit은 주어진 객체에서 주어진 키를 제외한 객체를 반환합니다.
