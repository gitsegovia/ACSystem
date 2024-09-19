"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  title: string;
  headerTable: string[];
  dataFilter: string[][];
  nameFile?: string;
};

export default function generatePDF({ title, headerTable, dataFilter, nameFile }: Props) {
  return new Promise((resolve: any, reject: any) => {
    try {
      var doc = new jsPDF("landscape");

      // Add title heading
      doc.setFontSize(18);
      doc.text(title, 20, 20);

      // Create the table
      doc.setFontSize(12);
      autoTable(doc, {
        margin: {
          left: 20,
          right: 20,
          top: 30,
        },
        startY: 40,
        head: [headerTable],
        body: dataFilter,
      });
      doc.save(`${nameFile ?? "Asistencia"}.pdf`);
      resolve();
    } catch (err) {
      reject();
    }
  });
}
