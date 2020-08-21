import React, { useState } from "react"; //useState é aquele que precisamos para dar algum estado ao nosso componente.



function Form(props) {              //deixar vazia pois será o estado inicial
    const [name, setName] = useState(''); //define o valor inicial de NAME, o SETNAME modificara a variavel NAME, o USESTATE retorna os dois

    function handleSubmit(e) {
        e.preventDefault(); //evitar o comportamento padrão do submitevento
        props.addTask(name);
        setName(""); // chamaremos setName()novamente com uma string vazia para fazer isso - BOA PRATICA
    }


    {/*Antes de alterarmos o valor de name, precisamos capturar a entrada de um usuário enquanto ele digita. 
    Para isso, podemos ouvir o onChangeevento. */}
    function handleChange(e) {
        //console.log(e.target.value);      adicionando ao Console Javascript
        setName(e.target.value)
      }

    return (
      <form onSubmit={handleSubmit}> 
      

        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange} //chamando a onChange
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
  
  export default Form;