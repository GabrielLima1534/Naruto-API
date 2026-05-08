# Documentação do Projeto — API Naruto

## Requisitos Funcionais

O sistema deve permitir ao usuário:

### 1. Listagem de personagens
Exibir uma lista de personagens do universo Naruto, contendo informações básicas como nome e imagem.

### 2. Busca de personagens
Permitir a pesquisa de personagens pelo nome através de um campo de busca, atualizando a lista dinamicamente conforme o termo digitado.

### 3. Visualização de detalhes
Exibir informações detalhadas de um personagem ao selecioná-lo, como vila, clã, habilidades e demais dados disponíveis na API.

### 4. Favoritar personagens
Permitir ao usuário marcar e desmarcar personagens como favoritos para acesso rápido posterior.

### 5. Visualização de favoritos
Exibir uma tela dedicada contendo os personagens previamente favoritados.

---

## Requisitos Não Funcionais

### 1. Tratamento de erros
A aplicação deve tratar falhas de conexão com a API, exibindo mensagens amigáveis ao usuário em caso de erro.

### 2. Indicador de carregamento
Durante requisições de dados, deve ser exibido um indicador de carregamento (ActivityIndicator).

### 3. Desempenho na renderização
A listagem de personagens deve utilizar FlatList para otimizar performance.

### 4. Persistência de dados
Os personagens favoritados devem ser armazenados localmente utilizando AsyncStorage.

### 5. Responsividade
A interface deve se adaptar a diferentes tamanhos de tela.

### 6. Área segura
Uso de SafeAreaView para evitar sobreposição com barra de status.

---

## Guia de Estilo

### Cores
- Primária: #FF6B00  
- Fundo: #121212  
- Cards: #1E1E1E  
- Texto: #FFFFFF  
- Secundário: #AAAAAA  
- Erro: #E63946  

### Tipografia
- Fonte padrão: System
- Títulos: bold
- Texto: regular

### Tamanhos
- Título: 20–24
- Subtítulo: 16–18
- Texto: 14–16

---

## Componentes

### Card de personagem
- Fundo escuro
- Bordas arredondadas
- Imagem + nome

### Botão
- Fundo laranja
- Texto branco
- Feedback ao toque

### Input de busca
- Fundo escuro
- Texto branco
- Placeholder cinza

---

## Telas

### Home
- Lista de personagens
- Busca

### Detalhes
- Informações completas do personagem
- Favoritar

### Favoritos
- Lista de personagens salvos