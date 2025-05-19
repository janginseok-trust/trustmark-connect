// components/PdfButton.tsx
"use client"

export default function PdfButton({ message }: { message: string }) {
  const handleDownload = async () => {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "record.pdf"
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="text-sm text-blue-600 underline mt-2 block"
    >
      Download PDF
    </button>
  )
}
