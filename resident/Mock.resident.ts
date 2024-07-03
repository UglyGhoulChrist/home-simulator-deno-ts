import { IHouse } from '../house/House.interface.ts';
import { Resident } from './Resident.class.ts';

// Создаю MOCK класса Resident для тестирования
export class MockResident extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    public mockChangeSatiety(amount: number): void {
        super.changeSatiety(amount);
    }

    public mockChangeHappiness(amount: number): void {
        super.changeHappiness(amount);
    }

    public mockCheckSatietyAndHappiness() {
        super.checkSatietyAndHappiness();
    }

    public randomDailyActivity(): void { }

    protected logActivity(): void { }
}
