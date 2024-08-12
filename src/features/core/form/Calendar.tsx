import { useTranslation } from "react-i18next"


export interface CalendarOptions {
    firstDay?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
}

export interface CalendarProps {
    year: number
    month: number
    options: CalendarOptions
}

const weekDays:{[key:string]:number} = {
    mon:0,
    tue:1,
    wed:2,
    thu:3,
    fri:4,
    sat:5,
    sun:6
}

export default function Calendar(props: CalendarProps) {
    const { t } = useTranslation()
    const firstDay = props.options.firstDay ?? 'sat'
    const firstDayIndex = weekDays[firstDay]
    //const weekDays: { [key: string]: string }[] = t("weekDays", { returnObjects: true })

    function generateCalendarDays(month: number, year: number) {
        month-=1
        
        const monthStart = Date.UTC(year, month, 1)
        const monthEnd = Date.UTC(year, month + 1, 0)
        

        const monthStartDay = Intl.DateTimeFormat('en', { weekday: 'short',timeZone:"UTC" }).format(monthStart).toLowerCase()
        const monthStartIndex = weekDays[monthStartDay]
        const monthStartOffset = monthStartIndex - firstDayIndex - 1

        let currentDay = 1 - monthStartOffset
        while(true){
            const date = Date.UTC(year, month, currentDay)
            console.log(new Date(date))
            break
        }



        //console.log("AA",monthStartDay,monthStartIndex, firstDayIndex, monthStartIndex - firstDayIndex)
        
        
        
        //const monthEndDay = Intl.DateTimeFormat('en', { weekday: 'short' }).format(monthEnd).toLowerCase()



        //console.log(monthStartDay, monthEndDay)


        return []
    }

    console.log(generateCalendarDays(8, 2024))
    return <div>a</div>

}