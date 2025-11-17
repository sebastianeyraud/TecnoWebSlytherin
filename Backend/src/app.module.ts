import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { PromotionsModule } from './promotions/promotions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, PromotionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
