import {observable, action, makeObservable} from 'mobx';
import {Auth} from '../models';

class AuthStore {
  // 修复 mobx 版本6 的 bug
  constructor() {
    makeObservable(this)
  }
  // 状态
  @observable values = {
    username: '',
    password: ''
  };

  // 行为，用于改变状态
  @action setIsLogin(isLogin) {
    this.isLogin = isLogin;
  }

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          console.log('登录成功');
          resolve(user);
        }).catch(err => {
          console.log('登录失败');
          reject(err);
      })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          console.log('注册成功');
          resolve(user);
        }).catch(err => {
        console.log('注册失败');
        reject(err);
      })
    })
  }

  @action logout(){
    Auth.logout()
  }
}

export { AuthStore };