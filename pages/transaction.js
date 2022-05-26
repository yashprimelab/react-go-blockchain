import { useEffect, useState } from "react";
import { Container, ListGroup, Nav, Navbar, Row } from "react-bootstrap";

import { TRANSACTION_URL } from "../src/common/constant";
import PopupCreateChain from "../src/components/PopupCreateChain";
import SendTransaction from "../src/components/SendTransaction";
import transactionMock from '../src/mocks/transaction.json';

const Transaction = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [showAddAChain, setShowAddAChain] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);
    const [transactions, setTransactions] = useState(transactionMock || []);

    useEffect(() => {
        if (!localStorage.getItem('userName')) {
            setShowAddAChain(true);
        } else {
            setName(localStorage.getItem('userName'));
        }
    }, []);

    const addAChain = async () => {
        try {
            const resp = await axios.post(
                `${TRANSACTION_URL}/createBlockChain?data=${name}&amount=${amount}`
            );
            if (resp) {
                localStorage.setItem('userName', name);
                // TODO: Get the amount for specific user
                setShowAddAChain(false);
                setToTransactions(true);
            }
        } catch (err) {
            console.log("data err", err);
        }
    };

    const addTransaction = async () => {
        try {
           // TODO: Add transaction & get it
        } catch (err) {
            console.log("data err", err);
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Go-Blockchain</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            href="/"
                            style={{ marginRight: 20, marginLeft: 20 }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            href="/transaction"
                            style={{ marginLeft: 20 }}
                        >
                            Transactions
                        </Nav.Link>
                        <Nav.Link
                            href="#"
                            style={{ marginLeft: 20 }}
                            onClick={() => {
                                setShowTransaction(true);
                            }}
                        >
                            Send
                        </Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <b>({name})</b> Balance: {amount}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row style={{ margin: 20 }}>
                <h5>Transactions List</h5>
                <ListGroup>
                    {transactionMock && transactionMock.map((item, index) => (
                        <ListGroup.Item key={index}>{item.PrevHash ? `"${item.Hash}" Has send $${item.Transactions[0].Outputs[0].Value} to ${item.Transactions[0].Outputs[0].PubKey}` : `${item.Transactions[0].Outputs[0].PubKey} ${item.Transactions[0].Inputs[0].Sig} By $${item.Transactions[0].Outputs[0].Value}`}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
            <PopupCreateChain
                show={showAddAChain}
                handleClose={() => setShowAddAChain(false)}
                handleSave={addAChain}
                name={name}
                amount={amount}
                setName={setName}
                setAmount={setAmount}
            />
            <SendTransaction
                show={showTransaction}
                handleClose={() => setShowTransaction(false)}
                handleSave={addTransaction}
                name={name}
                amount={amount}
                setName={setName}
                setAmount={setAmount}
            />
        </>
    )
}

export default Transaction;