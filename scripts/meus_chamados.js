//Status dos Chamados//

const nomesStatus ={
emAnalise: "Em análise",
emAndamento: "Em andamento",
concluido: "Concluído"
};

//Constante dos Chamados


const chamados = [

  {
    id: 1,
    protocolo: "2026-0001",
    tipo: "Lixo acumulado",
    local: "Rua das Flores, 120",
    data: "2026-10-20",
    status: "emAnalise",
    descricao: "Entulho em via pública.",
    foto: "https://picsum.photos/id/10/400/300"
  },
  {
    id: 2,
    protocolo: "2026-0002",
    tipo: "Entulho",
    local: "Rua das margaridas, 110",
    data: "2026-08-20",
    status: "concluido",
    descricao: "Descarte irregular.",
    foto: "https://picsum.photos/id/20/400/300"
  },
  {
    id: 3,
    protocolo: "2026-0003",
    tipo: "Coleta não realizada",
    local: "Rua das Orquídeas, 120",
    data: "2026-07-20",
    status: "emAndamento",
    descricao: "Lixo acumulado há três dias na calçada.",
    foto: "https://picsum.photos/id/30/400/300"
  },
  {
    id: 4,
    protocolo: "2026-0004",
    tipo: "Lixo acumulado",
    local: "Rua dos Girassóis, 120",
    data: "2026-06-20",
    status: "concluido",
    descricao: "outro problema.",
    foto: "https://picsum.photos/id/40/400/300"
  },
];
//Função para os contadores de chamados por status
function atualizarContadores(chamados) {
  const emAnalise=chamados.filter(function(chamado){
    return chamado.status==="emAnalise";
  });
  preencher("numAnalise", emAnalise.length);

  const emAndamento=chamados.filter(function(chamado){
    return chamado.status==="emAndamento";
  });
  preencher("numAndamento", emAndamento.length);

  const concluido=chamados.filter(function(chamado){
    return chamado.status==="concluido";
  });
  preencher("numConcluido", concluido.length);
}


















function mostrarChamados(lista){
  const areaLista = document.getElementById("listaChamados");
  areaLista.innerHTML = "";
 lista.forEach(function (chamado) {
  const card=document.createElement("div");
  card.className= "card item-chamado";
  card.innerHTML=
  `<strong>${chamado.protocolo}</strong>
  <p>${chamado.tipo}</p>
  <p>${chamado.local}</p>
  <p>${nomesStatus[chamado.status]}</p>
  <p>${chamado.data}</p>
  `;
 
  card.addEventListener("click", function(){
   preencher("detTipo", chamado.tipo);
   preencher("detProtocolo",chamado.protocolo);
   preencher("detLocal",chamado.local);
   preencher("detStatus",nomesStatus[chamado.status]);
   preencher("detDescricao",chamado.descricao);
  document.getElementById("detFoto").src=chamado.foto;
  });
  areaLista.appendChild(card);
 });
}
mostrarChamados(chamados);
atualizarContadores(chamados);



function preencher(id,texto){
  document.getElementById(id).textContent=texto

 }