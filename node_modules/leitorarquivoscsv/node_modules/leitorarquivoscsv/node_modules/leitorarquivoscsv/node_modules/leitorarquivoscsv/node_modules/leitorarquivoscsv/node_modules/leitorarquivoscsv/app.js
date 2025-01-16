// INCLUIR AS BIBLIOTECAS
const express = require('express'); // Inclui biblioteca EXPRESS
const fs = require('fs'); // Permite interagir com o sistema de arquivos  
const db = require('./db/models'); // Inclui a conexão com o banco de dados
const { delimiter } = require('path'); // Inclui a biblioteca que permite delimitar o conteúdo de uma célula
const csv = require('csv'); // Inclui a biblioteca que permite ler arquivos CSV
const { where } = require('sequelize');

// GERENCIA AS REQUISIÇÕES, ROTAS E URLs, ENTRE OUTRAS FUNCIONALIDADES
const app = express(); // Chamada da função EXPRESS

// ROTA DE IMPORTAÇÃO DO ARQUIVO CSV
app.get("/", (req, res) => {

    // CAMINHO DOS ARQUIVOS CSV
    let arquivoCSV = '2024_Gastos.csv';
        
    // LER O ARQUIVO CSV
    fs.createReadStream(arquivoCSV)

        // pipe - conecta fluxos de leitura e escrita, sem armazenar os dados intermediários na memória
        // columns: true - primeira linha do arquivo csv é tratado como cabeçalho, o nome do cabeçalho corresponde ao nome da coluna no banco de dados
        // delimiter - delimita o conteúdo de uma célula, nesse caso, o ponto e vírgula delimita o conteúdo
        .pipe(csv.parse({columns: true, delimiter: ';'}))

        // Acionar o evento data quando ler uma linha e executar a função enviando os dados como parâmetro. 
        .on('data', async (linha) => {
            try {
                // Limpar espaços em brancos e aspas dos valores
                const dadosLinha = {};
                for (const key in linha) {
                    dadosLinha[key.trim()] = linha[key].trim();
                }
                    
                /* VERIFICAR SE O DADO CSV JÁ EXISTE, PARA CADASTRAR APENAS DADOS DIFERENTES */
                        
                    // 1. Recuperar o registro do banco para comparação
                    const transacao = await db.Transacoes.findOne({

                        // Indica quais colunas devem ser recuperadas
                        atributes: ['ID', 'DATA', 'VALOR'],

                        // Condição para o retorno do registro do banco
                        where: {DATA: dadosLinha.DATA, VALOR: dadosLinha.VALOR}
                    });

                    // Verifica se não há dados recuperados e, caso não tenha, salva os novos dados no banco  
                    if (!transacao) {
                        // 2. Cadastrar transação no banco de dados
                        await db.Transacoes.create(dadosLinha);
                    }
                    console.log(dadosLinha);
            } catch (error) {
                console.error("Erro ao processar linha:", error);
            }
        });

    return res.send("Importação concluída.");
}) 

// INICIAR O SERVIDOR NA PORTA 8080
// FUNÇÃO ARROW FUNCTION PARA RODAR O PROJETO E RETORNAR A MENSAGEM DE SUCESSO 
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});