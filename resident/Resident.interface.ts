import { IHouse } from '../house/House.interface.ts';

export interface IResident {
    // Имя жителя
    readonly name: string;
    // Дом, где прописан
    houseName: IHouse;
    // Уровень сытости (от 0 до 100, в начале - 30)
    satiety: number;
    // Уровень счастья (от 0 до 100, в начале - 100)
    happiness: number;
    // Получение информации о жителе
    residentInfo: string;
    // Случайный выбор ежедневного действия
    // randomDailyActivity: () => void;
}
