import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

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

    // Случайный выбор ежедневного действия
    public randomDailyActivity(): void {
        const methods = [
            { method: this._eat, description: 'поел' },
            { method: this._buyGroceries, description: 'купила продукты' },
            { method: this._buyFurCoat, description: 'купила шубу' },
            { method: this._cleanHouse, description: 'убралась в доме' },
        ];

        // Проверка наличия кота в доме
        const hasCat: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Cat
        );

        // Если кот есть, добавляем действие PetCat в список возможных действий
        if (hasCat) {
            methods.push({
                method: this._petCat,
                description: 'погладил(а) кота',
            });
        }

        const randomMethod =
            methods[Math.floor(Math.random() * methods.length)];

        // Попытка выполнить выбранное действие
        const actionPerformed: boolean = randomMethod.method.call(this);

        // Логирование действия, если оно выполнено успешно
        if (actionPerformed) {
            Log.magenta(`${this.name} ${randomMethod.description}`);
            this.checkSatietyAndHappiness();
        }
    }
}
