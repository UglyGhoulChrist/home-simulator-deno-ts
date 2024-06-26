import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { Child } from './Child.class.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    child.changeSatiety(20);
    assertStrictEquals(child.satiety, 50);
    child.changeSatiety(-10);
    assertStrictEquals(child.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья всегда 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    assertStrictEquals(child.happiness, 100);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    const result = child['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(child.satiety, 50);
    assertStrictEquals(mockHouse.food, 40);
});

Deno.test('Проверяю, что ребёнок не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    mockHouse.takeFood(45);
    const result = child['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(child.satiety, 30);
    assertStrictEquals(mockHouse.food, 5);
});

Deno.test('Проверяю, как ребёнок спит', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    const result = child['_sleep']();
    assertStrictEquals(result, true);
    assertStrictEquals(child.satiety, 20);
});

Deno.test('Проверяю, как ребёнок играет', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    const result = child['_play']();
    assertStrictEquals(result, true);
    assertStrictEquals(child.satiety, 20);
});

Deno.test('Проверяю, что ребёнок может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const child = new Child('Тестовый ребёнок', mockHouse);
    child.randomDailyActivity();
    // Проверка, что уровень сытости изменился
    assertStrictEquals(child.satiety !== 30, true);
});
