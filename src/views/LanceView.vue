<template>
    <div>
      <form @submit.prevent="salvar">
        <h2>Lances</h2>
        <div class="form-group">
          <label for="jogador">Jogador</label>
          <br>
          <input type="text" id="jogador"
              class="form-control" required
              v-model="jogador"/>
            <br>
            <label for="descricao">Descrição</label>
            <br>
            <input type="text" id="descricao"
              class="form-control" required
              v-model="descricao"/>
              <br>
              <label for="data">Data</label>
            <br>
            <input type="date" id="data"
              class="form-control" required
              v-model="data"/>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
      </form>
      <br>
      <h2>Cadastradas</h2>
      <p>Buscar <input type="text" v-model="busca"/><button @click="buscarLance">Pesquisar</button></p>
      <div class="table-group">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Jogador</th>
            <th>Descrição</th>
            <th>Data e Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lnc in lances" :key="lnc.id">
            <td>{{ lnc.id }}</td>
            <td>{{ lnc.jogador }}</td>
            <td>{{ lnc.descricao }}</td>
            <td>{{ lnc.dataHora }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dataHora: null,
        jogador: '',
        descricao:'',
        lances: []
      }
    },
    methods: {
      salvar() {
        axios.post('lance/',
            {
              dataHora: this.data,
              jogador: this.jogador,
              descricao: this.descricao
            })
          .then(() =>{
            this.dataHora= null;
            this.jogador= '';
            this.descricao='';
            alert('Cadastrado com sucesso!')
            this.atualizar();
          })
          .catch(error => console.log(error))
      },
      atualizar () {
        axios.get('/lance/', 
            { headers: { Accept: 'application/json' } })
          .then(res => {
            this.lances = res.data
          })
          .catch(error => console.log(error))
      },
      buscarLance(){
        axios.get('/lance/' + this.busca)
          .then(res => {
            this.lances = res.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.atualizar()
    }
  }
  </script>

<style scoped>
.table-group{
    display: flex;
    align-items: center;
    justify-content: center;
}

#texto{
    width: 300px;
    height: 40px;
    padding: 20px;
}

button{
    border-radius: 6px;
    border: 1.5px solid black;
    padding: 5px 20px 5px 20px;
    font-size: 15px;
    margin-left:20px;
    margin-right:20px;

}

button:hover{
    background-color: rgb(107, 247, 160);
    cursor: pointer;
}

table, th,  td {
    border: 1px solid;
    padding: 5px;
}

th{
    background-color: rgb(107, 247, 160);
    padding: 4px 13px 4px 13px;
}
</style>