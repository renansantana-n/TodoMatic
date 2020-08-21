import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
//import logo from './logo.svg'; //nao está sendo usado
import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {

  const [tasks, setTasks] = useState(props.tasks); //Queremos passar props.taskspara o useState()gancho - isso preservará seu estado inicial

  const [filter, setFilter] = useState('All');

  //adicionando tarefa
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  {/*Para renderizar nosso array de objetos, temos que transformar cada um em um <Todo />componente. 
  JavaScript nos dá um método de matriz para transformar dados em outra coisa: Array.prototype.map(). */}
  //const taskList = props.tasks.map(task => <Todo />)


  //Completando uma tarefa
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // se esta tarefa tem o mesmo ID que a tarefa editada
      if (id === task.id) {
        // use propagação de objeto para fazer um novo objeto
        // cujo suporte `concluído` foi invertido
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  //excluindo uma tarefa
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }



  //editando uma tarefa
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  {/*Olhe novamente para o seu aplicativo; agora nossas tarefas parecem mais como antes, mas estão 
  faltando os nomes das próprias tarefas. Lembre-se que cada tarefa mapeamos mais tem a id, namee checked 
  propriedades que queremos passar para o nosso <Todo />component */}
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tarefas' : 'tarefa';
  const headingText = `${taskList.length} ${tasksNoun} restante`;

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask}/> 

      <div className="filters btn-group stack-exception">
      {filterList}
      </div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText} {/*chamando a funcao que conta as tarefas */}
      </h2>

       {/*O roleatributo ajuda a tecnologia assistiva a explicar que tipo de elemento uma tag representa. 
      A <ul>é tratado como uma lista por padrão, mas os estilos que estamos prestes a adicionar interromperão 
      essa funcionalidade. Esta função irá restaurar o significado da "lista" para o <ul>  elemento. */}
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">



      {/*Os componentes são poderosos porque 
      nos permitem reutilizar partes de nossa IU
     e se referem a um local para a fonte dessa IU. 
     O problema é que normalmente não queremos 
     reutilizar todos os componentes; queremos reutilizar 
     a maioria das peças e trocar pequenas peças. 
     É aqui que entram os adereços.*/}
    
    {/* 
    <Todo name="Eat"completed={true} id="todo-0"/> {/*Aqui somente o Eat estará marcado, pois está TRUE
    <Todo name="Sleep" completed={false} id="todo-1"/>
    <Todo name="Repeat" completed={false} id="todo-2"/>         */}

      {/*Chamando a funcao criada ali em cima */}
      {taskList}
      </ul>

    </div>
  );
}

export default App;
