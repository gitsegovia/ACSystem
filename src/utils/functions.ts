import moment from "moment-timezone"

export function getMomentMonth(month: string = ""): string {
    switch (month.toString()) {
        case "00":
        case "0":
            return "Enero"
        case "01":
        case "1":
            return "Febrero"
        case "02":
        case "2":
            return "Marzo"
        case "03":
        case "3":
            return "Abril"
        case "04":
        case "4":
            return "Mayo"
        case "05":
        case "5":
            return "Junio"
        case "06":
        case "6":
            return "Julio"
        case "07":
        case "7":
            return "Agosto"
        case "08":
        case "8":
            return "Septiembre"
        case "09":
        case "9":
            return "Octubre"
        case "10":
            return "Noviembre"
        case "11":
            return "Diciembre"
        default:
            return ""
    }
}

export function getMomentDayOfWeek(date: string = ""): string {
    switch (moment(date).weekday()) {
        case 0:
            return "Domingo"
        case 1:
            return "Lunes"
        case 2:
            return "Martes"
        case 3:
            return "Miercoles"
        case 4:
            return "Jueves"
        case 5:
            return "Viernes"
        case 6:
            return "Sabado"

        default:
            return ""
    }
}
