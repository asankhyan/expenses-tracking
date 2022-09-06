import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { oneRecordPerDateSelectorForReport } from "../../redux/expenses.reducer";
import { Tag } from "../tags/tags.component";

export default function ExpensesReport(){
    const expensesList = useSelector(oneRecordPerDateSelectorForReport);
    return(
        expensesList && expensesList.length>0
        ?<>
            <ResponsiveContainer width={"90%"} height={300}>
                <PieChart>
                    <Pie data={expensesList} dataKey="amount" outerRadius={90} label={"date"}/>
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width={"90%"} height={300} >
                <BarChart data={expensesList}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={"date"}/>
                    <YAxis dataKey={"amount"} tickCount={8}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend />
                    <Bar dataKey={"amount"} barSize={10} label={{position:"top"}} fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer> 
        </>
        : null
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const record = payload[0].payload;
        const subExp = [];
        for(let tag in record.sub_expenses){
            let exp = <><span style={{padding: "5px 0px", display: "block"}}><Tag text={tag}/> <b>{record.sub_expenses[tag]}</b></span></>;
            subExp.push(exp); 
        }
        return (
            <Toast style={{width: "200px"}}>
                <Toast.Header closeButton={false}>
                    <small><b>{record.date}</b></small>
                </Toast.Header>
                <Toast.Body>
                    <small><b>Total spend: {record.amount}</b></small>
                    <hr/>
                    <div>
                        {
                            subExp.map(exp=>{
                                return exp;
                            })
                        }
                    </div>
                </Toast.Body>
            </Toast>
        );
    }
  
    return null;
  };