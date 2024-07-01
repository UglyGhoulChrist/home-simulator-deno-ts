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

// Создание и заселение жителя
function createAndAddResident(resident: IResident) {
    house.addResident(resident);
}

// Создаю и прописываю в доме жену
createAndAddResident(new Wife('Милана', house));
// Создаю и прописываю в доме мужа
createAndAddResident(new Husband('Артур', house));
// Создаю и прописываю в доме ребёнка
createAndAddResident(new Child('Роберт', house));
// Создаю и прописываю в доме кота
createAndAddResident(new Cat('Снупи', house));

Log.dim('Жизнь семьи');
Log.dim(
    `В ${house.name} заселяются: ${house.residents.map((resident) => resident.name).join(', ')
    }`,
);

// Запускаю симуляцию на 365 дней
for (let day = 1; day <= 365; day++) {
    Log.dim(`День ${day}:`);
    house.residents.forEach((resident) => resident.randomDailyActivity());
    house.dailyActivity();
    if (house.dirtLevel >= 100) {
        Log.red('Дом развалился от грязи!');
        // Останавливаю цикл, если уровень грязи >= 100
        break;
    }
}

if (house.dirtLevel < 100) {
    Log.dim('Итоги жизни за год:');
    const residentsToString: string = house.residents.length
        ? `живут: ${house.residents.map((resident) => resident.name).join(', ')
        }`
        : 'сейчас никто не живёт';

    Log.dim(`В ${house.name} ${residentsToString}`);
    Log.dim(`- Заработано денег: ${house.totalEarnedMoney}`);
    Log.dim(`- Cъедено еды: ${house.totalEatenFood}`);
    Log.dim(`- Куплено шуб: ${house.totalFurCoatsBought}`);
}
