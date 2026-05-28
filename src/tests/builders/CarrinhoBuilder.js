// _tests_/builders/CarrinhoBuilder.js

const {Carrinho} = require('../../domain/Carrinho'); 
const UserMother = require('./UserMother');

class CarrinhoBuilder {
  constructor() {
    this.user = UserMother.umUsuarioPadrao();
    this.itens = [
      { nome: 'Produto Padrão', preco: 100.0, quantidade: 1 }
    ];
  }

  comUser(user) {
    this.user = user;
    return this; 
  }

  comItens(itens) {
    this.itens = itens;
    return this;
  }

  vazio() {
    this.itens = [];
    return this;
  }

  build() {
    return new Carrinho(this.user, this.itens);
  }
}

module.exports = CarrinhoBuilder;