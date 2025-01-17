import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { BreedRepository } from './repository/breed.repository';
import { Breed } from './entities/breed.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private breedsRepository: BreedRepository
  ) {
  }

  async create(createBreedDto: CreateBreedDto) {
    const breed = this.breedsRepository.create(createBreedDto);
    return await this.breedsRepository.save(breed);
  }

  async findAll() {
    return await this.breedsRepository.find();
  }

  /*findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }*/
}
