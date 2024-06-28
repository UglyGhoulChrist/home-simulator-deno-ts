import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { Wife } from './Wife.class.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    wife.changeSatiety(20);
    assertStrictEquals(wife.satiety, 50);
    wife.changeSatiety(-10);
    assertStrictEquals(wife.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    wife.changeHappiness(-30);
    assertStrictEquals(wife.happiness, 70);
    wife.changeHappiness(20);
    assertStrictEquals(wife.happiness, 90);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    const result = wife['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(wife.satiety, 60);
    assertStrictEquals(mockHouse.food, 30);
});

Deno.test('Проверяю, что жена не должна есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    mockHouse.takeFood(40);
    const result = wife['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(wife.satiety, 30);
    assertStrictEquals(mockHouse.food, 10);
});

Deno.test('Проверяю, что жена может покупать продукты, если у нее достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    const result = wife['_buyGroceries']();
    assertStrictEquals(result, true);
    assertStrictEquals(wife.satiety, 20);
    assertStrictEquals(mockHouse.food, 100);
    assertStrictEquals(mockHouse.money, 50);
});

Deno.test('Проверяю, что жена не может покупать продукты, если у нее не достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    mockHouse.takeMoney(60);
    const result = wife['_buyGroceries']();
    assertStrictEquals(result, false);
    assertStrictEquals(wife.satiety, 30);
    assertStrictEquals(mockHouse.food, 50);
    assertStrictEquals(mockHouse.money, 40);
});

Deno.test('Проверяю, что жена может купить шубу, если у неё достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    mockHouse.addMoney(250);
    const result = wife['_buyFurCoat']();
    assertStrictEquals(result, true);
    assertStrictEquals(wife.satiety, 20);
    wife.checkSatietyAndHappiness();
    assertStrictEquals(wife.happiness, 100);
    assertStrictEquals(mockHouse.money, 50);
});

Deno.test('Проверяю, что жена не может купить шубу, если у неё не достаточно денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    const result = wife['_buyFurCoat']();
    assertStrictEquals(result, false);
    assertStrictEquals(wife.satiety, 30);
    assertStrictEquals(wife.happiness, 100);
    assertStrictEquals(mockHouse.money, 100);
});

Deno.test('Проверяю как жена убирается в доме', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    const result = wife['_cleanHouse']();
    assertStrictEquals(result, true);
    assertStrictEquals(wife.satiety, 20);
    wife.checkSatietyAndHappiness();
    assertStrictEquals(wife.happiness, 100);
    assertStrictEquals(mockHouse.dirtLevel, 0);
});

Deno.test('Проверяю, что жена может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const wife = new Wife('Тестовая жена', mockHouse);
    wife.changeHappiness(-50);
    mockHouse.addMoney(300);
    wife.randomDailyActivity();
    // Проверка, что уровень сытости или счастья изменился
    assertStrictEquals(wife.satiety !== 30 || wife.happiness !== 50, true);
});
