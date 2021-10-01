import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';

// 函数组件作为 observer 参数返回一个新的组件
const Component = observer(()=>{
  const { AuthStore } = useStores();
  return (
    <>
      <h1>Login:{AuthStore.values.username}</h1>
    </>
  )
})

export default Component;