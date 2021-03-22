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
  }

}