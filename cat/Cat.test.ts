import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockHouse } from '../house/Mock.house.ts';
import { MockCat } from './Mock.cat.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    mockCat.changeSatiety(20);
    assertStrictEquals(mockCat.satiety, 50);
    mockCat.changeSatiety(-10);
    assertStrictEquals(mockCat.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья всегда 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    assertStrictEquals(mockCat.happiness, 100);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    const result = mockCat['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockCat.satiety, 50);
    assertStrictEquals(mockHouse.food, 45);
});

Deno.test('Проверяю, что кот не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    mockHouse.takeFood(48);
    const result = mockCat['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockCat.satiety, 30);
    assertStrictEquals(mockHouse.food, 2);
});

Deno.test('Проверяю, как кот спит', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    const result = mockCat['_sleep']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockCat.satiety, 25);
});

Deno.test('Проверяю, как кот дерёт обои', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    const result = mockCat['_scratchWallpaper']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockCat.satiety, 25);
    assertStrictEquals(mockHouse.dirtLevel, 5);
});

Deno.test('Проверяю, что кот может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockCat = new MockCat('Тестовый кот', mockHouse);
    mockCat.randomDailyActivity();
    // Проверка, что уровень сытости изменился
    assertStrictEquals(mockCat.satiety !== 30, true);
});
