import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { clsx } from 'clsx'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import Select from "./Select"

export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export interface CalendarOptions {
    firstWeekDay?: WeekDay
    weekends?: WeekDay[]
}

export interface CalendarProps {
    startYear?: number
    startMonth?: number
    onChange?: (year: number, month: number) => any
    selectedDates?: Date[]
    type: 'single' | 'multiple' | 'range' | 'week'
    options: CalendarOptions
}

const DEFAULT_WEEK_DAYS: WeekDay[] = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
]
const DEFAULT_WEEK_START = "mon"
const DEFAULT_WEEKENDS = ['sat', 'sun']

export default function Calendar(props: CalendarProps) {
    const { t } = useTranslation()
    const weekDays = useMemo(() => {
        const firstDayIndex = DEFAULT_WEEK_DAYS
            .indexOf(props.options.firstWeekDay ?? DEFAULT_WEEK_START)
        return [
            ...DEFAULT_WEEK_DAYS.slice(firstDayIndex),
            ...DEFAULT_WEEK_DAYS.slice(0, firstDayIndex)
        ]
    }, [DEFAULT_WEEK_DAYS])
    const weekends = props.options.weekends ?? DEFAULT_WEEKENDS
    const [year, setYear] = useState<number>(props.startYear ??
        new Date().getFullYear())
    const [month, setMonth] = useState<number>(props.startMonth ??
        new Date().getMonth() + 1)

    const { format } = Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric'
    })

    const getShortWeekday = (date: Date): WeekDay => {
        return Intl.DateTimeFormat("en-US", {
            weekday: "short"
        }).format(date).toLowerCase() as WeekDay
    }

    const getWeekDayIndex = (dt: Date) => weekDays.indexOf(getShortWeekday(dt))

    const generateCalendarDays = (month: number, year: number) => {
        month -= 1
        const days: Date[] = []

        const monthStart = new Date(year, month, 1)
        const monthEnd = new Date(year, month + 1, 0)

        const startIndex = getWeekDayIndex(monthStart)
        const endIndex = getWeekDayIndex(monthEnd)

        const dayCount = monthEnd.getDate() + startIndex + (DEFAULT_WEEK_DAYS.length - endIndex)
        for (let i = 1; i < dayCount; i++) days.push(new Date(year, month, -startIndex + i))

        return days
    }

    const isToday = (date: Date) => {
        return format(new Date()) == format(date)
    }

    const isSelectedDate = (date: Date) => {
        return props.selectedDates?.some(d => format(d) == format(date))
    }

    const days = useMemo(() => generateCalendarDays(month, year),
        [month, year])

    return <div className={`shadow-md rounded-md overflow-hidden bg-gray-100`}>
        <div className="px-6 py-4 bg-primary-600 text-primary-contrast-600 flex 
        justify-between">
            <div className="flex gap-2">
                <ChevronDoubleLeftIcon
                    className="w-4 cursor-pointer hover:opacity-70" />
                <ChevronLeftIcon
                    className="w-4 cursor-pointer hover:opacity-70" />
            </div>
            <div className="flex gap-2 font-medium">
                <span className="cursor-pointer">{t(`month.${month}`)}</span>
                <span className="cursor-pointer">{year}</span>
            </div>
            <div className="flex gap-2">
                <ChevronRightIcon
                    className="w-4 cursor-pointer hover:opacity-70" />
                <ChevronDoubleRightIcon
                    className="w-4 cursor-pointer hover:opacity-70" />
            </div>
        </div>
        <div
            className={`grid grid-cols-7 px-4 py-4 text-sm text-center`}>
            {weekDays.map((day, idx) =>
                <div
                    key={idx}
                    className={clsx(`font-medium p-2 mb-1`,
                        {
                            'text-red-600': weekends.includes(day)
                        })}
                >
                    {t(`weekDay.${day}.short`).toUpperCase()}
                </div>
            )}
            {days.map((day, idx) =>
                <div
                    key={idx}
                    className={clsx(`px-2 text-sm py-2 cursor-pointer group`, {
                        'text-gray-300': day.getMonth() != month - 1
                    })}
                >
                    <div className={clsx(`rounded-md py-1  group-hover:bg-gray-200`, {
                        [`border-primary-400 border`]: isToday(day),
                        [`bg-primary-400 text-primary-contrast-400
                           group-hover:bg-primary-400 group-hover:text-primary-contrast-400
                            `]:
                            isSelectedDate(day)
                    })} >
                        {day.getDate()}
                    </div>
                </div>
            )}
        </div>
    </div>

}