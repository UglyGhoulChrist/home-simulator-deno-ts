import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockWife } from './Mock.wife.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockWife.changeSatiety(20);
    assertStrictEquals(mockWife.satiety, 50);
    mockWife.changeSatiety(-10);
    assertStrictEquals(mockWife.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockWife.changeHappiness(-30);
    assertStrictEquals(mockWife.happiness, 70);
    mockWife.changeHappiness(20);
    assertStrictEquals(mockWife.happiness, 90);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    const result = mockWife['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockWife.satiety, 60);
    assertStrictEquals(mockHouse.food, 30);
});

Deno.test('Проверяю, что жена не должна есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockHouse.takeFood(40);
    const result = mockWife['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockWife.satiety, 30);
    assertStrictEquals(mockHouse.food, 10);
});

Deno.test('Проверяю, что жена может покупать продукты, если у нее достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    const result = mockWife['_buyGroceries']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockWife.satiety, 20);
    assertStrictEquals(mockHouse.food, 100);
    assertStrictEquals(mockHouse.money, 50);
});

Deno.test('Проверяю, что жена не может покупать продукты, если у нее не достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockHouse.takeMoney(60);
    const result = mockWife['_buyGroceries']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockWife.satiety, 30);
    assertStrictEquals(mockHouse.food, 50);
    assertStrictEquals(mockHouse.money, 40);
});

Deno.test('Проверяю, что жена может купить шубу, если у неё достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockHouse.addMoney(250);
    const result = mockWife['_buyFurCoat']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockWife.satiety, 20);
    mockWife.checkSatietyAndHappiness();
    assertStrictEquals(mockWife.happiness, 100);
    assertStrictEquals(mockHouse.money, 50);
});

Deno.test('Проверяю, что жена не может купить шубу, если у неё не достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    const result = mockWife['_buyFurCoat']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockWife.satiety, 30);
    assertStrictEquals(mockWife.happiness, 100);
    assertStrictEquals(mockHouse.money, 100);
});

Deno.test('Проверяю как жена убирается в доме', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    const result = mockWife['_cleanHouse']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockWife.satiety, 20);
    mockWife.checkSatietyAndHappiness();
    assertStrictEquals(mockWife.happiness, 100);
    assertStrictEquals(mockHouse.dirtLevel, 0);
});

Deno.test('Проверяю, что жена может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockWife = new MockWife('Тестовая жена', mockHouse);
    mockWife.changeHappiness(-50);
    mockHouse.addMoney(300);
    mockWife.randomDailyActivity();
    // Проверка, что уровень сытости или счастья изменился
    assertStrictEquals(
        mockWife.satiety !== 30 || mockWife.happiness !== 50,
        true,
    );
});
