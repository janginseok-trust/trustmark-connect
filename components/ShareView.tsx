type Props = {
  message: string
  signature: string
  createdAt: string
}

export default function ShareView({ message, signature, createdAt }: Props) {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Verified Record</h1>
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">Message:</p>
        <p className="border px-4 py-2 rounded bg-gray-100">{message}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">Signature:</p>
        <p className="break-all text-sm border px-4 py-2 rounded bg-gray-100">{signature}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Created At:</p>
        <p className="text-sm">{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
