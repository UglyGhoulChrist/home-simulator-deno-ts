import { assertStrictEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { Husband } from './Husband.class.ts';
import { MockHouse } from '../house/Mock.house.ts';

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    husband.changeSatiety(20);
    assertStrictEquals(husband.satiety, 50);
    husband.changeSatiety(-10);
    assertStrictEquals(husband.satiety, 40);
});

Deno.test('Проверяю, что уровень счастья корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    husband.changeHappiness(-30);
    assertStrictEquals(husband.happiness, 70);
    husband.changeHappiness(20);
    assertStrictEquals(husband.happiness, 90);
});

Deno.test('Проверяю, что количество еды в доме корректно уменьшается после еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    const result = husband['_eat']();
    assertStrictEquals(result, true);
    assertStrictEquals(husband.satiety, 60);
    assertStrictEquals(mockHouse.food, 20);
});

Deno.test('Проверяю, что муж не должен есть, если еды недостаточно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    mockHouse.takeFood(30);
    const result = husband['_eat']();
    assertStrictEquals(result, false);
    assertStrictEquals(husband.satiety, 30);
    assertStrictEquals(mockHouse.food, 20);
});

Deno.test('Проверяю, как муж ходит на работу', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    const result = husband['_goToWork']();
    assertStrictEquals(result, true);
    assertStrictEquals(husband.satiety, 20);
    assertStrictEquals(mockHouse.money, 350);
});

Deno.test('Проверяю, как муж играет в WoT', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    husband.changeHappiness(-50);
    const result = husband['_playWoT']();
    assertStrictEquals(result, true);
    assertStrictEquals(husband.satiety, 20);
    assertStrictEquals(husband.happiness, 70);
});

Deno.test('Проверяю, что муж может совершать случайные действия', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband = new Husband('Тестовый муж', mockHouse);
    husband.changeHappiness(-50);
    mockHouse.addMoney(300);
    husband.randomDailyActivity();
    // Проверка, что уровень сытости или счастья изменился
    assertStrictEquals(
        husband.satiety !== 30 || husband.happiness !== 50,
        true,
    );
});
