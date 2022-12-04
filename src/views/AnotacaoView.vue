<template>
    <div>
      <form @submit.prevent="salvar">
        <h2>Anotação</h2>
        <div class="form-group">
          <label for="texto">Texto</label>
          <br>
          <textarea id="texto"
              class="form-control" required
              v-model="texto">
          </textarea>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
      </form>
      <br>
      <h2>Cadastradas</h2>
      <p>Buscar <input type="text" v-model="busca"/><button @click="buscarAnotacao">Pesquisar</button></p>
      <div class="table-group">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Texto</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anotacao in anotacoes" :key="anotacao.id">
            <td>{{ anotacao.id }}</td>
            <td>{{ anotacao.texto }}</td>
            <td>{{ anotacao.usuario.nome }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        texto: '',
        anotacoes: []
      }
    },
    computed: {
      ...mapState([
        'usuario'
      ])},
    methods: {
      salvar() {
        axios.post('anotacao/',
            {
              texto: this.texto,
              usuario: this.usuario
            })
          .then(() =>{
            this.texto = '';
            alert('Cadastrado com sucesso!')
            this.atualizar();
          })
          .catch(error => console.log(error))
      },
      atualizar () {
        axios.get('/anotacao/', 
            { headers: { Accept: 'application/json' } })
          .then(res => {
            this.anotacoes = res.data
          })
          .catch(error => console.log(error))
      },
      buscarAnotacao(){
        axios.get('/anotacao/' + this.busca)
          .then(res => {
            this.anotacoes = res.data
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