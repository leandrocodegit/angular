import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthController } from './AuthController';
@NgModule({
 providers: [
    AuthController,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthController,
    multi: true,
  },
 ],
})
export class InterceptorModule {}