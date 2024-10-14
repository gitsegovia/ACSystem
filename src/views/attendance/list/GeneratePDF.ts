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
      var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      // Cabecera
      doc.setFontSize(12);
      doc.text("Gobernacion del Estado Bolivariano de Guárico", pageWidth / 2, 15, { align: "center" }); // Membrete del departamento
      doc.text("Dirección General de Informática", pageWidth / 2, 20, { align: "center" }); // Membrete del departamento

      // Logos

      doc.addImage(`/images/logos/logo1.png`, "PNG", 10, 10, 15, 15); // Logo izquierdo
      doc.addImage(`/images/logos/logo.png`, "PNG", pageWidth - 25, 10, 15, 15); // Logo derecho

      // Add title heading
      doc.setFontSize(18);
      doc.text(title, 10, 35);

      // Create the table
      doc.setFontSize(12);
      autoTable(doc, {
        margin: {
          left: 10,
          right: 10,
          top: 10,
        },
        startY: 40,
        head: [headerTable],
        body: dataFilter,
      });

      // Pie de página
      const pageInfo = doc.getCurrentPageInfo();
      const currentPage = pageInfo.pageNumber;
      doc.setFontSize(10);
      doc.text("Aprobado por:  __________________________     ", pageWidth / 2, pageHeight - 25, { align: "center" });
      doc.text("               Ivonne K. Camacho S.", pageWidth / 2, pageHeight - 20, { align: "center" });
      doc.text("               Directora General de Informática", pageWidth / 2, pageHeight - 15, { align: "center" });

      const texto = "Página " + currentPage + " de " + doc.getNumberOfPages();
      const anchoTexto = doc.getTextWidth(texto);
      doc.text(texto, pageWidth - (anchoTexto + 10), pageHeight - 10); // Número de página

      // Salvar el documento
      doc.save(`${nameFile ?? "Asistencia"}.pdf`);
      resolve();
    } catch (err) {
      reject();
    }
  });
}
