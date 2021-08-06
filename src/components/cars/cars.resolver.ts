import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { NewCarInput } from './dto/new-car.input';
import { Car } from './entities/car';

@Resolver()
export class CarsResolver {
  constructor(private carsService: CarsService) {}

  @Query(() => [Car])
  public async cars(): Promise<Car[]> {
    return await this.carsService.getAllCars().catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Car)
  public async addNewCar(
    @Args('newCarData') newCarInput: NewCarInput,
  ): Promise<Car> {
    return await this.carsService.addCar(newCarInput).catch((err) => {
      throw err;
    });
  }
}
