import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
export function SearchContent() {
  const token = Cookie.get('token')

  if (!token) return <></>

  console.log(jwtDecode(token))

  return (
    <>
      <div className="mt-auto">
        <input
          type="text"
          placeholder="Search users"
          className="border-b border-gray-200 bg-gray-900 px-2 py-2 text-gray-100 hover:border-gray-100 focus:border-b-gray-100 focus:outline-none"
        />
        <ul className="mt-2">
          <li
            key={'sdad'}
            className="border-b border-gray-200 px-2 py-2 text-gray-100 hover:bg-gray-100"
          >
            addadasdadadad
          </li>
        </ul>
      </div>
    </>
  )
}
