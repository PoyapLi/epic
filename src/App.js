import React, {Suspense, lazy} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from "./components/Loading";

import {
  Switch,
  Route,
} from 'react-router-dom';

// import Home from './pages/Home';
// import History from "./pages/History";
// import About from "./pages/About";

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));


function App() {
  return (
    <>
      <Header/>
      <main>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {/*如果不加 exact 参数，任何路由都是首页了*/}
            <Route path="/" exact component={Home}/>
            <Route path="/history" component={History}/>
            <Route path="/about" exact component={About}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
          </Switch>
        </Suspense>
      </main>

      <Footer/>
    </>
  );
}

export default App;
