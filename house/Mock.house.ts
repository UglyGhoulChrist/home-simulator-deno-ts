import { House } from './House.class.ts';

// Создаю MOCK класса House для тестирования
export class MockHouse extends House {
    constructor(name: string) {
        super(name);
    }
}
