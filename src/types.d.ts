export interface ResponseType {
  count: number
  rows: RowType[]
}
export interface RowType {
  key: string
  name: string
  gender: "male" | "female" | "other"
  noOfEntries: number
}
export interface Pagination {
  perPage: number
  currentPage: number
}
export interface PostData {
  name: string
  gender: string
  sleepRecord: {
    sleepHours: number
    date: string
  }
}
