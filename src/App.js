import logo from './logo.jpg';
import editIcon from './icones/editar.png';
import deleteIcon from './icones/excluir.png';
import addIcon from './icones/incluir.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from "react";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function App() {
  const baseUrl = "https://localhost:7139/api/Animais";
  const [data, setData] = useState([]);

  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [animalSelecionado, setAnimalSelecionado] = useState({
    id: "",
    nome: "",
    especie: "",
    idade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalSelecionado({
      ...animalSelecionado,
      [name]: value,
    });
    console.log(animalSelecionado);
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const pedidoPost = async () => {
    delete animalSelecionado.id;
    animalSelecionado.idade = parseInt(animalSelecionado.idade);
    await axios
      .post(baseUrl, animalSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const animaisGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const animalPut = async () => {
    animalSelecionado.idade = parseInt(animalSelecionado.idade);
    await axios
      .put(baseUrl + "/" + animalSelecionado.id, animalSelecionado)
      .then((response) => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map((animal) => {
          if (animal.id === animalSelecionado.id) {
            animal.nome = animal.nome;
            animal.especie = animal.especie;
            animal.idade = animal.idade;
          }
        });
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const animalDelete=async()=>{
    await axios.delete(baseUrl+"/"+animalSelecionado.id)
    .then(response=>{
     setData(data.filter(animal=>animal.id!==response.data));
      abrirFecharModalExcluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  const selecionarAnimal = (animal, caso) => {
    setAnimalSelecionado(animal);
    caso === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  useEffect(() => {
    animaisGet();
  });

return(
  <div className='animal-container'>
  <div id="topo">
    <center><img src={logo} className="App-logo" alt="logo" /></center>
  </div><div id="conteudo" className="animal-container">
      <br />
      <center>
        <h3><u>Cadastro de Animais</u></h3>

        <header>
          <button onClick={() => abrirFecharModalIncluir()} className="btn">
            <img src={addIcon} alt="Adicionar" style={{ width: '20px', marginRight: '5px' }} />
          </button>
        </header>
      </center>
      <br />

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
          {data.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.nome}</td>
              <td>{animal.especie}</td>
              <td>{animal.idade}</td>
              <td>
                <button className="btn" onClick={() => selecionarAnimal(animal, "Editar")}>
                  <img src={editIcon} alt="Editar" style={{ width: '20px', marginRight: '5px' }} />
                </button>
                <button className="btn" onClick={() => selecionarAnimal(animal, "Excluir")}>
                  <img src={deleteIcon} alt="Excluir" style={{ width: '20px', marginRight: '5px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Animal</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange} />
            <br />
            <label>Espécie: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="especie"
              onChange={handleChange} />
            <br />
            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={() => pedidoPost()}>
            Incluir
          </button>
          <button
            className="btn"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Animal</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control"
              readOnly
              value={animalSelecionado && animalSelecionado.id} />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={animalSelecionado && animalSelecionado.nome} />
            <br />
            <label>Espécie: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="especie"
              onChange={handleChange}
              value={animalSelecionado && animalSelecionado.especie} />
            <br />
            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={animalSelecionado && animalSelecionado.idade} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={() => animalPut()}>
            Editar
          </button>
          <button
            className="btn"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalExcluir}>
        <ModalHeader>Excluir Animal</ModalHeader>
        <ModalBody>
          Confirma a exclusão do animal <strong>{animalSelecionado && animalSelecionado.nome}</strong>?
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={() => animalDelete()}>
            Sim
          </button>
          <button
            className="btn"
            onClick={() => abrirFecharModalExcluir()}>
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  </div>
)
}

export default App;
