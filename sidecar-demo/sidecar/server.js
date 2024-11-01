const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

app.use(express.json());

//simulación de token
const userServiceUrl = 'http://localhost:3002'; // URL del User Service

app.post('/user-service/login', async (req, res) => {
  try {
      // Aquí puedes incluir lógica adicional para manejar la autenticación
      // Por ejemplo, validar las credenciales
      const { username, password } = req.body;

      // Aquí se simula un token de autenticación para el ejemplo
      if (username === 'admin' && password === 'password') {
          const token = 'Secreto';
          res.json({ token }); // Retorna un token simulado
          console.log(`Token enviado '${token}'`)
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
          console.log(`Se denegó un acceso`)
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/user-service/profile', (req, res) => {
  const token = req.headers.authorization;
  // Aquí debes validar el token y retornar el perfil correspondiente
  if (token === 'Secreto') { // Simulando validación de token
      res.json({ username: 'Sebastián', email: 'correo@servidor.com' });
      console.log(`Solicitud de perfil realizada`)
  } else {
      res.status(401).json({ message: 'Unauthorized' });
      console.log(`Solicitud de perfil denegada`)
  }
});




app.post('/monitor', (req, res) => {
  console.log('Sidecar received request:', req.body);
  res.status(200).send('Request logged by Sidecar!');
});

app.listen(PORT, () => {
  console.log(`Sidecar listening on port ${PORT}`);
});