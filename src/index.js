import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './App';
import * as serviceWorker from './serviceWorker';


{/*Cada uma de nossas tarefas contém atualmente três informações: 
seu nome, se foi verificado e seu ID exclusivo. Esses dados se 
traduzem perfeitamente em um objeto. Como temos mais de uma tarefa, 
um array de objetos funcionaria bem para representar esses dados. */}
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />  {/*A seguir, passaremos DATApara <App />como um adereço, chamado tasks. */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
