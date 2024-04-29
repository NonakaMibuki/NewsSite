export const CategoryType = {
    Top: 'Top',
    New: 'New',
    Best: 'Best'
} as const 

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType] 