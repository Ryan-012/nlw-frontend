import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
export function SearchModal({
  closeSearchModal,
}: {
  closeSearchModal: () => void
}) {
  const token = Cookie.get('token')

  if (!token) return <></>

  console.log(jwtDecode(token))

  return (
    <div
      onClick={closeSearchModal}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div className=" mx-4 flex max-h-screen  min-w-[60%]  flex-col  space-y-2 rounded-lg bg-gray-900 p-4">
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
      </div>
    </div>
  )
}
