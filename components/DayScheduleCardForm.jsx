import Image from 'next/image'
import { useEffect, useState } from 'react';
import ClassDialog from './ClassDialog';
import DayScheduleClassForm from './DayScheduleClassForm';
import { useSession } from 'next-auth/client'
import db from '../db.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function DayScheduleCard({ dayData, schedule, updateWeekSchedule, dayNumber }) {
    const [daySchedule, setDaySchedule] = useState(schedule);
    
    const addNewClass = () => {
        const newClass = {
            classDescription: "",
            classLevel: "",
            className: "",
            hour: "",
            offlinePrice: "0",
            onlinePrice: "0",
            schedulesWeeksId: null,
            newClass: true,
            editMode: true
        }
        setDaySchedule([...daySchedule, newClass])
    }

    useEffect(()=>{
        console.log(daySchedule)
        updateWeekSchedule({...dayData, schedule: daySchedule}, dayNumber)
    }, [daySchedule])

    const updateSchedule = (updatedYogaClass) => {
        console.log(updatedYogaClass)
        const newDaySchedule = dayData.schedule.map(dayYogaClass => {
            if(dayYogaClass.id == updatedYogaClass.id) return updatedYogaClass
            return dayYogaClass
        })
        setDaySchedule(newDaySchedule)
    } 

    const removeClass = (removedClass, changedYogaClass) => {
        const newDaySchedule = daySchedule.filter((yogaClassItem) => yogaClassItem.id !== removedClass.id)
        setDaySchedule(newDaySchedule);
    }

    const toggleEditMode = (classId, bool) => {
        setDaySchedule(daySchedule.map(yogaClass => {
            if (yogaClass.id === classId) return {...yogaClass, editMode: bool}
            return yogaClass
        }))
    }

    const getSchedule = () => {
        return daySchedule.map((dayScheduleYogaClass, idx) => {
            dayScheduleYogaClass.id = idx
            return (
                <DayScheduleClassForm
                    key={idx}
                    yogaClass={dayScheduleYogaClass}
                    removeClass={removeClass}
                    toggleEditMode={toggleEditMode}
                    updateSchedule={updateSchedule}
                />
            )
        })
    }

    return (
        <div className="day-schedule card">
            <div className="head">
                <img src={`/assets/lotus.svg`} alt="lotus flower" />
                <h3>{dayData.day}</h3>
                <span>{dayData.date}</span>
                <button className="button-white" style={{ alignSelf: "baseline" }} onClick={() => addNewClass()}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        className="info-icon"
                    />
                </button>
            </div>

            <hr />

            {
                <div className="schedule">
                    {getSchedule()}
                </div>
            }
        </div>
    )
}