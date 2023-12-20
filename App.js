import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

const estados = [
  { value: 'Acre', label: 'Acre - (AC)' },
  { value: 'Alagoas', label: 'Alagoas - (AL)' },
  { value: 'Amapá', label: 'Amapá - (AP)' },
  { value: 'Amazonas', label: 'Amazonas - (AM)' },
  { value: 'Bahia', label: 'Bahia - (BA)' },
  { value: 'Ceará', label: 'Ceará - (CE)' },
  { value: 'Distrito Federal', label: 'Distrito Federal - (DF)' },
  { value: 'Espírito Santo', label: 'Espírito Santo - (ES)' },
  { value: 'Goiás', label: 'Goiás - (GO)' },
  { value: 'Maranhão', label: 'Maranhão - (MA)' },
  { value: 'Mato Grosso', label: 'Mato Grosso - (MT)' },
  { value: 'Mato Grosso do Sul', label: 'Mato Grosso do Sul - (MS)' },
  { value: 'Minas Gerais', label: 'Minas Gerais - (MG)' },
  { value: 'Pará', label: 'Pará - (PA)' },
  { value: 'Paraíba', label: 'Paraíba - (PB)' },
  { value: 'Paraná', label: 'Paraná - (PR)' },
  { value: 'Pernambuco', label: 'Pernambuco - (PE)' },
  { value: 'Piauí', label: 'Piauí - (PI)' },
  { value: 'Rio de Janeiro', label: 'Rio de Janeiro - (RJ)' },
  { value: 'Rio Grande do Norte', label: 'Rio Grande do Norte - (RN)' },
  { value: 'Rio Grande do Sul', label: 'Rio Grande do Sul - (RS)' },
  { value: 'Rondônia', label: 'Rondônia - (RO)' },
  { value: 'Roraima', label: 'Roraima - (RR)' },
  { value: 'Santa Catarina', label: 'Santa Catarina - (SC)' },
  { value: 'São Paulo', label: 'São Paulo - (SP)' },
  { value: 'Sergipe', label: 'Sergipe - (SE)' },
  { value: 'Tocantins', label: 'Tocantins - (TO)' },
];

function App() {
  const [selectOrig, setEstadoOrig] = useState('');
  const [selectDest, setEstadoDest] = useState('');
  const [resposta, setResposta] = useState('');

  const enviarEstados = (e) => {
    e.preventDefault();
    const valor = {
      selectOrig,
      selectDest,
    };

    axios
      .post('http://localhost:3000/fiscalGPT', {
        prompt:
          'Exemplifique com valores a fórmula do diferencial de alíquotas, entre os estados de' +
          ' ' +
          valor.selectOrig +
          ' ' +
          'e' +
          ' ' +
          valor.selectDest,
      })
      .then((response) => {
        console.log(response);
        setResposta(response.data.completion);
      })
      .catch((erro) => {
        console.error(erro);
      });
  };

  const limparSelecao = () => {
    setEstadoOrig('');
    setEstadoDest('');
    setResposta('');
  };

  return (
    <div className="container-fluid bg-light">
      <h1 className="text-center mt-5 mb-4">Consulta de Alíquotas por Estado brasileiro</h1>
      <div className="cabecalhoOrig">
        <form onSubmit={enviarEstados}>
          <div className="form-floating">
            <label htmlFor="eO"></label>
            <select
              className="form-select"
              name="selectOrig"
              id="eO"
              value={selectOrig}
              onChange={(valorOrig) => setEstadoOrig(valorOrig.target.value)}
            >
              <option value="" disabled hidden>
                Escolha o Estado de Origem
              </option>
              {estados.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="cabecalhoDest">
            <h1>Estado de Destino</h1>
            <div className="form-floating">
              <label htmlFor="eS"></label>
              <select
                className="form-select"
                id="eS"
                aria-label="Exemplo"
                name="selectDest"
                value={selectDest}
                onChange={(valorDest) => setEstadoDest(valorDest.target.value)}
              >
                <option value="" disabled hidden>
                  Escolha o Estado de Destino
                </option>
                {estados.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
              <br />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-sharp fa-paper-plane fa-fade"></i> Consultar
            </button>
            <button className="btn btn-secondary" type="button" onClick={limparSelecao}>
              Limpar Seleção
            </button>
          </div>

          <div className="form text-danger border border-info mt-4">
            <textarea
              className="form-control form-control-sm mb-3 border-success"
              name="respostas"
              id="resposta"
              disabled
              rows={11}
              cols={0}
              value={resposta}
            ></textarea>
            <label htmlFor="respostas">Resposta gerada pelo ChatGPT</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
