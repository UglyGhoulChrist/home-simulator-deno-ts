import { IResident } from '../resident/Resident.interface.ts';

export interface IHouse {
    // Название дома
    readonly name: string;
    // Список жителей дома
    residents: IResident[];
    // Уровень грязи в доме (от 0 до 100)
    dirtLevel: number;
    // Количество денег в доме (от 0 до бесконечности)
    money: number;
    // Количество еды в холодильнике (от 0 до 100)
    food: number;

    // Общее количество заработанных денег
    totalEarnedMoney: number;
    // Общее количество съеденной еды
    totalEatenFood: number;
    // общее количество купленных шуб
    totalFurCoatsBought: number;

    // Заселение жителя
    addResident(resident: IResident): void;
    // Выселение жителя
    removeResident(resident: IResident): void;
    // Добавление денег в дом
    addMoney(amount: number): void;
    // Взятие денег из дома
    takeMoney(amount: number): void;
    // Добавление еды в холодильник
    addFood(amount: number): void;
    // Взятие еды из холодильника
    takeFood(amount: number): void;
    // Увеличение уровня грязи
    increaseDirtLevel(amount: number): void;
    // Генеральная уборка
    cleanHouse(): void;

    // Увеличение общего количества съеденной еды
    incrementEatenFood(amount: number): void;
    // Увеличение общего количества купленных шуб
    incrementFurCoatsBought(): void;
    // Ежедневное действие
    dailyActivity(): void;
}
