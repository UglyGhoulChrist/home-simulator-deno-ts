import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

enum Action {
    Eat = 'поел',
    Sleep = 'поспал',
    Play = 'поиграл',
}

export class Child extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Публичные методы для изменения уровня сытости
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 10) {
            this.houseName.takeFood(10);
            // Увеличиваю счётчик съеденной еды 
            this.houseName.incrementEatenFood(10);
            this.changeSatiety(20);
            return true;
        } else {
            Log.warn(`${this.name} хотел поесть, но дома мало еды`);
            return false;
        }
    }

    // Спит
    private _sleep(): boolean {
        this.changeSatiety(-10);
        return true;
    }

    // Играет
    private _play(): boolean {
        this.changeSatiety(-10);
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
            Log.green(`${this.name} ${randomAction}`);
            this.checkSatietyAndHappiness();
        }
    }

    // Метод для выполнения действия на основе Enum
    private performAction(action: Action): boolean {
        switch (action) {
            case Action.Eat:
                return this._eat();
            case Action.Sleep:
                return this._sleep();
            case Action.Play:
                return this._play();
            default:
                return false;
        }
    }
}
