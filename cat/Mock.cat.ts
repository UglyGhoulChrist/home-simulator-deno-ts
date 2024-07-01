import { IHouse } from '../house/House.interface.ts';
import { Cat } from './Cat.class.ts';

// Создаю MOCK класса Cat для тестирования
export class MockCat extends Cat {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }
}
