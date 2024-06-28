import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

enum Action {
    Eat = 'поел',
    Sleep = 'поспал',
    ScratchWallpaper = 'подрал обои',
}

export class Cat extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Публичные методы для изменения уровня сытости
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 5) {
            this.houseName.takeFood(5);
            // Увеличиваю счётчик съеденной еды
            this.houseName.incrementEatenFood(5);
            this.changeSatiety(20);
            return true;
        } else {
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
            return false;
        }
    }

    // Спит
    private _sleep(): boolean {
        this.changeSatiety(-5);
        return true;
    }

    // Рвёт обои
    private _scratchWallpaper(): boolean {
        this.changeSatiety(-5);
        this.houseName.increaseDirtLevel(5);
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
            Log.yellow(`${this.name} ${randomAction}`);
        }
    }

    // Метод для выполнения действия на основе Enum
    private performAction(action: Action): boolean {
        switch (action) {
            case Action.Eat:
                return this._eat();
            case Action.Sleep:
                return this._sleep();
            case Action.ScratchWallpaper:
                return this._scratchWallpaper();
            default:
                return false;
        }
    }
}
