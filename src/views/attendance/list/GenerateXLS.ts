"use client";
import * as XLSX from "xlsx";
import moment from "moment-timezone";

import { Attendance } from "src/services/graphql/types";

type Props = {
  title?: string;
  worksheetname?: string;
  dataFilter: Attendance[];
};

interface StatusObj {
  [ke: string]: {
    text: string;
  };
}

const statusObj: StatusObj = {
  Teacher: { text: "Profesor" },
  Worker: { text: "Obrero" },
  Administrative: { text: "Administrativo" },
};

const generateXLS = ({ title, worksheetname, dataFilter }: Props) => {
  return new Promise((resolve: any, reject: any) => {
    try {
      // Check if the action result contains data and if it's an array
      if (dataFilter && Array.isArray(dataFilter)) {
        const dataToExport = dataFilter.map((row) => {
          const { Worker, Teacher, Administrative } = row;

          let firstName = Worker ? `${Worker.firstName}` : Teacher ? `${Teacher.firstName}` : Administrative ? `${Administrative.firstName}` : "";
          let lastName = Worker ? `${Worker.lastName}` : Teacher ? `${Teacher.lastName}` : Administrative ? `${Administrative.lastName}` : "";
          const typePersonal = row.Worker ? "Worker" : row.Administrative ? "Administrative" : "Teacher";

          return {
            Personal: `${firstName} ${lastName}`,
            "Tipo de personal": statusObj[typePersonal].text,
            Fecha: `${moment(row.day).tz("America/Caracas").format("DD-MM-YYYY")}`,
            Entrada: `${row.in}`,
            Salida: `${row.out ?? ""}`,
          };
        });

        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        resolve();
      } else {
        console.log("#==================Export Error");
        reject();
      }
    } catch (error: any) {
      console.log("#==================Export Error", error);
      reject();
    }
  });
};

export default generateXLS;
