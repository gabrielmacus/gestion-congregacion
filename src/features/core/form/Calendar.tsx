import { useTranslation } from "react-i18next"


export interface CalendarOptions {
    firstDay?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
}

export interface CalendarProps {
    year: number
    month: number
    options: CalendarOptions
}


export default function Calendar(props: CalendarProps) {
    const { t } = useTranslation()
    const firstDay = props.options.firstDay ?? 'mon'
    const weekDays: { [key: string]: string }[] = t("weekDays", { returnObjects: true })

    function generateCalendarDays(month: number, year: number) {
        month-=1
        
        const monthStart = Date.UTC(year, month + 1, 1)
        const monthEnd = Date.UTC(year, month + 2, 0)

        const monthStartDay = Intl.DateTimeFormat('en', { weekday: 'short' }).format(monthStart).toLowerCase()
        const monthEndDay = Intl.DateTimeFormat('en', { weekday: 'short' }).format(monthEnd).toLowerCase()



        //console.log(monthStartDay, monthEndDay)


        return []
    }

    console.log(generateCalendarDays(8, 2024))
    return <div>a</div>

}