'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker({ coverUrl }: { coverUrl?: string }) {
  const [preview, setPreview] = useState<string | undefined>(coverUrl)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
    console.log(preview, coverUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className=" aspect-video w-full rounded-lg object-cover "
        />
      )}
    </>
  )
}
