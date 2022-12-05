<template>
    <div>
      <form @submit.prevent="salvar">
        <h2>Localidades</h2>
        <div class="form-group">
            <label for="latitude">Valor</label>
          <br>
          <input type="number" id="valor"
              class="form-control" required
              v-model="texto"/>
            <br>
            <label for="descricao">Descrição</label>
            <br>
            <input type="text" id="descricao"
              class="form-control" required
              v-model="texto"/>
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
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loc in localidades" :key="loc.id">
            <td>{{ loc.id }}</td>
            <td>{{ loc.latitude }}</td>
            <td>{{ loc.longitude }}</td>
            <td>{{ loc.descricao }}</td>
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
        texto: '',
        localidades: []
      }
    },
    methods: {
      salvar() {
        axios.post('localidade/',
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
        axios.get('/localidade/', 
            { headers: { Accept: 'application/json' } })
          .then(res => {
            this.localidades = res.data
            console.log(res.data)
          })
          .catch(error => console.log(error))
      },
      buscarAnotacao(){
        axios.get('/localidade/' + this.busca)
          .then(res => {
            this.localidades = res.data
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