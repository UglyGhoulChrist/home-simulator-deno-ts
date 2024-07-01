// Определение интерфейса для объекта метода с весом
export interface IWeightedMethod {
    method: () => boolean;
    weight: number;
    description: string;
}

// Класс для выбора метода на основе веса
export class MethodSelector {
    static selectMethodByWeight(methods: IWeightedMethod[]): IWeightedMethod {
        const totalWeight = methods.reduce((acc, curr) => acc + curr.weight, 0);
        const random = Math.random() * totalWeight;

        let sum = 0;
        let selectedMethod = methods[0];
        for (const method of methods) {
            sum += method.weight;
            if (random < sum) {
                selectedMethod = method;
                break;
            }
        }

        return selectedMethod;
    }
}
