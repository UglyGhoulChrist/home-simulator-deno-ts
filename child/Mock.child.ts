import { IHouse } from '../house/House.interface.ts';
import { Child } from './Child.class.ts';

// Создаю MOCK класса Child для тестирования
export class MockChild extends Child {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }
}
