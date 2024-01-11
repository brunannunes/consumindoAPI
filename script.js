'use strict';

//function for clean the forms
const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//function for fill in the blank spaces
const preencherFormulario = (endereco) =>{  
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);//(^)verification to see if starts with a number, ($) verification to see if ends with a number

//verificatio to see if the cep has 8 digits and if they are numbers
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//When the focusout happen it will execute the function bellow and return the cep select
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

// will get a element 'ceo' in the html, then execute the function 'pesquisar cep' 
document.getElementById('cep').addEventListener('focusout', pesquisarCep);