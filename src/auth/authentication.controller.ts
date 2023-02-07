import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('valide')
     async loginUser(@Body() token:any): Promise<any> {
      return await this.authenticationService.loginUser(token);
    }
}
