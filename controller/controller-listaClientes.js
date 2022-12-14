import { servidorClientes } from "../service/cliente-service.js";

const tbody = document.querySelector("[data-tabela]");
function criaLinha(nome, email, id) {
    const tr = document.createElement("tr");
    const conteudo = ` 
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>`
    tr.innerHTML = conteudo;
    tr.dataset.id = id;
    return tr;
}

tbody.addEventListener("click", async (event) => {
    let botao = event.target.className === "botao-simples botao-simples--excluir";
    if (botao) {
        try {
            const linha = event.target.closest('[data-id]');
            let id = linha.dataset.id;
            await servidorClientes.deletaCliente(id)
            linha.remove()
        }
        catch (error) {
            console.log(error);
            window.location.href = '../telas/erro.html'
        }
    }
})


const render = async () => {
    try {
        const clientesServidor = await servidorClientes.listaDeClientes();
        clientesServidor.forEach(element => {
            tbody.appendChild(criaLinha(element.nome, element.email, element.id));
        })
    }
    catch (error) {
        console.log(error);
        window.location.href = '../telas/erro.html'
    }
}

render()
