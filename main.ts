import { Log } from './utils/Log.class.ts';

console.clear();

// Запуск симуляции на 10 дней
for (let day = 1; day <= 10; day++) {
    Log.dim(`День ${day}.`);
}
