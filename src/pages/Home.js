import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import Uploader from '../components/Uploader';
import Tips from '../components/Tips';

const Home = observer (() => {
  const {UserStore} = useStores();

  const User = () => <div>您好，{UserStore.currentUser.attributes.username}阁下</div>

    return (
      // 这是 React.Fragment 标签的简写
      <>
        <Tips>请先登录！</Tips>
        <Uploader />
      </>
    )
})

export default Home;