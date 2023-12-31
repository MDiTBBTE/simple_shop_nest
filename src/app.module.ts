import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/simple_shop'),
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
