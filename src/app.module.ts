import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'my-mysql',
      autoLoadEntities: true,
      synchronize: true,
      //entities: [__dirname + "/**/*.entity{.ts,.js}"],
      //synchronize: true
    }), TodosModule, CatsModule, BreedsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
