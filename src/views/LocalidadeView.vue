<template>
    <div>
      <form @submit.prevent="salvar">
        <h2>Localidades</h2>
        <div class="form-group">
            <label for="latitude">Latitude</label>
          <br>
          <input type="number" id="latitude"
              class="form-control" required
              v-model="latitude"/>
            <br>
            <label for="longitude">Longitude</label>
            <br>
            <input type="number" id="longitude"
              class="form-control" required
              v-model="longitude"/>
              <br>
              <label for="descricao">Descrição</label>
            <br>
            <input type="text" id="descricao"
              class="form-control" required
              v-model="descricao"/>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
      </form>
      <br>
      <h2>Cadastradas</h2>
      <p>Buscar <input type="text" v-model="busca"/><button @click="buscarLocalidade">Pesquisar</button></p>
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
        latitude:'',
        longitude:'',
        descricao:'',
        localidades: []
      }
    },
    methods: {
      salvar() {
        axios.post('localidade/',
            {
              latitude: this.latitude,
              longitude: this.longitude,
              descricao: this.descricao
            })
          .then(() =>{
            this.latitude = '';
            this.longitude = '';
            this.descricao = '';
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
      buscarLocalidade(){
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