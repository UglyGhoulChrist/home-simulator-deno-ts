import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

enum Action {
    Eat = 'поела',
    BuyGroceries = 'купила продукты',
    BuyFurCoat = 'купила шубу',
    CleanHouse = 'убралась в доме',
}

export class Wife extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Публичные методы для изменения уровня сытости и счастья
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }

    public changeHappiness(amount: number): void {
        super.changeHappiness(amount);
    }

    public checkSatietyAndHappiness(): void {
        super.checkSatietyAndHappiness();
    }

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 20) {
            this.houseName.takeFood(20);
            this.changeSatiety(30);
            return true;
        } else {
            Log.warn(`${this.name} хотела поесть, но дома мало еды`);
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
            Log.warn(`${this.name} хотела купить еды, но дома мало денег`);
            return false;
        }
    }

    // Покупка шубы
    private _buyFurCoat(): boolean {
        if (this.houseName.money >= 300) {
            this.houseName.takeMoney(300);
            this.changeHappiness(100);
            this.changeSatiety(-10);
            return true;
        } else {
            Log.warn(`${this.name} хотела купить шубу, но дома мало денег`);
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

    // Случайный выбор ежедневного действия
    public randomDailyActivity(): void {
        const actions: Action[] = Object.values(Action);
        const randomIndex: number = Math.floor(Math.random() * actions.length);
        const randomAction: Action = actions[randomIndex];

        // Попытка выполнить выбранное действие
        const actionPerformed: boolean = this.performAction(randomAction);

        // Логирование действия, если оно выполнено успешно
        if (actionPerformed) {
            Log.magenta(`${this.name} ${randomAction}`);
            this.checkSatietyAndHappiness();
        }
    }

    // Метод для выполнения действия на основе Enum
    private performAction(action: Action): boolean {
        switch (action) {
            case Action.Eat:
                return this._eat();
            case Action.BuyGroceries:
                return this._buyGroceries();
            case Action.BuyFurCoat:
                return this._buyFurCoat();
            case Action.CleanHouse:
                return this._cleanHouse();
            default:
                return false;
        }
    }
}
