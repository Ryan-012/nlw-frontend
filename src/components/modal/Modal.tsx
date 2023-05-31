import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export function TestModal({
  closeSearchModal,
}: {
  closeSearchModal: () => void
}) {
  const token = Cookie.get('token')

  if (!token) return

  console.log(jwtDecode(token))

  return (
    <div
      onClick={closeSearchModal}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div className=" mx-4 flex max-h-screen  min-w-[60%]  flex-col  space-y-2 rounded-lg bg-gray-900 p-4"></div>
    </div>
  )
}
