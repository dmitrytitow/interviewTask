import {ChartDataModel} from "./chart-data.model";

export const base: ChartDataModel = {
    names: ["car 1", "car 2", "car 3", "car 4"],
    values: [
        [1, 2, 3, 4],
        [2, 4, 1, 4],
        [2, 3, 1, 0],
        [1, null, null, null]
    ]
};

export const incr: ChartDataModel = {
    names: ["car 1", "car 2", "car 7", "car 8"],
    values: [[4], [4], [0], [1]]
};

export const expectedResult: ChartDataModel = {
    names: ["car 1", "car 2", "car 3", "car 7", "car 8"],
    values: [
        [2, 3, 4, 4],
        [4, 1, 4, 4],
        [3, 1, 0, null],
        [null, null, null, 0],
        [null, null, null, 1]
    ]
};

export function increment(
    base: ChartDataModel,
    incr: ChartDataModel
): ChartDataModel {
    type ChartDataMap = Map<string, Array<number | null>>;

    const baseMap: ChartDataMap = new Map();
    const incrMap: ChartDataMap = new Map();

    const fillMap = (inputData: ChartDataModel, map: ChartDataMap): void => {
        inputData.names.forEach((nameEl: string, index: number): void => {
            map.set(nameEl, inputData.values[index]);
        });
    }

    fillMap(base, baseMap);
    fillMap(incr, incrMap);

    const uniqueNameSet: Set<string> = new Set([...base.names, ...incr.names]);

    Array.from(uniqueNameSet).forEach((key: string): void => {
        const updateValue = (): Array<number | null> => {
            if (baseMap.has(key) && incrMap.has(key)) {

                return [...baseMap.get(key).slice(1), ...incrMap.get(key)];
            } else if (!baseMap.has(key) && incrMap.has(key)) {

                return [null, null, null, ...incrMap.get(key)];
            } else {

                return [...baseMap.get(key).slice(1), null];
            }
        }
        baseMap.set(key, updateValue());
    })

    Array.from(baseMap.keys()).forEach((key: string): void => {
        if (baseMap.get(key).every((value: number | null): boolean => value === null)) {
            baseMap.delete(key);
        }
    })

    return {names: Array.from(baseMap.keys()), values: Array.from(baseMap.values())};
}
