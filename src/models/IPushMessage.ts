export type IPushMessageTypeList = {
  NOW: string
  EVERY_DAY: string
  EVERY_WEEK: string
  EVERY_MONTH: string
  CUSTOM_DATE: string
}

export type ISegmentation = {
  key: 'DEPOSIT'
  answer: boolean
} | {
  key: 'DAYS_AFTER_ACTION'
  actionDropdown: 'REGISTER' | 'CLICK' | 'DEPOSIT'
  comprasionDropdown: 'LESS_THAN' | 'MORE_THAN'
  daysInput: number
} | {
  key: 'LAST_ACTION'
  comprasionDropdown: 'LESS_THAN' | 'MORE_THAN'
  daysInput: number
}

export interface IPushMessage {
  id: string,
  name: string,
  title: string,
  text: string,
  language: string,
  icons: string,
  image: string,
  typeMessage: keyof IPushMessageTypeList,
  audience: string[],
  segmentation: ISegmentation[],
  customDate?: {
    date: string,
    time: string,
  }[],
}
