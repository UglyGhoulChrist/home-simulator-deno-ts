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

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 20) {
            this.houseName.takeFood(20);
            // Увеличиваю счётчик съеденной еды
            this.houseName.incrementEatenFood(20);
            this.changeSatiety(30);
            return true;
        } else {
            Log.red(`${this.name} хотела поесть, но дома закончилась еда!`);
            return false;
        }
    }

    // Покупка продуктов
    private _buyGroceries(): boolean {
        if (this.houseName.money >= 50) {
            this.houseName.takeMoney(50);
            this.houseName.addFood(50);
            this.changeSatiety(-10);
            return true;
        } else {
            Log.red(
                `${this.name} хотела купить еды, но дома закончились деньги!`,
            );
            return false;
        }
    }

    // Покупка шубы
    private _buyFurCoat(): boolean {
        if (this.houseName.money >= 300) {
            this.houseName.takeMoney(300);
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

    // Генеральная уборка дома
    private _cleanHouse(): boolean {
        this.changeSatiety(-10);
        this.changeHappiness(10);
        this.houseName.cleanHouse();
        return true;
    }

    // Поглаживание кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Ходит на работу
    private _goToWork(): boolean {
        this.changeSatiety(-10);
        this.houseName.addMoney(250);
        return true;
    }

    // Случайный выбор ежедневного действия
    public randomDailyActivity(): void {
        const methods = [
            { method: this._eat, description: 'поела', weight: 2 },
            {
                method: this._buyGroceries,
                description: 'купила продукты',
                weight: 3,
            },
            {
                method: this._buyFurCoat,
                description: 'купила шубу',
                weight: 1,
            },
            {
                method: this._cleanHouse,
                description: 'убралась в доме',
                weight: 1,
            },
        ];

        // Проверка наличия кота в доме
        const hasCat: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Cat
        );

        // Если кот есть, добавляем действие PetCat в список возможных действий
        if (hasCat) {
            methods.push({
                method: this._petCat,
                description: 'погладила кота',
                weight: 3,
            });
        }

        // Проверка наличия мужа в доме
        const hasHusband: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Husband
        );

        // Если мужа нет, добавляем действие GoToWork в список возможных действий
        if (!hasHusband) {
            methods.push({
                method: this._goToWork,
                description: 'сходила на работу',
                weight: 3,
            });
        }

        while (methods.length) {
            const selectedMethod: IWeightedMethod = MethodSelector
                .selectMethodByWeight(methods);

            // Попытка выполнить выбранное действие
            if (selectedMethod.method.call(this)) {
                // Логирование действия, если оно выполнено успешно
                Log.magenta(`${this.name} ${selectedMethod.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива methods
                methods.splice(methods.indexOf(selectedMethod), 1);
            }
        }
    }
}
