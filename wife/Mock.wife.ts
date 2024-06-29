import { IHouse } from '../house/House.interface.ts';
import { Wife } from './Wife.class.ts';

// Создаю MOCK класса Wife для тестирования
export class MockWife extends Wife {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }
    public changeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }
    public changeHappiness(amount: number): void {
        super.changeHappiness(amount);
    }
    public checkSatietyAndHappiness(): void {
        super.checkSatietyAndHappiness();
    }
}
