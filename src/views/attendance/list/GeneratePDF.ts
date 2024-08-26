"use client"
import jsPDF from "jspdf"
import "jspdf-autotable"

type Props = {
    title: string
    headerTable: string[]
    dataFilter: string[][]
    nameFile?: string
}

export default function generatePDF({ title, headerTable, dataFilter, nameFile }: Props) {
    return new Promise((resolve: any, reject: any) => {
        try {
            var obj = new jsPDF("landscape")

            // Add title heading
            obj.setFontSize(18)
            obj.text(title, 20, 20)

            // Create the table
            obj.setFontSize(12)
            obj.autoTable({
                startX: 30,
                startY: 40, // Adjust startY to make space for the title
                head: [headerTable],
                body: dataFilter,
            })
            obj.save(`${nameFile ?? "Asistencia"}.pdf`)
            resolve()
        } catch (err) {
            reject()
        }
    })
}
