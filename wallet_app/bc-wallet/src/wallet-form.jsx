import React, {useEffect, useState } from 'react'
import axios from 'axios'

export default function Wallet() {
    const [chain, setChain] = useState()
    const [response, setResponse] = useState()
    const [info, setInfo] = useState({
        headers: {
            "Content-Type": "application/json",
        },
        data: {username: "", recipient: "", amount:'' }
        })

    const handleChanges = e => {
        setInfo({...info, [e.target.name]: e.target.value}); 
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/chain')
            .then(res => setChain(res.data))
            .catch(err => console.log(err))

    }, [])
    
    const handleSubmit = (e) => {
        const {username, recipient, amount } = e
        const info = {
            username: username,
            recipient: recipient,
            amount: amount
        }
        e.preventDefault()
        axios
            .post('localhost:5000/transactions/new', info)
            .then(res => setResponse(res.data))
            .catch(err => console.log(err))
    }

    console.log('chain', chain, response )

    return (

        <>
        <div className='wallet-container'>
            <form onSubmit = {handleSubmit}>
                <label>Username</label>
                <input type='text' value={info.username} name='username' onChange={handleChanges}></input>
                <label>Sender Name</label>
                <input type='text' value={info.recipient} name='recipient' onChange={handleChanges}></input>
                <label>Amount</label>
                <input type='number' value={info.amount} name='amount' onChange={handleChanges}></input>
            </form>

            <button className='wallet-button' type='submit'>Send Transaction</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Previous Hash</th>
                        <th>Sender</th>
                        <th>Amount</th>
                        <th>Recipient</th>
                    </tr>
                </thead>
                <tbody>
                    {chain && chain.chain.map(item => (
                        <tr key={item.index}>
                            <td>{item.index}</td>
                            <td>{item.previous_hash}</td>
                            <td>{item.transactions.amount} </td>
                            <td>{item.transactions.amount}</td>
                            <td>{item.transactions.recipient}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}