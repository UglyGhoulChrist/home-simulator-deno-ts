import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

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
            { method: this._eat, description: 'поел' },
            { method: this._sleep, description: 'поспал' },
            { method: this._play, description: 'поиграл' },
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
            Log.green(`${this.name} ${randomMethod.description}`);
            this.checkSatietyAndHappiness();
        }
    }
}
