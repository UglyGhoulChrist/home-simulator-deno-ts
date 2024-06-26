import { IHouse } from '../house/House.interface.ts';
import { Log } from '../utils/Log.class.ts';
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
    public abstract randomDailyActivity(): void;

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
            Log.warn(`${this.name}: сытость <= 0`);
            this._house.removeResident(this);
        }
        if (this._happiness <= 0) {
            Log.warn(`${this.name}: счастье <= 0`);
            this._house.removeResident(this);
        }
        // Если уровень счастья и (или) уровень сытости > 100, устанавливаю = 100
        this._satiety = Math.min(this._satiety, 100);
        this._happiness = Math.min(this._happiness, 100);
    }
}
