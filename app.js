const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

// Rota principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Autenticação em Duas Etapas</h1>
    <a href="/setup">Configurar 2FA</a>
  `);
});

// Health check endpoint for CI/CD and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: require('./package.json').version
  });
});

// Rota para configurar o 2FA
app.get('/setup', (req, res) => {
  // Gerar segredo temporário
  const secret = speakeasy.generateSecret({
    name: 'Meu App Node.js'
  });
  
  // Salvar na sessão (em produção, salve no banco de dados)
  req.session.temp_secret = secret.base32;
  
  // Gerar QR Code para o Google Authenticator
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.send(`
      <h1>Configurar Google Authenticator</h1>
      <p>Escaneie o QR Code abaixo com o aplicativo Google Authenticator:</p>
      <img src="${data_url}"/>
      <p>Ou insira manualmente este código: <strong>${secret.base32}</strong></p>
      <form action="/verify" method="post">
        <input type="text" name="token" placeholder="Digite o código" required/>
        <button type="submit">Verificar</button>
      </form>
    `);
  });
});

// Rota para verificar o código
app.post('/verify', (req, res) => {
  const userToken = req.body.token;
  const base32secret = req.session.temp_secret;
  
  const verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: 'base32',
    token: userToken
  });
  
  if (verified) {
    // Salvar o segredo permanentemente (em produção, salve no banco de dados)
    req.session.secret = base32secret;
    req.session.temp_secret = null;
    res.send(`
      <h1>Verificação bem-sucedida!</h1>
      <p>Seu dispositivo foi configurado com sucesso.</p>
      <a href="/login">Fazer login</a>
    `);
  } else {
    res.send(`
      <h1>Falha na verificação</h1>
      <p>O código inserido é inválido. <a href="/setup">Tente novamente</a></p>
    `);
  }
});

// Rota de login
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/authenticate" method="post">
      <input type="text" name="username" placeholder="Usuário" required/><br/>
      <input type="password" name="password" placeholder="Senha" required/><br/>
      <button type="submit">Continuar</button>
    </form>
  `);
});

// Rota para autenticação
app.post('/authenticate', (req, res) => {
  // Verificação básica de usuário/senha (em produção, use um banco de dados)
  if (req.body.username === 'admin' && req.body.password === '123456') {
    if (req.session.secret) {
      // Se tiver 2FA configurado, pedir o código
      res.send(`
        <h1>Verificação em Duas Etapas</h1>
        <form action="/validate-2fa" method="post">
          <input type="text" name="token" placeholder="Código do Authenticator" required/>
          <button type="submit">Verificar</button>
        </form>
      `);
    } else {
      // Se não tiver 2FA configurado, logar diretamente
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    }
  } else {
    res.send('Credenciais inválidas');
  }
});

// Rota para validar o 2FA
app.post('/validate-2fa', (req, res) => {
  const userToken = req.body.token;
  const base32secret = req.session.secret;
  
  const verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: 'base32',
    token: userToken
  });
  
  if (verified) {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.send('Código inválido. <a href="/login">Tente novamente</a>');
  }
});

// Rota protegida
app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.send(`
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel protegido!</p>
      <a href="/logout">Sair</a>
    `);
  } else {
    res.redirect('/login');
  }
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});