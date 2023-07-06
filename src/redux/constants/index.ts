export const isDevelopment = process.env.NODE_ENV === 'development'

export const pushMessageTypeList = [
  {
    value: 'NOW',
    label: 'Сейчас',
  },
  {
    value: 'EVERY_DAY',
    label: 'Каждый день',
  },
  {
    value: 'EVERY_WEEK',
    label: 'Каждую неделю',
  },
  {
    value: 'EVERY_MONTH',
    label: 'Каждый месяц',
  },
  {
    value: 'CUSTOM_DATE',
    label: 'По дате',
  },
]

export const segmentationKey = [
  {
    value: 'DEPOSIT',
    label: 'Был внесен дипозит',
  },
  {
    value: 'DAYS_AFTER_ACTION',
    label: 'Дней после действия',
  },
  {
    value: 'LAST_ACTION',
    label: 'Последняя активность',
  },
]


export const languageList = [
  { value: 'ru', label: 'Русский' },
  { value: 'ua', label: 'Украинский' },
  { value: 'en', label: 'Английский' },
]

