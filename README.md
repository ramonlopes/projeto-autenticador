# Projeto Autenticador 2FA

Sistema de autenticação em duas etapas usando Node.js, Express e Google Authenticator.

## Funcionalidades

- ✅ Autenticação básica com usuário e senha
- ✅ Configuração de 2FA com Google Authenticator
- ✅ Geração de QR Code para configuração
- ✅ Verificação de códigos TOTP
- ✅ Sistema de sessões
- ✅ Dashboard protegido

## Tecnologias Utilizadas

- Node.js
- Express.js
- Speakeasy (para 2FA)
- QRCode (para geração de QR codes)
- Express-session (para gerenciamento de sessões)

## Como Usar

### Pré-requisitos

- Node.js instalado
- Google Authenticator ou similar no seu smartphone

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd projeto-autenticador
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
node app.js
```

4. Acesse `http://localhost:3000` no seu navegador

### Uso do Sistema

1. Acesse a página inicial
2. Clique em "Configurar 2FA"
3. Escaneie o QR Code com o Google Authenticator
4. Digite o código gerado para verificar
5. Faça login com:
   - Usuário: `admin`
   - Senha: `123456`
6. Digite o código do Google Authenticator
7. Acesse o dashboard protegido

## Estrutura do Projeto

```
projeto-autenticador/
├── app.js              # Arquivo principal da aplicação
├── package.json        # Dependências e scripts
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Documentação do projeto
```

## Próximos Passos

- [ ] Implementar banco de dados
- [ ] Adicionar validação de entrada
- [ ] Melhorar interface do usuário
- [ ] Implementar múltiplos usuários
- [ ] Adicionar testes automatizados

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Aviso de Segurança

⚠️ **Este é um projeto de demonstração**. Para uso em produção, implemente:
- Banco de dados seguro para armazenar segredos
- Criptografia adequada
- Validação robusta de entrada
- Rate limiting
- HTTPS obrigatório
- Configuração segura de sessões
