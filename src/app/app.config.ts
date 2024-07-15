import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UserService } from './user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UserService
  ]
};
