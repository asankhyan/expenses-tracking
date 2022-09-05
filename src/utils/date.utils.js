import { format, formatISO } from "date-fns";
import { date_format } from "./app.constants";

export const formatDateISO = (date)=>{
    return formatISO(date);
}

export const formatDate_ddMMyyyy = (date)=>{
    return format(date, date_format);
}