import {
    assertEquals,
    assertStrictEquals,
} from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { House } from './House.class.ts';

Deno.test('Проверяю что дом инициализируется с правильными значениями', () => {
    const house = new House('Тестовый дом');
    assertStrictEquals(house.name, 'Тестовый дом');
    assertEquals(house.residents, []);
    assertStrictEquals(house.money, 100);
    assertStrictEquals(house.food, 50);
    assertStrictEquals(house.dirtLevel, 0);
    assertStrictEquals(house.totalEarnedMoney, 0);
    assertStrictEquals(house.totalEatenFood, 0);
    assertStrictEquals(house.totalFurCoatsBought, 0);
});
