'use client'
import { User } from '@/interfaces/User'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useState, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
export function SearchContent() {
  const token = Cookie.get('token')
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUsers(response.data)
      } catch (error) {
        console.log(error)
        setUsers([])
      }
    }
    if (token) fetchUsers()
  }, [token, setUsers])

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value.toLowerCase()
    setFilteredUsers(
      users.filter(
        (user) =>
          user.login.toLowerCase().includes(searchText) ||
          user.name.toLowerCase().includes(searchText),
      ),
    )
  }

  if (!token) return <></>

  return (
    <div className="mt-auto font-alt">
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="Search users"
        className=" w-full border-b border-gray-200 bg-gray-900 px-2 py-2  hover:border-gray-100 focus:border-b-gray-100 focus:outline-none"
      />

      <ul className="mt-2 w-full overflow-auto font-alt">
        {filteredUsers.map((user: User) => {
          return (
            <a key={user.id} href={`/users?id=${user.id}`} className="">
              <li className=" flex flex-col space-y-0.5 border-b border-gray-200 px-2 py-2    hover:border-gray-100">
                <Image
                  src={user.avatarUrl}
                  width={40}
                  height={40}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-row justify-between">
                  <span className="text-gray-100">{user.name}</span>
                  <span className="text-gray-400">{user.login}</span>
                </div>
              </li>
            </a>
          )
        })}
      </ul>
    </div>
  )
}
