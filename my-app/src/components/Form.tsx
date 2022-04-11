import { ChangeEvent, Component, FormEvent } from "react";
import {pushDataFromUser} from "../service/ApiCalls"

type Props = {
    onTrue: any,
    onClose: any
}

type State = {
    payeeName: string
    product: string
    price: number
    setDate: string
}


class Form extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            payeeName: "",
            product: "",
            price: 0,
            setDate: ""
        }
    }

    setpayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName: event.target.value
        })
    }

    setproduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product: event.target.value
        })
    }

    setprice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price: parseInt(event.target.value)
        })
    }

    setDefaultDate = () => {
        const today = new Date();

        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate: event.target.value
        })
    }

    submitHandler = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const stateData = {...this.state};
        const data = await pushDataFromUser(stateData);
        this.props.onTrue();
    }

    render() {
        return (
            <>
                <section>
                    <header>
                        <h1>Add New Item</h1>
                        <p>Read the below instructions before proceeding:<br /> Make sure you fill all the fileds where * is provided</p>
                    </header>
                    <form onSubmit={this.submitHandler}>
                        <article>
                            <p>Name</p>
                            <select value={this.state.payeeName} onChange={this.setpayee} required>
                                <option value="" defaultChecked>Choose</option>
                                <option value="Mayuri" >Mayuri</option>
                                <option value="Amod">Amod</option>
                            </select>
                        </article>
                        <article>
                            <p>Product purchased</p>
                            <input type="text" required value={this.state.product} onChange={this.setproduct} />
                        </article>

                        <article>
                            <p>Price</p>
                            <input type="number" required value={this.state.price} onChange={this.setprice} />
                        </article>

                        <article>
                            <p>Date</p>
                            <input type="date" required value={this.state.setDate} onChange={this.loggedDate} />
                        </article>

                        <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>

                        <button className="form-button">Submit</button>


                    </form>
                </section>
            </>
        )
    }
}

export default Form;