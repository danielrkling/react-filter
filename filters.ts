
export function defaultFilter(value: any, query: string): boolean {
    return query?.split(' ').every(q => {
        if (value === null || value === undefined) return false
        if (typeof value == 'string') return value.toLowerCase().includes(q.toLowerCase())
        if (typeof value == 'object') {
            if (Array.isArray(value)) return value.some(v => defaultFilter(v, q))
            return Object.values(value).some(v => defaultFilter(v, q))
        }
        return String(value).toLowerCase().includes(q.toLowerCase())
    })
}


export const contains = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    selector(value).toLowerCase().includes(query.toLowerCase())

export const notContains = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    !selector(value).toLowerCase().includes(query.toLowerCase())

export const startsWith = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    selector(value).toLowerCase().startsWith(query.toLowerCase())

export const endsWith = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    selector(value).toLowerCase().endsWith(query.toLowerCase())

export const blank = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    selector(value).toLowerCase().includes(query.toLowerCase())

export const notBlank = <T,>(selector: (value: T) => string) => (value: T, query: string) =>
    selector(value).toLowerCase().includes(query.toLowerCase())

