import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";

export interface DateTimePickerProps {
  value?: Date | string
  onChange?: (value: Date | string) => void
  type: 'date' | 'week' | 'time' | 'datetime'


}

export default function DateTimePicker(props: DateTimePickerProps) {

  const getIcon = () => {
    switch (props.type) {
      case 'date':
      case 'datetime':
      case 'week':
        return <CalendarIcon />
    }

    return <ClockIcon />
  }


  useEffect(() => {


  }, [])

  return <div>

    <Calendar
      onChange={(year,month)=>{}}
      selectedDates={[new Date(2024,7,23,0,0,0)]}
      type="single"
      options={{ firstWeekDay: 'mon' }}
    />
  </div>

}