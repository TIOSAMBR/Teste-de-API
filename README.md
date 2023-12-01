# Teste-de-API

# Descrição do Código: Sistema de Anúncios e Usuários com Autenticação (Incompleto)

Este código implementa um sistema web para gerenciamento de anúncios e usuários com funcionalidades de autenticação. Abaixo está uma descrição detalhada de cada componente:

# Estrutura Geral:
**HTML:**

**Meta e Estilos:** Define meta tags, a codificação de caracteres e estilos CSS para a interface do usuário.<br>
**Formulários:** Contém formulários para Login, Cadastro, Criação de Anúncios, Edição de Usuário e uma Página Principal. Também há um contêiner para exibir anúncios e mensagens.
**Scripts:** Inclui a biblioteca jwt-decode e scripts JavaScript para a interatividade da página.

**JavaScript:**

**Configuração Inicial:** Utiliza o evento DOMContentLoaded para chamar a função de configuração inicial (setup).<br>
**Manipulação de Tokens JWT:** Funções para salvar, obter e limpar tokens no localStorage e para obter dinamicamente o ID do usuário atual a partir do token.<br>
**Manipulação de Anúncios:** Funções para exibir, editar e excluir anúncios, buscar e exibir anúncios, e eventos relacionados a anúncios.<br>
**Manipulação de Usuários:** Funções para editar dados do usuário, excluir usuário e atualizar informações do usuário, e obter dados do usuário a partir do token.<br>
**Navegação entre Páginas:** Funções para mostrar diferentes páginas, incluindo a página principal.<br>
**Autenticação e Interação com o Servidor:** Funções para login, cadastro, criação de anúncios e logout.<br>
**Outras Funções Utilitárias:** Funções utilitárias, como limpar formulários, esconder formulários, exibir mensagens.

# Documentação Externa:
Documentação da API: http://204.48.20.110/api-docs/

URL Base da API: http://204.48.20.110/

Documentação / Exemplo Postman: Postman Documentation

# Ambiente de Desenvolvimento:
IDE: Visual Studio Code (VSCode)

Extensões Recomendadas: Pode-se otimizar a experiência de desenvolvimento instalando extensões como "Live Server" para facilitar a visualização da página web em tempo real e "JavaScript (ES6) code snippets" para atalhos úteis no desenvolvimento JavaScript.

# Fluxo Geral:
Início da Página: O formulário de login é exibido por padrão.
Login Bem-Sucedido: Após o login, a página principal é mostrada, permitindo ações como criar anúncios, editar usuário, etc.
Interação com Anúncios e Usuários: Funções relacionadas a anúncios e usuários possibilitam a criação, edição, exclusão e visualização de informações.
Navegação entre Páginas: Funções de navegação mostram ou ocultam formulários conforme necessário.
Manipulação de Tokens: Funções gerenciam tokens JWT para autenticação.

# Observações Adicionais:
O código utiliza o método fetch para interações com o servidor, como solicitações GET, POST, PUT e DELETE.
A dependência externa jwt-decode é importada para decodificar tokens JWT.

**Nota:** Este projeto encontra-se ainda incompleto. Algumas funcionalidades podem não estar totalmente implementadas ou testadas. Recomenda-se a consulta à documentação da API para obter informações detalhadas sobre o funcionamento do sistema.
