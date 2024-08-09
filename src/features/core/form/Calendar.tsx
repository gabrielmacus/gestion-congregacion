import { useTranslation } from "react-i18next"


export interface CalendarOptions {
    weekStart?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
}

export interface CalendarProps {
    year: number
    month: number
    options: CalendarOptions
}

export default function Calendar(props: CalendarProps) {
    const { t } = useTranslation()
    const weekStart = props.options.weekStart ?? 'mon'
    const weekDays: { [key: string]: string }[] = t("weekDays", { returnObjects: true })

    function generateCalendarDays() {
        const days = []
        const firstDay = new Date(props.year, props.month + 1, 1)
        const lastDay = new Date(props.year, props.month + 2, 0)
        const firstDayWeekDay = firstDay.getDay()
        const lastDayWeekDay = lastDay.getDay()

        for (let i = 0; i < firstDayWeekDay; i++) {
            days.push(null)
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(i)
        }

        for (let i = lastDayWeekDay; i < 6; i++) {
            days.push(null)
        }

        return days
    }

    console.log(generateCalendarDays())
    return <div>a</div>

}