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

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 5) {
            this.houseName.takeFood(5);
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
        const methods = [
            { method: this._eat, description: 'поел', weight: 3 },
            { method: this._sleep, description: 'поспал', weight: 5 },
            {
                method: this._scratchWallpaper,
                description: 'подрал обои',
                weight: 2,
            },
        ];

        while (methods.length) {
            const selectedMethod: IWeightedMethod = MethodSelector
                .selectMethodByWeight(methods);

            // Попытка выполнить выбранное действие
            if (selectedMethod.method.call(this)) {
                // Логирование действия, если оно выполнено успешно
                Log.yellow(`${this.name} ${selectedMethod.description}`);
                this.checkSatietyAndHappiness();
                break;
            } else {
                // Удаление выбранного метода из массива methods
                methods.splice(methods.indexOf(selectedMethod), 1);
            }
        }
    }
}
