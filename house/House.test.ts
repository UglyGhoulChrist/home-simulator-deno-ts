import {
    assertEquals,
    assertStrictEquals,
} from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockHouse } from './Mock.house.ts';
import { MockResident } from '../resident/Mock.resident.ts';
import { Husband } from '../husband/Husband.class.ts';
import { Wife } from '../wife/Wife.class.ts';
import { Child } from '../child/Child.class.ts';
import { Cat } from '../cat/Cat.class.ts';

Deno.test('Проверяю, что дом инициализируется с правильными значениями', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    assertStrictEquals(mockHouse.name, 'Тестовый дом');
    assertEquals(mockHouse.residents, []);
    assertStrictEquals(mockHouse.money, 100);
    assertStrictEquals(mockHouse.food, 50);
    assertStrictEquals(mockHouse.dirtLevel, 0);
    assertStrictEquals(mockHouse.totalEarnedMoney, 0);
    assertStrictEquals(mockHouse.totalEatenFood, 0);
    assertStrictEquals(mockHouse.totalFurCoatsBought, 0);
});

Deno.test('Проверяю, что жители добавляются и удаляются корректно', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    mockHouse.addResident(mockResident);
    assertStrictEquals(mockHouse.residents.length, 1);
    assertEquals(mockHouse.residents, [mockResident]);
    mockHouse.removeResident(mockResident);
    assertStrictEquals(mockHouse.residents.length, 0);
    assertEquals(mockHouse.residents, []);
});

Deno.test('Проверяю, что деньги корректно увеличиваются и уменьшаются', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.addMoney(50);
    assertStrictEquals(mockHouse.money, 150);
    mockHouse.takeMoney(30);
    assertStrictEquals(mockHouse.money, 120);
});

Deno.test('Проверяю, что деньги не могут быть уменьшены ниже 0.', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.takeMoney(150);
    assertStrictEquals(mockHouse.money, 100); // Недостаточно денег!
});

Deno.test('Проверяю, что еда корректно увеличивается и уменьшается', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.addFood(30);
    assertStrictEquals(mockHouse.food, 80);
    mockHouse.takeFood(20);
    assertStrictEquals(mockHouse.food, 60);
});

Deno.test('Проверяю, что еда не может быть меньше 0', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.takeFood(60);
    assertStrictEquals(mockHouse.food, 50); // Недостаточно еды!
});

Deno.test('Проверяю, что еда не может быть больше 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.addFood(60);
    assertStrictEquals(mockHouse.food, 100); // Еда не может быть больше 100
});

Deno.test('Проверяю, что грязь корректно увеличивается и сбрасывается при уборке', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.increaseDirtLevel(10);
    assertStrictEquals(mockHouse.dirtLevel, 10);
    mockHouse.dailyActivity();
    assertStrictEquals(mockHouse.dirtLevel, 15);
    mockHouse.cleanHouse();
    assertStrictEquals(mockHouse.dirtLevel, 0);
});

Deno.test('Проверяю, что грязь не может быть больше 100', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.increaseDirtLevel(60);
    mockHouse.increaseDirtLevel(60);
    assertStrictEquals(mockHouse.dirtLevel, 100);
    mockHouse.cleanHouse();
    for (let i = 0; i < 21; i++) {
        mockHouse.dailyActivity();
    }
    assertStrictEquals(mockHouse.dirtLevel, 100); // Грязь не может быть больше 100
});

Deno.test('Проверяю, что метод info возвращает корректную строку.', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    mockHouse.addResident(mockResident);
    assertStrictEquals(
        mockHouse.houseInfo,
        'Дом: Тестовый дом, жильцы: Тестовый житель, деньги: 100, еда: 50, грязь: 0',
    );
    mockHouse.removeResident(mockResident);
    assertStrictEquals(
        mockHouse.houseInfo,
        'Дом: Тестовый дом, жильцов пока нет, деньги: 100, еда: 50, грязь: 0',
    );
});

Deno.test('Проверяю, что корректно увеличивается общее количество заработанных денег', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband: Husband = new Husband('Тестовый муж', mockHouse);
    mockHouse.addResident(husband);
    husband['_goToWork']();
    assertStrictEquals(mockHouse.totalEarnedMoney, 250);
});

Deno.test('Проверяю, что корректно увеличивается общее количество съеденной еды', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    const husband: Husband = new Husband('Тестовый муж', mockHouse);
    mockHouse.addResident(husband);
    // Добавил еды, иначе всем не хватит
    mockHouse.addFood(50)
    husband['_eat']();
    assertStrictEquals(mockHouse.totalEatenFood, 30);
    const wife: Wife = new Wife('Тестовая жена', mockHouse);
    mockHouse.addResident(wife);
    wife['_eat']();
    assertStrictEquals(mockHouse.totalEatenFood, 50);
    const child: Child = new Child('Тестовый ребёнок', mockHouse);
    mockHouse.addResident(child);
    child['_eat']();
    assertStrictEquals(mockHouse.totalEatenFood, 60);
    const cat: Cat = new Cat('Тестовая жена', mockHouse);
    mockHouse.addResident(cat);
    cat['_eat']();
    assertStrictEquals(mockHouse.totalEatenFood, 65);
});

Deno.test('Проверяю, что корректно увеличивается общее количество купленных шуб', () => {
    const mockHouse = new MockHouse('Тестовый дом');
    mockHouse.addMoney(1000);
    const wife: Wife = new Wife('Тестовая жена', mockHouse);
    mockHouse.addResident(wife);
    wife['_buyFurCoat']();
    assertStrictEquals(mockHouse.totalFurCoatsBought, 1);
});
