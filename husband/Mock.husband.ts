import { IHouse } from '../house/House.interface.ts';
import { Husband } from './Husband.class.ts';

// Создаю MOCK класса Husband для тестирования
export class MockHusband extends Husband {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }
    public changeHappiness(amount: number): void {
        super.changeHappiness(amount);
    }
}
