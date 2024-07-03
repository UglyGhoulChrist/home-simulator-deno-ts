import { Cat } from '../cat/Cat.class.ts';
import { Child } from '../child/Child.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Husband } from '../husband/Husband.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';
import { Wife } from '../wife/Wife.class.ts';
import { IResident } from './Resident.interface.ts';

export abstract class Resident implements IResident {
    // Имя жителя
    private readonly _name: string;
    // Дом, где прописан
    private _house: IHouse;
    // Уровень сытости (от 0 до 100, в начале - 30)
    private _satiety: number = 30;
    // Уровень счастья (от 0 до 100, в начале - 100)
    private _happiness: number = 100;

    // Случайный выбор ежедневного действия
    // public abstract randomDailyActivity(): void;

    constructor(name: string, house: IHouse) {
        this._name = name;
        this._house = house;
    }

    // Получение информации о жителе
    public get residentInfo(): string {
        return `Имя: ${this.name}, дом: ${this._house.name}, сытость: ${this.satiety}, счастье: ${this.happiness}`;
    }

    // Получение имени жителя
    public get name(): string {
        return this._name;
    }

    // Получение имени дома, где поселился
    public get houseName(): IHouse {
        return this._house;
    }

    // Получение уровня сытости
    public get satiety(): number {
        return this._satiety;
    }

    // Изменение уровня сытости
    protected changeSatiety(amount: number): void {
        this._satiety += amount;
    }

    // Получение уровня счастья
    public get happiness(): number {
        return this._happiness;
    }

    // Изменение уровня счастья
    protected changeHappiness(amount: number): void {
        this._happiness += amount;
    }

    // Проверка уровня счастья и сытости
    protected checkSatietyAndHappiness() {
        // Если уровень счастья и (или) уровень сытости < 0, вывожу в консоль
        if (this._satiety <= 0) {
            Log.red(
                `${this.name} покинул(а) дом, сытость упала до опасного уровня`,
            );
            this._house.removeResident(this);
        }
        if (this._happiness <= 0) {
            Log.red(
                `${this.name} покинул(а) дом, счастье упало до опасного уровня`,
            );
            this._house.removeResident(this);
        }
        // Если уровень счастья и (или) уровень сытости > 100, устанавливаю = 100
        this._satiety = Math.min(this._satiety, 100);
        this._happiness = Math.min(this._happiness, 100);
    }

    // Метод для еды
    protected eat(foodNeeded: number, increaseHappines: number): boolean {
        if (this.houseName.food >= foodNeeded) {
            this.houseName.takeFood(foodNeeded);
            this.houseName.incrementEatenFood(foodNeeded);
            this.changeSatiety(increaseHappines);
            return true;
        } else {
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
            return false;
        }
    }

    // Метод для случайного выбора ежедневного действия
    protected randomDailyActivity(
        activities: {
            method: () => boolean;
            description: string;
            weight: number;
        }[],
    ): void {
        while (activities.length) {
            const selectedActivity: IWeightedMethod = MethodSelector
                .selectMethodByWeight(activities);

            // Попытка выполнить выбранное действие
            if (selectedActivity.method.call(this)) {
                // Логирование действия, если оно выполнено успешно

                this.logActivity(
                    `${this.name} ${selectedActivity.description}`,
                );

                // Log.magenta(`${this.name} ${selectedActivity.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива activities
                activities.splice(activities.indexOf(selectedActivity), 1);
            }
        }
    }

    protected abstract logActivity(description: string): void;
}
