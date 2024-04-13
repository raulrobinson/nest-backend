import { Cat } from '../entities/cat.entity';
import { Repository } from 'typeorm';

export class CatRepository extends Repository<Cat> {}
