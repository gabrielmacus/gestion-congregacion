import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { clsx } from 'clsx'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export interface CalendarOptions {
    firstWeekDay?: WeekDay
    weekends?: WeekDay[]
}

export interface CalendarProps {
    year: number
    month: number
    onChange:(year:number, month:number)=>any
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

    const days = useMemo(() => generateCalendarDays(props.month, props.year),
        [props.month, props.year])

    return <div className={`shadow-md rounded-md overflow-hidden bg-gray-100`}>
        <div className="px-6 py-4 bg-primary text-primary-contrast flex justify-between">
            <div className="flex gap-2">
                <ChevronDoubleLeftIcon className="w-4 cursor-pointer" />
                <ChevronLeftIcon className="w-4 cursor-pointer" />
            </div>
            <div className="flex gap-2 font-medium">
                <span>{t(`month.${props.month}`)}</span>
                <span>{props.year}</span>
            </div>
            <div className="flex gap-2">
                <ChevronRightIcon className="w-4 cursor-pointer" />
                <ChevronDoubleRightIcon className="w-4 cursor-pointer" />
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
                    className={clsx('px-4 py-2 cursor-pointer', {
                        'text-gray-300': day.getMonth() != props.month - 1
                    })}
                >
                    <div className="rounded-lg hover:bg-primary-hover hover:text-primary-contrast">
                        {day.getDate()}
                    </div>
                </div>
            )}
        </div>
    </div>

}