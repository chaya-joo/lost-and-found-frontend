export type CategoryType = {
    id?: number,
    name: string,
    parentId: number
}
export type ItemType = {
    id?: number,
    name: string,
    category: string,
    userId: number|undefined,
    location: string,
    area: string
    status: number,
    date: string,
    description: string
}
export type RequestType = {
    id?: number,
    category: string,
    userId: number,
    date: string
}

export type PageType = {
    label: string,
    path: string,
    settings?: PageType[]
}
export type AreaAndCountryType = {
    name: string
}
export type handleChangeProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }