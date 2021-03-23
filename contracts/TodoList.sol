// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {

  uint public taskCount = 0;

  //Definizione di un struct Task
  struct Task {
    uint id;
    string content;
    bool completed;
  }

  //Definizione di un evento
   event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  //Variabile che conserverà la lista di task sulla blockchain. Mapping è key=>value
  mapping(uint => Task) public taskList;

  //Il costruttore esegue quando lo smart contract viene deploiato sulla blockchain
  constructor() public {
    addTask("Imparare a fare dapp");
  }

  /*Metodo per aggiungere un task. 
  - memory significa che sarà salvato sulla memoria
  - _ vuol dire che sto creando una variabile interna
  - public rende queste funzioni o variabili disponibili all'esterno
  */
  function addTask(string memory _content) public {
    taskCount ++;
    //Creo un nuovo task
    taskList[taskCount] = Task(taskCount, _content, false);
    // Quando creo un nuovo task emetto TaskCreated event
    emit TaskCreated(taskCount, _content, false);
  }

  // Metodo per settare task come completato
  function toggleCompleted(uint _id) public {
    Task memory _task = taskList[_id];
    _task.completed = !_task.completed;
    taskList[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

}