import { IHouse } from '../house/House.interface.ts';
import { Resident } from './Resident.class.ts';

// Создаю MOCK класса Resident для тестирования
export class MockResident extends Resident {
    constructor(name: string, house: IHouse) {
        super(name, house);
    }

    public mockChangeSatiety(amount: number): void {
        this.changeSatiety(amount);
    }

    public mockChangeHappiness(amount: number): void {
        this.changeHappiness(amount);
    }

    public mockCheckSatietyAndHappiness() {
        this.checkSatietyAndHappiness();
    }

    public randomDailyActivity(): void {}
}
