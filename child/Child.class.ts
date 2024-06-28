import { Cat } from '../cat/Cat.class.ts';
import { IHouse } from '../house/House.interface.ts';
import { Resident } from '../resident/Resident.class.ts';
import { Log } from '../utils/Log.class.ts';

enum Action {
    Eat = 'поел',
    Sleep = 'поспал',
    Play = 'поиграл',
    PetCat = 'погладила кота', //! Должен быть последним
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
        const actions: Action[] = Object.values(Action);

        // Проверка наличия кота в доме
        const hasCat: boolean = this.houseName.residents.some((resident) =>
            resident instanceof Cat
        );

        // Если кота нет, убираем действие PetCat из списка возможных действий
        if (!hasCat) {
            const index: number = actions.indexOf(Action.PetCat);
            if (index > -1) {
                actions.splice(index, 1);
            }
        }

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
            case Action.PetCat:
                return this._petCat();
            default:
                return false;
        }
    }
}
