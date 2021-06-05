//import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import IndividualName from '../components/IndividualName'
import ClientsInfo from '../components/ClientsInfo'
import db from '../db'

export default function AdminClients() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [clients, setClients] = useState([])
  const [client, setClient] = useState()
  const [icon, setIcon] = useState(faSearch)
  const [newClass, setnewClass] = useState('classNotSelected')

  useEffect(() => {
    if (!session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.users.getClients().then((res) => setClients(res.data))
  }, [])

  useEffect(() => {
    if (!client) {
      setClient(2)
    } else {
      setClient(client)
    }
  }, [client])

  const selectClient = (id) => {
    setClient(id)
    return client
  }

  const changeClass = (e) => {
    e.preventDefault()
    newClass == 'classNotSelected'
      ? setnewClass('classSelected')
      : setnewClass('classNotSelected')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (icon == faTimesCircle) {
      db.users.getClients().then((res) => setClients(res.data))
      setIcon(faSearch)
      event.target[0].value = ''
    } else {
      setClients(
        clients.filter(({ name }) => name.includes(event.target[0].value))
      )
      setIcon(faTimesCircle)
    }
  }

  const listNames = () => {
    return clients.map((client) => {
      return (
        <IndividualName
          key={client.id}
          id={client.id}
          name={client.name}
          selectClient={selectClient}
          changeClass={changeClass}
          newClass={newClass}
        />
      )
    })
  }

  return (
    <div className='admin-clients'>
      <div className='client-search'>
        <form className='form-users' onSubmit={handleSubmit} method='get'>
          <input type='text' id='user-search' name='search' />
          <button type='submit'>
            <FontAwesomeIcon
              icon={icon}
              style={{ color: '#646262', fontSize: '150%' }}
            />
          </button>
        </form>
        <div className='users-list'>{listNames()}</div>
      </div>
      <div className='client-info'>
        <ClientsInfo client={client} selectClient={selectClient} />
      </div>
    </div>
  )
}
