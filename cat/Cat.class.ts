import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

export class Cat extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Метод для еды
    private _eat(): boolean {
        const foodNeeded: number = 5;
        const increaseHappines: number = 20;
        return super.eat(foodNeeded, increaseHappines);
    }

    // Метод для сна
    private _sleep(): boolean {
        this.changeSatiety(-5);
        return true;
    }

    // Метод для порчи обоев
    private _scratchWallpaper(): boolean {
        this.changeSatiety(-5);
        this.houseName.increaseDirtLevel(5);
        return true;
    }

    // Метод для охоты и драк
    private _huntAndFight(): boolean {
        this.changeSatiety(100);
        this.changeHappiness(100);
        return true;
    }

    // Метод для случайного выбора ежедневного действия
    public randomDailyActivity(): void {
        const activities = [
            { method: this._sleep, description: 'поспал', weight: 5 },
            {
                method: this._scratchWallpaper,
                description: 'подрал обои',
                weight: 2,
            },
        ];

        if (this.houseName.food <= 20) {
            activities.push({
                method: this._huntAndFight,
                description:
                    'половил мышей на улице и подрался с соседскими котами',
                weight: 30,
            });
        } else {
            activities.push({
                method: this._eat,
                description: 'поел',
                weight: 3,
            });
        }

        return super.randomDailyActivity(activities);
    }

    protected logActivity(description: string): void {
        Log.yellow(description);
    }
}
