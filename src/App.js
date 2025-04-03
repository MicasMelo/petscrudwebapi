import logo from './logo.jpg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from "react";
//import axios from 'axios';
//import (Modal, ModalBody, ModalFooter, ModelHeader) from 'reactstrap';


function App() {

return(
  <body>
    <div id="topo">
      <center><img src={logo} className="App-logo" alt="logo" /></center>
    </div>

    <div id="conteudo" className="animal-container">
    <br />
      <center>
        <h3><u>Cadastro de Animais</u></h3>
      </center>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
        </tbody>
      </table>
    </div>
  </body>
)
}

export default App;
