import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { Cat } from './Cat.class.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    cat.changeSatiety(20);
    assertStrictEquals(cat.satiety, 50);
    cat.changeSatiety(-10);
    assertStrictEquals(cat.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья всегда 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    assertStrictEquals(cat.happiness, 100);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    const result = cat['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(cat.satiety, 50);
    assertStrictEquals(mockHouse.food, 45);
});

Deno.test('Проверяю, что кот не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    mockHouse.takeFood(48);
    const result = cat['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(cat.satiety, 30);
    assertStrictEquals(mockHouse.food, 2);
});

Deno.test('Проверяю, как кот спит', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    const result = cat['_sleep']();
    assertStrictEquals(result, true);
    assertStrictEquals(cat.satiety, 25);
});

Deno.test('Проверяю, как кот дерёт обои', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    const result = cat['_scratchWallpaper']();
    assertStrictEquals(result, true);
    assertStrictEquals(cat.satiety, 25);
    assertStrictEquals(mockHouse.dirtLevel, 5);
});

Deno.test('Проверяю, что кот может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const cat = new Cat('Тестовый кот', mockHouse);
    cat.randomDailyActivity();
    // Проверка, что уровень сытости изменился
    assertStrictEquals(cat.satiety !== 30, true);
});
