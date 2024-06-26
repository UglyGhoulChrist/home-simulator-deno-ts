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

// Запуск симуляции на 10 дней
for (let day = 1; day <= 10; day++) {
    Log.dim(`День ${day}.`);
    house.dailyActivity();
    const residents: IResident[] = house.residents;
    residents.map((resident) => resident.randomDailyActivity());
}

Log.dim('Итоги жизни за год:');
Log.dim(`- Заработано денег: ${house.totalEarnedMoney}`);
Log.dim(`- Cъедено еды: ${house.totalEatenFood}`);
Log.dim(`- Куплено шуб: ${house.totalFurCoatsBought}`);
