import {
    assertStrictEquals,
} from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { MethodSelector } from './MethodSelector.class.ts';

Deno.test('Проверяю метод выбирается по весу', () => {
    const arrNumber: number[] = [];

    // Создаем массив методов и их описаний
    const methods = Array.from({ length: 9 }, (_, i) => ({
        method: () => {
            arrNumber.push(i + 1);
            return true;
        },
        weight: i + 1,
        description: `Method ${i + 1}`,
    }));

    // Вызываем методы 4500 раз
    for (let i = 0; i < 4500; i++) {
        const selectedMethod = MethodSelector.selectMethodByWeight(methods);
        selectedMethod.method.call(this);
    }

    // Объект для подсчета количества каждого элемента
    const countMap: Record<number, number> = {};

    // Подсчет количества каждого элемента
    arrNumber.forEach((element) => {
        countMap[element] = (countMap[element] || 0) + 1;
    });

    // Проверка диапазонов значений для каждого ключа
    const ranges = [
        { key: 1, min: 50, max: 150 },
        { key: 2, min: 150, max: 250 },
        { key: 3, min: 250, max: 350 },
        { key: 4, min: 350, max: 450 },
        { key: 5, min: 450, max: 550 },
        { key: 6, min: 550, max: 650 },
        { key: 7, min: 650, max: 750 },
        { key: 8, min: 750, max: 850 },
        { key: 9, min: 850, max: 950 },
    ];

    ranges.forEach(({ key, min, max }) => {
        assertStrictEquals(countMap[key] >= min && countMap[key] <= max, true);
    });
});
