import React, {useRef} from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';

// 函数组件作为 observer 参数返回一个新的组件
const Component = observer(()=>{
  const { AuthStore } = useStores();
  const inputRef = useRef();
  const bindChange = e =>{
    console.log(inputRef.current.value);
    AuthStore.setUsername(inputRef.current.value)
  }

  return (
    <>
      <h1>Login:{AuthStore.values.username}</h1>
      <input onChange={bindChange} ref={inputRef}/>
    </>
  )
})

export default Component;