export interface INews {
  id: number
  name: string
  description: string
  preview: string
  createdDate: string
}

export interface ICreateNews {
  name: string
  description: string
  preview: string
}
