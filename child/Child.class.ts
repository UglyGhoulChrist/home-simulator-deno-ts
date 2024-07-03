import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

export class Child extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Метод для еды
    private _eat(): boolean {
        const foodNeeded: number = 10;
        const increaseHappines: number = 20;
        return super.eat(foodNeeded, increaseHappines);
    }

    // Метод для сна
    private _sleep(): boolean {
        this.changeSatiety(-10);
        return true;
    }

    // Метод для игры
    private _play(): boolean {
        this.changeSatiety(-10);
        return true;
    }

    // Метод для поглаживания кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Метод для посещения бабушки и дедушки
    private _visitGrandparents(): boolean {
        this.changeSatiety(100);
        this.changeHappiness(100);
        return true;
    }

    // Метод для случайного выбора ежедневного действия
    public randomDailyActivity(): void {
        const activities = [
            { method: this._sleep, description: 'поспал', weight: 3 },
            { method: this._play, description: 'поиграл', weight: 3 },
        ];

        if (this.satiety <= 20) {
            activities.push({
                method: this._visitGrandparents,
                description: 'сходил к бабушке и дедушке покушать',
                weight: 30,
            });
        } else {
            activities.push({
                method: this._eat,
                description: 'поел',
                weight: 3,
            });
        }

        // Проверка наличия кота в доме
        const hasCat: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Cat
        );

        // Если кот есть, добавляем действие petCat в список возможных действий
        if (hasCat) {
            activities.push({
                method: this._petCat,
                description: 'погладил кота',
                weight: 1,
            });
        }

        return super.randomDailyActivity(activities);
    }

    protected logActivity(description: string): void {
        Log.green(description);
    }
}
