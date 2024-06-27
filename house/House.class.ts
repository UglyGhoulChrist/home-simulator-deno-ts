import { Log } from '../utils/Log.class.ts';
import { IHouse } from './House.interface.ts';
import { IResident } from '../resident/Resident.interface.ts';

export class House implements IHouse {
    // Название дома
    private readonly _name: string;
    // Список жителей дома
    private _residents: IResident[] = [];
    // Уровень грязи в доме (от 0 до 100)
    private _dirtLevel: number = 0;
    // Количество денег в доме (от 0 до бесконечности)
    private _money: number = 100;
    // Количество еды в холодильнике (от 0 до 100)
    private _food: number = 50;
    // Общее количество заработанных денег
    private _totalEarnedMoney: number = 0;
    // Общее количество съеденной еды
    private _totalEatenFood: number = 0;
    // общее количество купленных шуб
    private _totalFurCoatsBought: number = 0;

    constructor(name: string) {
        this._name = name;
    }

    // Получение информации о доме
    public get houseInfo(): string {
        const residentsToString = this._residents.length
            ? `жильцы: ${
                this._residents.map((resident) => resident.name).join(', ')
            }`
            : 'жильцов пока нет';
        return `Дом: ${this.name}, ${residentsToString}, деньги: ${this.money}, еда: ${this.food}, грязь: ${this.dirtLevel}`;
    }

    // Получение названия дома
    public get name(): string {
        return this._name;
    }

    // Получение списка жителей
    public get residents(): IResident[] {
        return this._residents;
    }

    // Заселение жителя
    public addResident(resident: IResident): void {
        this._residents.push(resident);
    }

    // Выселение жителя
    public removeResident(resident: IResident): void {
        this._residents = this._residents.filter((r) => r !== resident);
    }

    // Получение количества денег в доме
    public get money(): number {
        return this._money;
    }

    // Добавление денег в дом
    public addMoney(amount: number): void {
        if (amount < 0) {
            return Log.error('Некорректное значение изменения денег!');
        }
        this._money += amount;
        this.incrementEarnedMoney(amount);
    }

    // Взятие денег из дома
    public takeMoney(amount: number): void {
        if (amount < 0) {
            return Log.error('Некорректное значение изменения денег!');
        }
        if (amount <= this._money) {
            this._money -= amount;
        } else {
            Log.warn('Недостаточно денег!');
        }
    }

    // Получение количества еды в холодильнике
    public get food(): number {
        return this._food;
    }

    // Добавление еды в холодильник
    public addFood(amount: number): void {
        if (amount < 0) {
            return Log.error('Некорректное значение изменения еды!');
        }
        this._food = Math.min(this._food + amount, 100);
    }

    // Взятие еды из холодильника
    public takeFood(amount: number): void {
        if (amount < 0) {
            return Log.error('Некорректное значение изменения еды!');
        }
        if (amount <= this._food) {
            this._food -= amount;
        } else {
            Log.warn('Недостаточно еды!');
        }
    }

    // Получение уровня грязи
    public get dirtLevel(): number {
        return this._dirtLevel;
    }

    // Увеличение уровня грязи
    public increaseDirtLevel(amount: number): void {
        if (amount <= 0) {
            return Log.error('Некорректное значение изменения уровня грязи!');
        }
        this._dirtLevel += amount;
        this.checkDirtLevel();
    }

    // Генеральная уборка
    public cleanHouse(): void {
        this._dirtLevel = 0;
    }

    // Проверка уровня грязи
    private checkDirtLevel(): void {
        if (this._dirtLevel >= 100) {
            Log.warn('Уровень грязи превышен!');
            this._dirtLevel = Math.min(this._dirtLevel, 100);
        }
        if (this._dirtLevel >= 90) {
            this.residents.forEach((resident) => {
                // Проверяем, содержит ли resident метод changeHappiness
                if (
                    'changeHappiness' in resident &&
                    typeof resident['changeHappiness'] === 'function'
                ) resident.changeHappiness(-5);
            });
        }
    }

    // Несколько раз в год пропадает половина денег
    private halfMoneyLoss(): void {
        const halfMoney: number = Math.floor(this.money / 2);
        this.takeMoney(halfMoney);
    }

    // Несколько раз в год пропадает половина еды
    private halfFoodLoss(): void {
        const halfFood: number = Math.floor(this.food / 2);
        this.takeFood(halfFood);
    }

    // Увеличение общего количества заработанных денег
    private incrementEarnedMoney(amount: number): void {
        if (amount <= 0) {
            return Log.error(
                'Некорректное значение изменения заработанных денег!',
            );
        }
        this._totalEarnedMoney += amount;
    }

    // Увеличение общего количества съеденной еды
    public incrementEatenFood(amount: number): void {
        if (amount <= 0) {
            return Log.error('Некорректное значение изменения съеденной еды!');
        }
        this._totalEatenFood += amount;
    }

    // Увеличение общего количества купленных шуб
    public incrementFurCoatsBought(): void {
        this._totalFurCoatsBought += 1;
    }

    // Получение общего количества заработанных денег
    public get totalEarnedMoney(): number {
        return this._totalEarnedMoney;
    }

    // Получение общего количества съеденной еды
    public get totalEatenFood(): number {
        return this._totalEatenFood;
    }

    // Получение общего количества купленных шуб
    public get totalFurCoatsBought(): number {
        return this._totalFurCoatsBought;
    }

    // Ежедневное действие
    public dailyActivity() {
        // Ежедневное увеличение уровня грязи
        this._dirtLevel += 5;
        this.checkDirtLevel();

        // Получение случайного числа
        const randomNumber: number = Math.floor(Math.random() * 90) + 1;
        // Пропадает половина денег
        if (randomNumber === 10) {
            this.halfMoneyLoss();
            Log.warn('Пропала половина денег!');
        }
        // Пропадает половина еды
        if (randomNumber === 20) {
            this.halfFoodLoss();
            Log.warn('Пропала половина еды!');
        }
        Log.dim(this.houseInfo);
    }
}
