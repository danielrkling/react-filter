import React from 'react';
import { useMapState, MapState } from '../react-state';

export type FilterFunction<T> = (value: T) => boolean;
export type SortFunction<T> = (valueA: T, valueB: T) => number
export type SelectorFunction<T, R> = (value: T) => R

export type Control<T> = {
    filters: MapState<FilterFunction<T>,string>
    sorts: MapState<SortFunction<T>,string>
}

export function useFilter<T>(data: T[]): [T[], Control<T>]{
    const filters = useMapState<FilterFunction<T>, string>()
    const sorts = useMapState<SortFunction<T>,string>()

    const filteredData = React.useMemo(() => {
        var d = data;
        for (const f of filters.state.values()) {
            d = d.filter(f);
        }
        for (const s of sorts.state.values()) {
            d.sort(s)
        }
        return d;
    }, [filters.state,sorts.state, data]);

    return [filteredData, {filters, sorts}]
}


