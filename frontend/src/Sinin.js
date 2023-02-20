import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Sinin = () => {
    const [data, setData] = useState({ name: "", password: "" })
    const navigate = useNavigate()
    const onChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault()
        const { name, password } = data
        try {
            if (name && password) {
                const res = await fetch("http://localhost:4000/signin", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const postedvalue = await res.json()
                if (postedvalue.selecter==="emp") {
                    navigate('/emp')
                    
                } else if(postedvalue.selecter==="user") {
                    navigate('/user')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" name='name' value={data.name} onChange={onChange} />
                <input type="text" name='password' value={data.password} onChange={onChange} />
                <button>login!</button>
            </form>
        </div>
    )
}

export default Sinin