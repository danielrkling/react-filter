import React from "react";
import { SelectorFunction, Control } from "./useFilter";
// import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

type SortValue = 'asc' | 'dsc' | 'none'

export function Sort<TData, TSelector>(props: {
    control: Control<TData>
    selector: (value: TData) => TSelector
    children: (props: { sort: SortValue, setSort: (query: SortValue) => void, active: boolean, toggle: () => void, order: number }) => React.ReactNode
    dataType?: 'text' | string
    defaultValue?: SortValue
}) {
    const id = React.useId()
    const [sort, setSort] = React.useState(props.defaultValue ?? 'none')

    React.useEffect(() => {
        props.control.sorts.delete(id)

        if (sort == 'asc') {
            props.control.sorts.add(id, createSortFunction(props.selector, props.dataType, 1))
        } else if (sort == 'dsc') {
            props.control.sorts.add(id, createSortFunction(props.selector, props.dataType, -1))
        }

        return () => {
            props.control.sorts.delete(id)
        }
    }, [sort])

    const order = [...props.control.sorts.state.keys()].reverse().indexOf(id) + 1
    const toggle = () => setSort(prev => prev == 'none' ? 'asc' : prev == 'asc' ? 'dsc' : 'none')
    const active = props.control.sorts.state.has(id)

    return props.children({ sort, setSort, active, toggle, order })
}


const collator = new Intl.Collator()

function createSortFunction<T, R>(selector: SelectorFunction<T, R>, dataType: string, direction: number) {
    if (dataType === 'text') {
        return (a: T, b: T) => {
            return direction * collator.compare(String(selector(a)), (String(selector(b))));
        }
    }
    return (a: T, b: T) => {
        if (selector(a) < selector(b)) return -1 * direction;
        if (selector(a) > selector(b)) return 1 * direction;
        return 0;
    }


}