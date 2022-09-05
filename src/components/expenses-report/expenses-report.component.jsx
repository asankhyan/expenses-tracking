import { useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { expensesSelectorForReport } from "../../redux/expenses.reducer";

export default function ExpensesReport(){
    const expensesList = useSelector(expensesSelectorForReport);
    return(
        expensesList && expensesList.length>0
        ?<BarChart  width={500} height={300} data={expensesList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"}/>
            <YAxis dataKey={"amount"}/>
            <Tooltip/>
            <Legend />
            <Bar dataKey={"amount"} barSize={20} fill="#8884d8"/>
        </BarChart>
        : null
    );
}