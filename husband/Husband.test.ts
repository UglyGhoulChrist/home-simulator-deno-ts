import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockHusband } from './Mock.husband.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    mockHusband.changeSatiety(20);
    assertStrictEquals(mockHusband.satiety, 50);
    mockHusband.changeSatiety(-10);
    assertStrictEquals(mockHusband.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    mockHusband.changeHappiness(-30);
    assertStrictEquals(mockHusband.happiness, 70);
    mockHusband.changeHappiness(20);
    assertStrictEquals(mockHusband.happiness, 90);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    const result = mockHusband['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockHusband.satiety, 60);
    assertStrictEquals(mockHouse.food, 20);
});

Deno.test('Проверяю, что муж не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    mockHouse.takeFood(30);
    const result = mockHusband['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockHusband.satiety, 30);
    assertStrictEquals(mockHouse.food, 20);
});

Deno.test('Проверяю, как муж ходит на работу', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    const result = mockHusband['_goToWork']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockHusband.satiety, 20);
    assertStrictEquals(mockHouse.money, 350);
});

Deno.test('Проверяю, как муж играет в WoT', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    mockHusband.changeHappiness(-50);
    const result = mockHusband['_playWoT']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockHusband.satiety, 20);
    assertStrictEquals(mockHusband.happiness, 70);
});

Deno.test('Проверяю, что муж может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockHusband = new MockHusband('Тестовый муж', mockHouse);
    mockHusband.changeHappiness(-50);
    mockHouse.addMoney(300);
    mockHusband.randomDailyActivity();
    // Проверка, что уровень сытости или счастья изменился
    assertStrictEquals(
        mockHusband.satiety !== 30 || mockHusband.happiness !== 50,
        true,
    );
});
