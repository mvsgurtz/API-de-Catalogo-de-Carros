import { prisma } from "../database/prsima";
import { AppError } from "../errors/AppError";
import { Car, CarCreate, CarUpdate } from "../interfaces/car.interface";
import { carSchema } from "../schemas/car.schema";

export class CarServices {
  create = async (data: CarCreate): Promise<Car> => {
    const car = await prisma.car.create({ data: data });
    return car;
  };
  getMany = async (): Promise<Array<Car>> => {
    const cars = await prisma.car.findMany();
    return cars;
  };
  getOne = async (carId: string): Promise<Car | null> => {
    const uniqueCar = await prisma.car.findFirst({ where: { id: carId } });
    if (uniqueCar) {
      return carSchema.parse(uniqueCar);
    } else {
      throw new AppError(404, "Car not found");
    }
  };
  update = async (carId: string, data: CarUpdate): Promise<Car> => {
    try {
      const updatedCar = await prisma.car.update({
        where: { id: carId },
        data: data,
      });
      return carSchema.parse(updatedCar);
    } catch (error) {
      throw new AppError(404, "Car not found");
    }
  };

  delete = async (carId: string) => {
    try {
      await prisma.car.delete({ where: { id: carId } });
      return "deleted successfully";
    } catch (error) {
      throw new AppError(404, "Car not found");
    }
  };
}
