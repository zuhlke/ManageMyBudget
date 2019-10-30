import React from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import Content from "./components/Content";
import './App.scss';


const App: React.FC = () => {
  return (
    <div>
      <MyHeader></MyHeader>
      <Content></Content>
      <MyFooter></MyFooter>
    </div>
  );
}

export default App;