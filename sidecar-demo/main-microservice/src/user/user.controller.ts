import { Controller, Get,Post,Headers,Body, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
@Controller('user')
export class UserController {
private readonly sidecarUrl = 'http://localhost:4000'; // URL del Sidecar

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    try {
      const response = await axios.post(`${this.sidecarUrl}/user-service/login`, credentials);
      return response.data; // Retorna el token de autenticación
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  @Get('profile')
  async getProfile(@Headers('Authorization') token: string) {
    try {
      const response = await axios.get(`${this.sidecarUrl}/user-service/profile`, {
        headers: { Authorization: token }, // Pasa el token recibido en el header
      });
      return response.data; // Retorna el perfil del usuario
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

}
