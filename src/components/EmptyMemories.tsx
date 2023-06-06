export function EmptyMemories({
  title,
  link,
}: {
  title: string
  link: boolean
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="text-center leading-relaxed">
        {title}{' '}
        {link && (
          <a href="/memories/new" className="underline hover:text-gray-50">
            criar agora!
          </a>
        )}
      </p>
    </div>
  )
}
