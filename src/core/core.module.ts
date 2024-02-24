import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: '...',
              port: 5432,
              username: '...',
              password: '...',
              autoLoadEntities: true,
              synchronize: true,
            }),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
