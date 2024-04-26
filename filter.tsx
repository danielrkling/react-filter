import React from "react";
import { Control, FilterFunction } from "./useFilter";


export function Filter<TData, TQuery>(props: {
    control: Control<TData>
    children: (props: { query: TQuery, setQuery: (query: TQuery) => void, active: boolean }) => React.ReactNode
    filter: (value: TData, query: TQuery) => boolean
    applyFilter?: (query: TQuery) => boolean
    defaultValue?: TQuery
}) {
    const id = React.useId()
    const [query, setQuery] = React.useState(props.defaultValue)

    const applyFilter = props.applyFilter?.(query) ?? true
    

    React.useEffect(() => {
        if (applyFilter) {
            props.control.filters.add(id, (value: TData) => props.filter(value, query))
        } else {
            props.control.filters.delete(id)
        }

        return () => {
            props.control.filters.delete(id)
        }
    }, [query, applyFilter])

    const active = props.control.filters.state.has(id)

    return props.children({ query, setQuery, active })
}


