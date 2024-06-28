import { Cat } from './cat/Cat.class.ts';
import { Child } from './child/Child.class.ts';
import { House } from './house/House.class.ts';
import { IHouse } from './house/House.interface.ts';
import { Husband } from './husband/Husband.class.ts';
import { IResident } from './resident/Resident.interface.ts';
import { Log } from './utils/Log.class.ts';
import { Wife } from './wife/Wife.class.ts';

console.clear();

// Создаю дом
const house: IHouse = new House('Солнечный Домик');
// Создаю жену
const wife: IResident = new Wife('Милана', house);
// Прописываю жену в доме
house.addResident(wife);
// Создаю мужа
const husband: IResident = new Husband('Артур', house);
// Прописываю мужа в доме
house.addResident(husband);
// Создаю ребёнка
const child: IResident = new Child('Роберт', house);
// Прописываю ребёнка в доме
house.addResident(child);
// Создаю кота
const cat: IResident = new Cat('Снупи', house);
// Прописываю кота в доме
house.addResident(cat);

Log.dim('Жизнь семьи');
Log.dim(
    `В ${house.name} заселяются: ${
        house.residents.map((resident) => resident.name).join(', ')
    }`,
);

// Запуск симуляции на 10 дней
for (let day = 1; day <= 365; day++) {
    Log.dim(`День ${day}:`);
    const residents: IResident[] = house.residents;
    residents.map((resident) => resident.randomDailyActivity());
    house.dailyActivity();
    if (house.dirtLevel >= 100) {
        Log.red('Дом развалился от грязи!');
        break; // Останавливаем цикл, если уровень грязи >= 100
    }
}

if (house.dirtLevel < 100) {
    Log.dim('Итоги жизни за год:');
    const residentsToString = house.residents.length
        ? `живут: ${
            house.residents.map((resident) => resident.name).join(', ')
        }`
        : 'сейчас никто не живёт';

    Log.dim(`В ${house.name} ${residentsToString}`);
    Log.dim(`- Заработано денег: ${house.totalEarnedMoney}`);
    Log.dim(`- Cъедено еды: ${house.totalEatenFood}`);
    Log.dim(`- Куплено шуб: ${house.totalFurCoatsBought}`);
}
