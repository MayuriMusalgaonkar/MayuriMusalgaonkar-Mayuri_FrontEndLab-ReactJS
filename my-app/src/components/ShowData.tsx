import IDataList from "../model/IDataList";
import { getDataFromServer } from "../service/ApiCalls";
import { useState, useEffect } from "react";
import Form from "./Form";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sum, setSum] = useState<number | null>()
    const [mayurispent, setMayurispent] = useState<number>(0)
    const [amodspent, setAmodspent] = useState<number>(0)

    let mayurispent1 = 0;
    let amodspent1 = 0; 

    useEffect(
        () => {
            const getData = async () => {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result,v) =>  result = result + v.price , 0 ));
                Shares(data);
            }
            getData();
        },
        [showForm]
    );

    const Shares = (data :IDataList[]) =>{
    
        data.map(
            sams => (
                sams.payeeName === "Mayuri" ? (
                    mayurispent1 = mayurispent1 + sams.price
                ):
                (
                  amodspent1 = amodspent1 + sams.price
                )
            )
        )
        setMayurispent(mayurispent1)
        setAmodspent(amodspent1)
    }

    const success =() => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }


    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <Form onTrue={success} onClose={cancel}/>
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
            {
                items && (
                    items.map(
                        (user, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="use-inline date">{user.setDate}</div>
                                    <div className="use-inline">{user.product}</div>
                                    <div className="use-inline price">{user.price}</div>
                                    <div className="use-inline" style={{ width: 112 }}>{user.payeeName}</div>
                                </div>
                            )
                        }
                    )
                )
            }
            <hr></hr>
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Mayuri paid: </div>
            <span className="use-inline total Mayuri">{mayurispent}</span> <br />
            <div className="use-inline ">Amod paid: </div>
            <span className="use-inline total Amod">{amodspent}</span> <br />
            <span className="use-inline payable">{mayurispent>amodspent? "Pay Mayuri " : "Pay Amod"}</span>
            <span className="use-inline payable price"> {Math.abs((mayurispent-amodspent)/2)}</span>


        </>

    )

}

export default ShowData;