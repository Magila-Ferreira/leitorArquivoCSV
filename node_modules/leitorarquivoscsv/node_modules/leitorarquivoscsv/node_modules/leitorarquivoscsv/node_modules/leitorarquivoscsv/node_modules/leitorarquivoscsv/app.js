// INCLUIR AS BIBLIOTECAS
const express = require('express'); // Inclui biblioteca EXPRESS
const fs = require('fs'); // Permite interagir com o sistema de arquivos  
const { delimiter } = require('path');
const csv = require('csv');

// GERENCIA AS REQUISIÇÕES, ROTAS E URLs, ENTRE OUTRAS FUNCIONALIDADES
const app = express(); // Chamada da função EXPRESS

// ROTA DE IMPORTAÇÃO DO ARQUIVO CSV
app.get("/", (req, res) => {

    // CAMINHO DO ARQUIVO CSV
    const arquivoCSV = '2024.csv';

    // LER O ARQUIVO CSV
    fs.createReadStream(arquivoCSV)

        // pipe - conecta fluxos de leitura e escrita, sem armazenar os dados intermediários na memória
        // columns: true - primeira linha do arquivo csv é tratado como cabeçalho, o nome do cabeçalho corresponde ao nome da coluna no banco de dados
        // delimiter - delimita o conteúdo de uma célula, nesse caso, o ponto e vírgula delimita o conteúdo
        .pipe(csv.parse({columns: false, delimiter: ';'}))

        // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro. 
        .on('data', async (dadosLinha) => {
            console.log(dadosLinha);
        });

    return res.send("Importação concluída.");
}) 

// INICIAR O SERVIDOR NA PORTA 8080
// FUNÇÃO ARROW FUNCTION PARA RODAR O PROJETO E RETORNAR A MENSAGEM DE SUCESSO 
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});