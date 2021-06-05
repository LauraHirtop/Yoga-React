import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import DayScheduleClass from '../../../../components/DayScheduleClass'
import BookingCard from '../../../../components/BookingCard'
import Feedback from '../../../../components/Feedback'
import TextField from '@material-ui/core/TextField'
import db from '../../../../db'

export default function Page() {
    const router = useRouter()
    const today = new Date().toISOString().slice(0, 10)
    const [session, loading] = useSession()
    const [date, setDate] = useState(today)
    const [classes, setClasses] = useState([])
    const [bookings, setBookings] = useState([])
    const [activeClass, setActiveClass] = useState(false)

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        db.classes.getDayClasses(today).then(res => {
            setClasses(res.data)
        })
    }, [])

    useEffect(() => {
        db.classes.getDayClasses(date).then(res => {
            setBookings([])
            setActiveClass(false)
            setClasses(res.data)
        })
    }, [date])

    const handleArrowButton = (weekScheduleId) => {
        const updatedActieClass = classes.map(yogaClass => {
            if (yogaClass.schedules_weeks_id == weekScheduleId) {
                setActiveClass(true)
                return { ...yogaClass, active: true }
            }

            return { ...yogaClass, active: false }
        })

        setClasses(updatedActieClass)

        db.bookings.getClassBookings(weekScheduleId).then(res => {
            setBookings(res.data)
        })
    }

    const getDayScheduleClasses = () => {
        return classes.map(yogaClass => {
            return <DayScheduleClass
                key={yogaClass.schedules_weeks_id}
                dayScheduleClass={yogaClass}
                handleArrowButton={handleArrowButton}
                minimal={true}
                active={yogaClass.active}
            />
        })
    }

    const getBookings = () => {
        return bookings.map((booking) => {
            console.log(booking)
            return <BookingCard booking={booking} page="admin"/>
        })
    }

    const displayMessages = () => {
        if (classes.length > 0 && activeClass) {
            return <Feedback
                iconName="sadface"
                message="No bookings for this class yet"
            />
        }

        if (classes.length > 0 && !activeClass) {
            return <Feedback
                iconName="smile"
                message="Check bookings for a class"
            />
        }
    }

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"bookings"}>
                    <div className="admin-bookings">
                        <div>
                            <div className="week_schedule-form">
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    defaultValue={date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: new Date().toISOString().slice(0, 10)
                                    }}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="day-schedule-cards bookings">
                                {
                                    classes.length > 0 ? getDayScheduleClasses() :
                                        <Feedback
                                            iconName="sadface"
                                            message={`No classes scheduled for ${date}`}
                                        />
                                }
                            </div>
                        </div>
                        <div className="booking-cards">
                            {
                                bookings.length > 0 ? getBookings() : displayMessages()
                            }
                        </div>
                    </div>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}