/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Input from 'src/ui/Input'
import Textarea from 'src/ui/Textarea'
import Select from 'src/ui/Select'
import Button from 'src/ui/Button'
import MultiSelect from 'src/ui/MultiSelect'

import { AppearanceTypes } from 'react-toast-notifications'

import _includes from 'lodash/includes'
import _map from 'lodash/map'
import _find from 'lodash/find'
import routes from 'src/routes'

import { useForm } from 'react-hook-form'

import { languageList, pushMessageTypeList, segmentationKey } from 'src/redux/constants'
import { ISegmentation, IPushMessage } from 'src/models/IPushMessage'

import QuestionMarkIcon from 'src/assets/question-mark.png'
import UsersThreeIcon from 'src/assets/UsersThree.png'
import InfoIcon from 'src/assets/Info.png'

interface IProps {
  messages: IPushMessage[] | null,
  setMessage: (message: IPushMessage[]) => void,
  setAlert: (message: string, type: AppearanceTypes) => void,
}

type IForm = Omit<IPushMessage, 'id' | 'customDate' | 'segmentation'>



const MessageSettings = ({ messages, setMessage, setAlert }: IProps) => {
  const { id } = useParams<{ id: string }>()
  const isSettings = id ? true : false
  const history = useHistory()
  const message = useMemo(() => {
    if (!messages) {
      return null
    }
    return _find(messages, (item) => item.id === id)
  }, [messages, id])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IForm>(
    {
      defaultValues: isSettings ? {
        name: message?.name,
        title: message?.title,
        text: message?.text,
        language: message?.language,
        icons: message?.icons,
        image: message?.image,
        typeMessage: message?.typeMessage,
      } : {}
    }
  )
  const typeMessageSelected = watch('typeMessage')
  const [customDate, setCustomDate] = useState<{
    date: string,
    time: string,
  }[]>((
    isSettings 
    && message?.customDate
    && message?.typeMessage === pushMessageTypeList[4].value
    ) ? message?.customDate : [{
    date: '',
    time: '',
  }])
  const [audience, setAudience] = useState<string[]>(
    isSettings && message?.audience ? message?.audience : []
  )
  const [segmentation, setSegmentation] = useState<Array<ISegmentation>>(
    isSettings && message?.segmentation ? message?.segmentation : [{
      key: 'DEPOSIT',
      answer: true,
    }]
  )

  const handleSubmitForm = (data: IForm) => {
    if (isSettings) {
      const newMessages = _map(messages, (item) => {
        if (item.id === id) {
          return {
            ...item,
            ...data,
            customDate,
            audience,
            segmentation,
          }
        }
        return item
      })
      setMessage(newMessages)
      setAlert('Пуш успешно изменен', 'success')
      history.push(routes.home)
      return
    }
    setMessage([
      ...(messages || []),
      {
        ...data,
        id: `${Date.now()}`,
        customDate,
        audience,
        segmentation,
      }
    ])
    setAlert('Пуш успешно создан', 'success')
    history.push(routes.home)
  }

  return (
    <div className='p-4 md:p-8'>
      <h2 className='text-custom-500 text-[20px] xl:text-[32px] font-normal'>Пуши</h2>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <h1 className='text-white text-[20px] xl:text-[32px] font-bold mr-8px md:mr-[18px]'>Создать новое пуш уведомление</h1>
          <img src={QuestionMarkIcon} alt="question mark" />
        </div>
        <div className='flex items-center'>
          <img src={UsersThreeIcon} alt="count sub" />
          <div className='ml-[12px]'>
            <p className='text-custom-500 text-[10px] md:text-[12px] font-medium'>Счетчик аудитории</p>
            <p className='text-white text-[14px] md:text-[20px] font-semibold'>123</p>
          </div>
        </div>
      </div>
      <hr className='w-full h-[1px] my-[32px] text-custom-600' />
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[32px]'>
          <div>
            <Input
              className='w-full'
              label='Название пуша'
              placeholder='Введите название новога пуша'
              name='name'
              id='name'
              error={errors.name?.message}
              register={register}
            />
            <Input
              className='mt-[32px] w-full'
              label='Заголовок сообщения'
              placeholder='Введите заголовок максимально 50 символов'
              name='title'
              id='title'
              error={errors.title?.message}
              register={register}
            />
            <Textarea
              className='mt-[32px] w-full'
              label='Текст сообщения'
              placeholder='Введите текст максимально 150 символов'
              name='text'
              id='text'
              error={errors.text?.message}
              register={register}
            />
            <Select
              className='mt-[32px] w-full'
              label={
                <>
                  <p className='w-full'>Исходный язык</p>
                  <img src={InfoIcon} alt="info" className='ml-[8px]' />
                </>
              }
              options={languageList}
              name='language'
              id='language'
              error={errors.language?.message}
              register={register}
            />
            <div className='flex items-center gap-2'>
              <Input
                className='mt-[32px] w-full'
                label={
                  <>
                    <p className='w-full'>Иконка <span className='font-normal text-custom-500'>(опцильнально)</span></p>
                  </>
                }
                placeholder='Введите ссылку на иконку'
                name='icons'
                id='icons'
                register={register}
              />
              <Input
                className='mt-[32px] w-full'
                label={
                  <>
                    <p className='w-full'>Изображение <span className='font-normal text-custom-500'>(опцильнально)</span></p>
                  </>
                }
                placeholder='Введите ссылку на изображение'
                name='image'
                id='image'
                register={register}
              />
            </div>
          </div>
          <div>
            <Select
              className='w-full'
              label={
                <>
                  <p className='w-full'>Выберите тип рассылки</p>
                  <img src={InfoIcon} alt="info" className='ml-[8px]' />
                </>
              }
              options={pushMessageTypeList}
              name='typeMessage'
              error={errors.typeMessage?.message}
              id='typeMessage'
              register={register}
            />
            {/* @ts-ignore */}
            {typeMessageSelected === pushMessageTypeList[4].value && (
              <div className='mt-[8px] bg-custom-bg rounded py-[12px] px-[20px]'>
                {_map(customDate, (item, index) => (
                  <div className='flex gap-2 mt-3'>
                    <input
                      className='w-[210px] px-5 h-[46px] border rounded border-custom-600 bg-custom-700 text-white outline-none'
                      type="date"
                      value={item.date}
                      name="customDate"
                      id="customDate"
                      onChange={(e) => {
                        const { value } = e.target
                        const newCustomDate = [...customDate]
                        newCustomDate[index].date = value
                        setCustomDate(newCustomDate)
                      }}
                    />
                    <input
                      className="w-[210px] px-5 h-[46px] border rounded border-custom-600 bg-custom-700 text-white outline-none"
                      type="text"
                      value={item.time}
                      name="customTime"
                      id="customTime"
                      pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                      maxLength={5}
                      placeholder='00:00'
                      onChange={(e) => {
                        const { value } = e.target

                        if (value.length < item.time.length) {
                          const newCustomDate = [...customDate]
                          newCustomDate[index].time = value
                          setCustomDate(newCustomDate)
                          return
                        }

                        if (value.length === 2 && !_includes(value, ':')) {
                          const newCustomDate = [...customDate]
                          newCustomDate[index].time = `${value}:`
                          setCustomDate(newCustomDate)
                          return
                        }

                        const newCustomDate = [...customDate]
                        newCustomDate[index].time = value
                        setCustomDate(newCustomDate)
                      }}
                    />
                    {customDate.length > 1 && (
                      <button
                        type='button'
                        onClick={() => {
                          const newCustomDate = [...customDate]
                          newCustomDate.splice(index, 1)
                          setCustomDate(newCustomDate)
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25 8.33333H7M13.5455 13.3333V20M18.4545 13.3333V20M23.3636 8.33333V24.1667C23.3636 24.3877 23.2774 24.5996 23.124 24.7559C22.9706 24.9122 22.7624 25 22.5455 25H9.45455C9.23755 25 9.02944 24.9122 8.876 24.7559C8.72256 24.5996 8.63636 24.3877 8.63636 24.1667V8.33333M20.0909 8.33333V6.66667C20.0909 6.22464 19.9185 5.80072 19.6116 5.48816C19.3048 5.17559 18.8885 5 18.4545 5H13.5455C13.1115 5 12.6952 5.17559 12.3884 5.48816C12.0815 5.80072 11.9091 6.22464 11.9091 6.66667V8.33333" stroke="#DA4649" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <div className='mt-6 flex justify-between'>
                  <div>
                    {customDate.length < 3 && (
                      <button
                        className='flex items-center gap-3'
                        type='button'
                        onClick={() => {
                          const newCustomDate = [...customDate]
                          newCustomDate.push({
                            date: '',
                            time: '',
                          })
                          setCustomDate(newCustomDate)
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12H18" stroke="#F0B11C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M12 6V18" stroke="#F0B11C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className='text-custom-yellow text-[14px] md:text-[16px] font-semibold'>Добавить дату</span>
                      </button>
                    )}
                  </div>
                  <button
                    type='button'
                    className='text-custom-red'
                    onClick={() => setCustomDate([{
                      date: '',
                      time: '',
                    }])}
                  >
                    Очистить
                  </button>
                </div>
              </div>
            )}
            <div
              className='flex justify-between mt-8'
            >
              <label className='flex text-white'>
                <>
                  <p className='w-full'>Аудитория</p>
                  <img src={InfoIcon} alt="info" className='ml-[8px]' />
                </>
              </label>
              <button
                type='button'
                className='text-custom-red font-normal text-sm'
                onClick={() => setAudience([])}
              >
                Очистить
              </button>
            </div>
            <MultiSelect
              className='mt-2'
              label={audience}
              placholder='Выберите аудиторию'
              onRemove={
                (item) => {
                  const newAudience = [...audience]
                  newAudience.splice(newAudience.indexOf(item), 1)
                  setAudience(newAudience)
                }
              }
              onSelect={
                (item) => {
                  const newAudience = [...audience]
                  newAudience.push(item)
                  setAudience(newAudience)
                }
              }
              items={['Тег1', 'Тег2', 'Тег3', 'Тег4', 'Тег5']}
            />
            <div className='flex items-center justify-end mt-2'>
              <button
                type='button'
                className='text-custom-800 font-normal text-xs md:text-sm flex items-center'
              >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4.5L6 9.5L1 4.5" stroke="#4E5788" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className='ml-2'>
                  посмотреть все
                </p>
              </button>
            </div>

            <label className='flex text-white mt-2'>
              <p>Сегментация</p>
              <img src={InfoIcon} alt="info" className='ml-[8px]' />
            </label>
            <div className='mt-2 px-[12px] py-[15px] rounded bg-custom-bg'>
              {_map(segmentation, (item, index) => (
                <>
                    <div className='flex items-center'>
                      <Select
                        className='w-full max-w-[650px]'
                        options={segmentationKey}
                        name={`segmentation-${index}`}
                        id={`segmentation-${index}`}
                        onSelect={(value) => {
                          const newSegmentation = [...segmentation]
                          // @ts-ignore
                          newSegmentation[index].key = value
                          setSegmentation(newSegmentation)
                        }}
                      />
                      {segmentation.length > 1 && (
                        <button
                          className='flex mt-4 ml-2'
                          type='button'
                          onClick={() => {
                            const newSegmentation = [...segmentation]
                            newSegmentation.splice(index, 1)
                            setSegmentation(newSegmentation)
                          }}
                        >
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 8.33333H7M13.5455 13.3333V20M18.4545 13.3333V20M23.3636 8.33333V24.1667C23.3636 24.3877 23.2774 24.5996 23.124 24.7559C22.9706 24.9122 22.7624 25 22.5455 25H9.45455C9.23755 25 9.02944 24.9122 8.876 24.7559C8.72256 24.5996 8.63636 24.3877 8.63636 24.1667V8.33333M20.0909 8.33333V6.66667C20.0909 6.22464 19.9185 5.80072 19.6116 5.48816C19.3048 5.17559 18.8885 5 18.4545 5H13.5455C13.1115 5 12.6952 5.17559 12.3884 5.48816C12.0815 5.80072 11.9091 6.22464 11.9091 6.66667V8.33333" stroke="#DA4649" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      )}
                      </div>
                      {item.key === segmentationKey[0].value && (
                        <>
                          <div>
                            <Select
                              className='w-[210px]'
                              options={[{
                                value: 1,
                                label: 'Да',
                              }, {
                                value: 0,
                                label: 'Нет',
                              }]} />
                          </div>
                          <hr className='w-full h-[1px] mt-[24px] mb-[20px] text-custom-600' />
                        </>
                      )}
                      {item.key === segmentationKey[1].value && (
                        <>
                          <div className='flex items-center justify-between mr-[38px]'>
                            <Select
                              className='w-[210px]'
                              options={[{
                                value: 'REGISTER',
                                label: 'Регистрация',
                              }, {
                                value: 'CLICK',
                                label: 'Клик',
                              }, {
                                value: 'DEPOSIT',
                                label: 'Депозит',
                              }]}
                              onSelect={(value) => {
                                const newSegmentation = _map(segmentation, (i) => {
                                  if (segmentationKey[1].value === i.key) {
                                    return {
                                      key: 'DAYS_AFTER_ACTION',
                                      actionDropdown: value as 'REGISTER' | 'CLICK' | 'DEPOSIT',
                                      comprasionDropdown: 'MORE_THAN',
                                      daysInput: 0,
                                    }
                                  }
                                  return i
                                })
                                // @ts-ignore
                                setSegmentation(newSegmentation)
                              }}
                            />
                            <Select
                              className='w-[210px] ml-2'
                              options={[{
                                value: 'MORE_THAN',
                                label: 'Больше чем',
                              }, {
                                value: 'LESS_THAN',
                                label: 'Меньше чем',
                              }]}
                              onSelect={(value) => {
                                const newSegmentation = _map(segmentation, (i) => {
                                  if (segmentationKey[1].value === i.key) {
                                    return {
                                      ...i,
                                      comprasionDropdown: value as 'MORE_THAN' | 'LESS_THAN',
                                    }
                                  }
                                  return i
                                })
                                // @ts-ignore
                                setSegmentation(newSegmentation)
                              }
                              }
                            />
                            <Input
                              className='w-[210px] ml-2'
                              placeholder='Введите число'
                              name='daysInput'
                              id='daysInput'
                              onChange={(e) => {
                                const { value } = e.target

                                const newSegmentation = _map(segmentation, (i) => {
                                  if (segmentationKey[1].value === i.key) {
                                    return {
                                      ...i,
                                      daysInput: value,
                                    }
                                  }
                                  return i
                                })
                                // @ts-ignore
                                setSegmentation(newSegmentation)
                              }}
                            />
                          </div>
                          <hr className='w-full h-[1px] mt-[24px] mb-[20px] text-custom-600' />
                        </>
                      )}
                      {item.key === segmentationKey[2].value && (
                        <>
                          <div className='flex items-center mr-[38px]'>
                            <Select
                              className='w-[210px]'
                              options={[
                                {
                                  value: 'MORE_THAN',
                                  label: 'Больше чем',
                                }, {
                                  value: 'LESS_THAN',
                                  label: 'Меньше чем',
                                },
                              ]}
                              onSelect={(value) => {
                                const newSegmentation = _map(segmentation, (i) => {
                                  if (segmentationKey[2].value === i.key) {
                                    return {
                                      ...i,
                                      comprasionDropdown: value as 'MORE_THAN' | 'LESS_THAN',
                                    }
                                  }
                                  return i
                                })
                                // @ts-ignore
                                setSegmentation(newSegmentation)
                              }}
                            />
                            <Input
                              className='w-[210px] ml-2'
                              placeholder='Введите число'
                              name='daysInput'
                              id='daysInput'
                              onChange={(e) => {
                                const { value } = e.target

                                const newSegmentation = _map(segmentation, (i) => {
                                  if (segmentationKey[2].value === i.key) {
                                    return {
                                      ...i,
                                      daysInput: value,
                                    }
                                  }
                                  return i
                                })
                                // @ts-ignore
                                setSegmentation(newSegmentation)
                              }}
                            />
                          </div>
                          <hr className='w-full h-[1px] mt-[24px] mb-[20px] text-custom-600' />
                        </>
                      )}
                </>
              ))}
              <div className='mt-6 flex justify-between'>
                <div>
                  {segmentation.length < 3 && (
                    <button
                      className='flex items-center gap-3'
                      type='button'
                      onClick={() => {
                        const newSegmentation = [...segmentation]
                        newSegmentation.push({
                          key: 'DEPOSIT',
                          answer: true,
                        })
                        setSegmentation(newSegmentation)
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18" stroke="#F0B11C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 6V18" stroke="#F0B11C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span className='text-custom-yellow text-[14px] md:text-[16px] font-semibold'>Добавить сегментацию</span>
                    </button>
                  )}
                </div>
                <button
                  type='button'
                  className='text-custom-red'
                  onClick={() => setSegmentation([{
                    key: 'DEPOSIT',
                    answer: true,
                  }])}
                >
                  Очистить
                </button>
              </div>
            </div>

          </div>
        </div>
        <div className='mt-[32px] flex items-center justify-end'>
          <Button
            className='px-[32px] py-[12px] text-[14px] md:text-[16px] font-medium mr-[16px]'
            type='button'
            onClick={() => {
              history.push(routes.home)
            }}
            semiDanger
          >
            Отмена
          </Button>
          <Button
            className='px-[32px] py-[12px] text-[14px] md:text-[16px] font-medium'
            type='submit'
            danger
          >
            {isSettings ? 'Сохранить' : 'Создать Пуш'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MessageSettings