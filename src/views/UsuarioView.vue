<template>
    <div id="usuario">
        <p v-if="autorizacao === 'ROLE_ADMIN'">{{autorizacao}}</p>
        <p>Nome: <input type="text" v-model="nome"/></p>
        <p>Senha: <input type="text" v-model="senha"/></p>
        <button @click="criarUsuario">Ok</button>
        <ul>
            <li v-for="(usuario, index) in usuarios" :key="index">{{usuario.nome}}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';

export default {
    name: 'usuarioView',
    data() {
        return {
            nome: '',
            usuarios: [{nome: 'Teste'}, {nome: 'Teste2'}]
        }
    },
    computed: {
        ...mapState(['autorizacao'])
    },
    methods: {
        atualizar() {
            var url = 'usuario';
            if(this.nome) {
                url = 'usuario/nome/' + this.nome;
            }
            axios.get(encodeURI(url))
                .then(res => {
                    this.usuarios = res.data;
                })
                .catch(error => { console.log(error) });
        },
        criarUsuario(){
            axios.post('usuario/',
            {
              usuario:{
                nome: this.nome,
                senha: this.senha
              }
            })
          .then(res =>{
            console.log(res.data)
            this.nome = '';
            this.senha = '';
            this.atualizar();
          })
          .catch(error => console.log(error))
        }
    },
    created() {
        this.atualizar();
    }
}
</script>
