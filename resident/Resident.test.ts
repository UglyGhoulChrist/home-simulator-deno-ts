import {
    assertEquals,
    assertStrictEquals,
} from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MockResident } from './Mock.resident.ts';
import { MockHouse } from '../house/Mock.house.ts';

// Создаю тестовый дом
const mockHouse = new MockHouse('Тестовый дом');

Deno.test('Проверяю что житель инициализируется с правильными значениями', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    assertStrictEquals(mockResident.name, 'Тестовый житель');
    assertStrictEquals(mockResident.houseName.name, 'Тестовый дом');
    assertStrictEquals(mockResident.satiety, 30);
    assertStrictEquals(mockResident.happiness, 100);
});

Deno.test('Проверяю, что метод info возвращает корректную строку', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    const expectedInfo =
        'Имя: Тестовый житель, дом: Тестовый дом, сытость: 30, счастье: 100';
    assertEquals(mockResident.residentInfo, expectedInfo);
});

Deno.test('Проверяю, что уровень сытости корректно увеличивается и уменьшается', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    mockResident.mockChangeSatiety(50);
    assertStrictEquals(mockResident.satiety, 80);
    mockResident.mockChangeSatiety(-70);
    assertStrictEquals(mockResident.satiety, 10);
});

Deno.test('Проверяю, что уровень счастья корректно увеличивается и уменьшается', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    mockResident.mockChangeHappiness(-80);
    assertStrictEquals(mockResident.happiness, 20);
    mockResident.mockChangeHappiness(50);
    assertStrictEquals(mockResident.happiness, 70);
});

Deno.test('Проверяю, что уровень сытости и счастья не может быть больше 100', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    mockResident.mockChangeSatiety(100);
    mockResident.mockCheckSatietyAndHappiness();
    assertStrictEquals(mockResident.satiety, 100);
    mockResident.mockChangeHappiness(100);
    mockResident.mockCheckSatietyAndHappiness();
    assertStrictEquals(mockResident.happiness, 100);
});

Deno.test('Проверяю, что при уровне сытости меньше 0, житель выписывается из дома', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    // Добавляю жителя в дом
    mockHouse.addResident(mockResident);
    // Проверяю, содержится ли объект resident в списке residents
    assertEquals(mockHouse.residents.some((r) => r === mockResident), true);
    // Задаю жителю сытость < 0
    mockResident.mockChangeSatiety(-100);
    mockResident.mockCheckSatietyAndHappiness();
    // Проверяю, содержится ли объект resident в списке residents
    assertEquals(mockHouse.residents.some((r) => r === mockResident), false);
});

Deno.test('Проверяю, что при уровне счастья меньше 0, житель выписывается из дома', () => {
    const mockResident = new MockResident('Тестовый житель', mockHouse);
    // Добавляю жителя в дом
    mockHouse.addResident(mockResident);
    // Проверяю, содержится ли объект resident в списке residents
    assertEquals(mockHouse.residents.some((r) => r === mockResident), true);
    // Задаю жителю счастье < 0
    mockResident.mockChangeHappiness(-110);
    mockResident.mockCheckSatietyAndHappiness();
    // Проверяю, содержится ли объект resident в списке residents
    assertEquals(mockHouse.residents.some((r) => r === mockResident), false);
});
