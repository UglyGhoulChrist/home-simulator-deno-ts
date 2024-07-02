import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';

export class Cat extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Метод для еды
    private _eat(): boolean {
        const foodNeeded = 5;
        if (this.houseName.food >= foodNeeded) {
            this.houseName.takeFood(foodNeeded);
            this.houseName.incrementEatenFood(foodNeeded);
            this.changeSatiety(20);
            return true;
        } else {
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
            return false;
        }
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

        while (activities.length) {
            const selectedActivity: IWeightedMethod = MethodSelector
                .selectMethodByWeight(activities);

            // Попытка выполнить выбранное действие
            if (selectedActivity.method.call(this)) {
                // Логирование действия, если оно выполнено успешно
                Log.yellow(`${this.name} ${selectedActivity.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива activities
                activities.splice(activities.indexOf(selectedActivity), 1);
            }
        }
    }
}
