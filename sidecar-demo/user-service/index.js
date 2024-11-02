const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const SECRET_KEY = 'Secreto'; // Clave secreta para firmar el token
const mockUser = { username: 'admin', password: 'password', profile: { name: 'Admin User', email: 'admin@example.com' } };

// Ruta de autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Ruta de perfil
app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token no proporcionado en el user-service');
    return res.status(401).json({ error: 'Token no proporcionado' }
    )};

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ profile: mockUser.profile });
  } catch (error) {
    console.error('Error de token en user-service:', error.message);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`User Service corriendo en http://localhost:${PORT}`);
});
