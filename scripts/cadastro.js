
/*const inputCep= document.querySelector("#cep");
const inputTelefone= document.querySelector("#contato");
const inputBairro= document.querySelector("#bairro");
//função para formatar o campo de cep//
const campoCep = document.querySelector("#cep");
campoCep.addEventListener("input", function(e){
    e.target.value = e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{3})\d+?$/, "$1");
    console.log(e.target.value);
});
*/
const formCadastro = document.getElementById("formCadastro");
formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = "chamados.html";
});




























const botaoEmpresa = document.querySelector(".btn-empresa");
const camposMorador = document.querySelector(".campos-morador");
const camposEmpresa = document.querySelector(".campos-empresa");
const botaoMorador = document.querySelector(".btn-morador");

botaoEmpresa.addEventListener("click",function(){
    camposEmpresa.hidden =false;
    camposMorador.hidden =true;

    botaoEmpresa.classList.add("ativo");
    botaoMorador.classList.remove("ativo");
});
botaoMorador.addEventListener("click",function(){
    camposMorador.hidden =false;
    camposEmpresa.hidden =true;

    botaoMorador.classList.add("ativo")
    botaoEmpresa.classList.remove("ativo")
});

