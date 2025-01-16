<!-- PROJETO LEITURA DE ARQUIVOS CSV -->
<!--
                CRONOGRAMA DE DESENVOLVIMENTO:

06/01/2025 14:30 - Configurando o ambiente de desenvolvimento -->

        COMO RODAR O PROJETO BAIXADO:

<!-- Instalar todas as dependências indicadas pelo package.json -->
### npm install

<!-- Criar a base de dados 'leitorarquivocsv' no MySQL 
        1. Altere as credenciais de conexão com o banco, no arquivo '.env'

        2. Executar as migrations -->
### npm sequelize-cli db:migrate

<!-- Rodar a aplicação pelo NODE -->
### node app.js

<!-- Rodar a aplicação pelo NODEMON -->
### nodemon app.js

        SEQUÊNCIA PARA CRIAR O PROJETO:

<!-- Criar o arquivo package --> 
### npm init
        
<!-- Gerenciar as requisições, rotas e URLs, entre outras funcionalidades -->
### npm install --save express  

<!-- Instalar a ferramenta NODEMON para restartar automaticamente a aplicação quando houver auterações no diretório do projeto -->
### npm install -g nodemon 

<!-- Rodar a aplicação pelo NODEMON -->
### nodemon app.js

<!-- Instalar dependência NPM para importação de arquivos CSV -->
### npm install csv
PARTE FINALIZADA: 06/01/2025 16:00

<!-- 06/01/2025 18:30 - Configurando a importação de arquivos CSV -->
PARTE FINALIZADA: 06/01/2025 19:40

<!-- 07/01/2025 09:30 - Configurando a sincronização do projeto com o GitHub -->
## URL Git: https://github.com/Magila-Ferreira/leitorArquivoCSV.git
PARTE FINALIZADA: 07/01/2025 12:00

<!-- 07/01/2025 14:00 - Importar dados do arquivos csv -->
PARTE FINALIZADA: 07/01/2025 18:00

<!-- 09/01/2025 14:30 - Configurar a conexão com o banco de dados mySQL -->
        
        IMPORTAR DEPENDÊNCIA DE CONEXÃO DO PROJETO COM O MYSQL:

<!-- SEQUELIZE: biblioteca JS para gerenciar o banco de dados SQL -->
### npm install --save sequelize

<!-- Instalação do drive do banco de dados -->
### npm install --save mysql2

<!-- SEQUELIZE-CLI: interface de linha de comando usada para criar modelos, configurações e arquivos de migração para banco de dados -->
### npm install --save-dev sequelize-cli

<!-- Criar banco de dados com formato UTF-8 -->
# create DATABASE leitorArquivoCSV CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        CONFIGURAÇÃO DOS DIRETÓRIOS DE CONEXÃO COM O BANCO DE DADOS:

<!-- CONFIG, MIGRATIONS, MODELS, SEEDERS: Criação dos diretórios para gerenciar o banco de dados  -->
### npx sequelize-cli init

<!-- Manipular variáveis de ambiente -->
### npm install --save dotenv
PARTE FINALIZADA: 09/01/2025 18:00

<!-- 15/01/2025 09:40 - Salvar dados csv no banco de dados mySQL -->

        CONFIGURAÇÃO DO BANCO DE DADOS ATRAVÉS DO SEQUELIZE:

<!-- Define o modelo de tabela do banco:        
        Coluna:tipo_dado                -->
### npx sequelize-cli model:generate --name Transacoes --attributesTIPO:string,DATA:string,PARCELA:string,DESCRICAO:string,VALOR:string 

        MIGRAÇÃO DOS DADOS CSV PARA O BANCO DE DADOS
<!-- Executa a migração dos dados csv para o banco -->
### npx sequelize-cli db:migrate

        PROJETO DESENVOLVIDO A PARTIR DO TUTORIAL
<!-- https://www.youtube.com/watch?v=-tAf3q1mKvk&ab_channel=Celke -->