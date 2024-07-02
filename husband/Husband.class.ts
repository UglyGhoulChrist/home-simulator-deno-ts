import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';
import { Wife } from '../wife/Wife.class.ts';

export class Husband extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Метод для еды
    private _eat(): boolean {
        const foodNeeded = 30;
        if (this.houseName.food >= foodNeeded) {
            this.houseName.takeFood(foodNeeded);
            this.houseName.incrementEatenFood(foodNeeded);
            this.changeSatiety(30);
            return true;
        } else {
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
            return false;
        }
    }

    // Метод для похода на работу
    private _goToWork(): boolean {
        this.changeSatiety(-10);
        this.houseName.addMoney(250);
        return true;
    }

    // Метод для игры в WoT
    private _playWoT(): boolean {
        this.changeSatiety(-10);
        this.changeHappiness(20);
        return true;
    }

    // Метод для поглаживания кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Метод для покупки продуктов
    private _buyGroceries(): boolean {
        if (this.houseName.food <= 20 && this.houseName.money >= 100) {
            this.houseName.takeMoney(100);
            this.houseName.addFood(100);
            this.changeSatiety(-10);
            return true;
        } else if (this.houseName.money >= 50) {
            this.houseName.takeMoney(50);
            this.houseName.addFood(50);
            this.changeSatiety(-10);
            return true;
        } else {
            Log.red(
                `${this.name} хотел купить еды, но дома закончились деньги!`,
            );
            return false;
        }
    }

    // Метод для генеральной уборки дома
    private _cleanHouse(): boolean {
        this.changeSatiety(-10);
        this.changeHappiness(10);
        this.houseName.cleanHouse();
        return true;
    }

    // Метод для посещения родителей
    private _visitParents(): boolean {
        this.changeSatiety(50);
        this.changeHappiness(20);
        return true;
    }

    // Метод для случайного выбора ежедневного действия
    public randomDailyActivity(): void {
        const activities = [
            {
                method: this._goToWork,
                description: 'сходил на работу',
                weight: 3,
            },
            { method: this._playWoT, description: 'поиграл в WoT', weight: 1 },
        ];

        if (this.satiety <= 20) {
            activities.push({
                method: this._visitParents,
                description: 'сходил к родителям покушать',
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
                weight: 4,
            });
        }

        // Проверка наличия жены в доме
        const hasWife: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Wife
        );

        // Если жены нет, добавляем действия buyGroceries и cleanHouse в список возможных действий
        if (!hasWife) {
            activities.push({
                method: this._buyGroceries,
                description: 'купил продукты',
                weight: 3,
            });
            activities.push({
                method: this._cleanHouse,
                description: 'убрался в доме',
                weight: 3,
            });
        }

        while (activities.length) {
            const selectedActivity: IWeightedMethod = MethodSelector
                .selectMethodByWeight(activities);

            // Попытка выполнить выбранное действие
            if (selectedActivity.method.call(this)) {
                // Логирование действия, если оно выполнено успешно
                Log.blue(`${this.name} ${selectedActivity.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива activities
                activities.splice(activities.indexOf(selectedActivity), 1);
            }
        }
    }
}
