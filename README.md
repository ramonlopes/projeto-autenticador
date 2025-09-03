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
- [x] Adicionar testes automatizados
- [x] Implementar CI/CD com GitHub Actions
- [x] Adicionar linting com ESLint
- [x] Configurar Docker para containerização

## CI/CD Pipeline

Este projeto possui um pipeline completo de CI/CD implementado com GitHub Actions:

### Continuous Integration (CI)

O workflow de CI (`/.github/workflows/ci.yml`) é executado em:
- Push para branches `main` e `develop`
- Pull requests para `main` e `develop`

**Etapas do CI:**
1. **Instalação de dependências** com `npm ci`
2. **Auditoria de segurança** com `npm audit`
3. **Linting** com ESLint
4. **Testes automatizados** com Jest e cobertura
5. **Upload de cobertura** para Codecov
6. **Teste de build** e inicialização da aplicação
7. **Criação de artefatos** para deployment

### Continuous Deployment (CD)

O workflow de CD (`/.github/workflows/cd.yml`) inclui:
- **Deploy para staging** - automaticamente após CI bem-sucedido na branch `main`
- **Deploy para produção** - acionado por tags (ex: `v1.0.0`)

### Containerização

A aplicação pode ser containerizada com Docker:

```bash
# Build da imagem
docker build -t projeto-autenticador .

# Executar container
docker run -p 3000:3000 projeto-autenticador
```

### Comandos de Desenvolvimento

```bash
# Executar testes
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Auditoria de segurança
npm run audit
npm run audit:fix

# Pipeline completo (CI local)
npm run ci
```

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
