import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewCarInput } from './dto/new-car.input';
import { Car } from './entities/car';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carReposioty: Repository<Car>) {}

  public async getAllCars(): Promise<Car[]> {
    return await this.carReposioty.find({}).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async addCar(newCarData: NewCarInput): Promise<Car> {
    const newCar = this.carReposioty.create(newCarData);
    await this.carReposioty.save(newCar).catch(() => {
      new InternalServerErrorException();
    });
    return newCar;
  }
}
