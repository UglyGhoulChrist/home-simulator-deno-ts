import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';

export class Child extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
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
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
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

    // Поглаживание кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Случайный выбор ежедневного действия
    public randomDailyActivity(): void {
        const methods = [
            { method: this._eat, description: 'поел', weight: .3 },
            { method: this._sleep, description: 'поспал', weight: .2 },
            { method: this._play, description: 'поиграл', weight: .3 },
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
                weight: .2,
            });
        }

        const selectedMethod: IWeightedMethod = MethodSelector
            .selectMethodByWeight(methods);

        // Попытка выполнить выбранное действие
        const actionPerformed: boolean = selectedMethod.method.call(this);

        // Логирование действия, если оно выполнено успешно
        if (actionPerformed) {
            Log.green(`${this.name} ${selectedMethod.description}`);
            this.checkSatietyAndHappiness();
        }
    }
}
