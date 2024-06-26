import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

enum Action {
    Eat = 'поел',
    GoToWork = 'сходил на работу',
    PlayWoT = 'поиграл в WoT',
}

export class Husband extends Resident {
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

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 30) {
            this.houseName.takeFood(30);
            this.changeSatiety(30);
            return true;
        } else {
            Log.warn(`${this.name} хотел поесть, но дома мало еды`);
            return false;
        }
    }

    // Ходит на работу
    private _goToWork(): boolean {
        this.changeSatiety(-10);
        this.houseName.addMoney(250);
        return true;
    }

    // Играет в WoT
    private _playWoT(): boolean {
        this.changeSatiety(-10);
        this.changeHappiness(20);
        return true;
    }

    // Метод случайным образом выбирает что сегодня будет делать жена
    public randomDailyActivity(): void {
        const actions: Action[] = Object.values(Action);
        const randomIndex: number = Math.floor(Math.random() * actions.length);
        const randomAction: Action = actions[randomIndex];

        // Попытка выполнить выбранное действие
        const actionPerformed: boolean = this.performAction(randomAction);

        // Логирование действия, если оно выполнено успешно
        if (actionPerformed) {
            Log.blue(`${this.name} ${randomAction}`);
            this.checkSatietyAndHappiness();
        }
    }

    // Метод для выполнения действия на основе Enum
    private performAction(action: Action): boolean {
        switch (action) {
            case Action.Eat:
                return this._eat();
            case Action.GoToWork:
                return this._goToWork();
            case Action.PlayWoT:
                return this._playWoT();
            default:
                return false;
        }
    }
}
