import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';
import {
    IWeightedMethod,
    MethodSelector,
} from '../utils/MethodSelector.class.ts';

export class Husband extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    // Ест
    private _eat(): boolean {
        if (this.houseName.food >= 30) {
            this.houseName.takeFood(30);
            // Увеличиваю счётчик съеденной еды
            this.houseName.incrementEatenFood(30);
            this.changeSatiety(30);
            return true;
        } else {
            Log.red(`${this.name} хотел поесть, но дома закончилась еда!`);
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

    // Поглаживание кота
    private _petCat(): boolean {
        this.changeHappiness(5);
        return true;
    }

    // Метод случайным образом выбирает что сегодня будет делать жена
    public randomDailyActivity(): void {
        const methods = [
            { method: this._eat, description: 'поел', weight: 2 },
            {
                method: this._goToWork,
                description: 'сходил на работу',
                weight: 3,
            },
            { method: this._playWoT, description: 'поиграл в WoT', weight: 1 },
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
                weight: 4,
            });
        }

        const selectedMethod: IWeightedMethod = MethodSelector
            .selectMethodByWeight(methods);

        // Попытка выполнить выбранное действие
        const actionPerformed: boolean = selectedMethod.method.call(this);

        // Логирование действия, если оно выполнено успешно
        if (actionPerformed) {
            Log.blue(`${this.name} ${selectedMethod.description}`);
            this.checkSatietyAndHappiness();
        }
    }
}
