
// app/api/pdf/route.ts
import { NextResponse } from "next/server"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

export async function POST(req: Request) {
  const { message } = await req.json()

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 400])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  page.drawText(message || "No message", {
    x: 50,
    y: 300,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="record.pdf"',
    },
  })
}
