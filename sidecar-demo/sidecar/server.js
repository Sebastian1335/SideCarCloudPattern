const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

app.use(express.json());

//simulación de token
const userServiceUrl = 'http://localhost:3002'; // URL del User Service

app.post('/user-service/login', async (req, res) => {
  try {
      const response = await axios.post(`${userServiceUrl}/login`, req.body);
      res.json(response.data);
      console.log("se envio un token")
  } catch (error) {
      res.status(error.response?.status || 500).json({ message: error.response?.data || 'Internal Server Error' });
  }
});


app.get('/user-service/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token){
    console.log('token no proporcionado en la solicitud de perfil');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  try{
    const response = await axios.get(`${userServiceUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data)
    console.log("Datos de perfil enviados")
  } catch (error) {
    console.error('Error al obtener el perfil desde user-service:', error.message);
    res.status(error.response?.status || 500).json({ message: error.response?.data || 'Error al obtener el perfil' });
    console.log("Solicitud de perfil denegada")
  }


});




app.post('/monitor', (req, res) => {
  console.log('Sidecar received request:', req.body);
  res.status(200).send('Request logged by Sidecar!');
});

app.listen(PORT, () => {
  console.log(`Sidecar listening on port ${PORT}`);
});