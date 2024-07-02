import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Husband } from '../husband/Husband.class.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';

export class Wife extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Метод для еды
    private _eat(): boolean {
        const foodNeeded = 20;
        if (this.houseName.food >= foodNeeded) {
            this.houseName.takeFood(foodNeeded);
            this.houseName.incrementEatenFood(foodNeeded);
            this.changeSatiety(30);
            return true;
        } else {
            Log.red(`${this.name} хотела поесть, но дома закончилась еда!`);
            return false;
        }
    }

    // Метод для покупки продуктов
    private _buyGroceries(): boolean {
        const cost = 50;
        if (this.houseName.money >= cost) {
            this.houseName.takeMoney(cost);
            this.houseName.addFood(cost);
            this.changeSatiety(-10);
            return true;
        } else {
            Log.red(
                `${this.name} хотела купить еды, но дома закончились деньги!`,
            );
            return false;
        }
    }

    // Метод для покупки шубы
    private _buyFurCoat(): boolean {
        const cost = 300;
        if (this.houseName.money >= cost) {
            this.houseName.takeMoney(cost);
            this.changeHappiness(100);
            this.changeSatiety(-10);
            this.houseName.incrementFurCoatsBought();
            return true;
        } else {
            Log.red(
                `${this.name} хотела купить шубу, но дома закончились деньги!`,
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

    // Метод для поглаживания кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Метод для похода на работу
    private _goToWork(): boolean {
        this.changeSatiety(-10);
        this.houseName.addMoney(250);
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
                method: this._buyGroceries,
                description: 'купила продукты',
                weight: 3,
            },
            { method: this._buyFurCoat, description: 'купила шубу', weight: 1 },
            {
                method: this._cleanHouse,
                description: 'убралась в доме',
                weight: 2,
            },
        ];

        if (this.satiety <= 20) {
            activities.push({
                method: this._visitParents,
                description: 'сходила к родителям покушать',
                weight: 30,
            });
        } else {
            activities.push({
                method: this._eat,
                description: 'поела',
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
                description: 'погладила кота',
                weight: 3,
            });
        }

        // Проверка наличия мужа в доме
        const hasHusband: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Husband
        );

        // Если мужа нет, добавляем действие goToWork в список возможных действий
        if (!hasHusband) {
            activities.push({
                method: this._goToWork,
                description: 'сходила на работу',
                weight: 3,
            });
        }

        while (activities.length) {
            const selectedActivity: IWeightedMethod = MethodSelector
                .selectMethodByWeight(activities);

            // Попытка выполнить выбранное действие
            if (selectedActivity.method.call(this)) {
                // Логирование действия, если оно выполнено успешно
                Log.magenta(`${this.name} ${selectedActivity.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива activities
                activities.splice(activities.indexOf(selectedActivity), 1);
            }
        }
    }
}
