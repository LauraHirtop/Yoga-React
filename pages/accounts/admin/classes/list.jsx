import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import ClassCard from '../../../../components/ClassCard'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()

    /*     useEffect(() => {
            if (!session) router.push({ pathname: '/' })
        }, []) */

    // If session exists, display content
    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"list"}>
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                    <ClassCard name="Morning Yoga" offprice="25" onprice="20" attend="170" />
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}