import React,{createContext, useContext} from "react";
import {AuthStore} from "./auth";

const context = createContext({
  // 导出的 AuthStore 是 class，需要 new 变成一个对象
  AuthStore: new AuthStore()
})

export const useStores = () => useContext(context)