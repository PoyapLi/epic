import React from 'react';
import {observer} from "mobx-react";
import {useStores} from "../stores";

const Home = observer (() => {
  const {UserStore} = useStores();

    return (
        // 这是 React.Fragment 标签的简写
        <>
          {
              UserStore.currentUser ? <>您好，{UserStore.currentUser.attributes.username} 阁下</> : '用户没有登录'
          }

        </>
    )
})

export default Home;