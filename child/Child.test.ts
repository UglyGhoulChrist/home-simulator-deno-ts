import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockHouse } from '../house/Mock.house.ts';
import { MockChild } from './Mock.child.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    mockChild.changeSatiety(20);
    assertStrictEquals(mockChild.satiety, 50);
    mockChild.changeSatiety(-10);
    assertStrictEquals(mockChild.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья всегда 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    assertStrictEquals(mockChild.happiness, 100);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    const result = mockChild['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockChild.satiety, 50);
    assertStrictEquals(mockHouse.food, 40);
});

Deno.test('Проверяю, что ребёнок не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    mockHouse.takeFood(45);
    const result = mockChild['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(mockChild.satiety, 30);
    assertStrictEquals(mockHouse.food, 5);
});

Deno.test('Проверяю, как ребёнок спит', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    const result = mockChild['_sleep']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockChild.satiety, 20);
});

Deno.test('Проверяю, как ребёнок играет', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    const result = mockChild['_play']();
    assertStrictEquals(result, true);
    assertStrictEquals(mockChild.satiety, 20);
});

Deno.test('Проверяю, что ребёнок может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockChild = new MockChild('Тестовый ребёнок', mockHouse);
    mockChild.randomDailyActivity();
    // Проверка, что уровень сытости изменился
    assertStrictEquals(mockChild.satiety !== 30, true);
});
