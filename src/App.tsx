import React from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import './App.scss';
import Content from "./components/Content";


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