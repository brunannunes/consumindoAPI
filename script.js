'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) =>{  
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);//(^) verifica se começa com um numero, ($) verifica se termina com um numero

//verificação para saber se cep tem até 8 digitos e se esses digitos são somente numeros
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//ao sair do campo selecionado ele executara a função de retornar o cep digitado
const pesquisarCep = async() =>{
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado';
        }else{preencherFormulario(endereco);}
    }else{
        document.getElementById('endereco').value = 'CEP incorreto, tente novamente';
    }
    
    
  
}

//pegara o elemento cep encontrado no html, e depois que "sair do foco" ele irá pesquisar o cep
document.getElementById('cep').addEventListener('focusout', pesquisarCep);