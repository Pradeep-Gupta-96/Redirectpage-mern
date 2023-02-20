import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sinup = () => {
    const [data, setData] = useState({ name: "", password: "", selecter: "" })
    const navigate = useNavigate()
    const onChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        console.log(data)
        const { name, password, selecter } = data
        try {
            if (name && password && selecter) {
                const res = await fetch("http://localhost:4000/signup", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const postvalue = await res.json()
                if (postvalue) {
                    navigate('/signin')
                    alert("registeration success")
                }
                console.log(postvalue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" name='name' value={data.name} onChange={onChange} placeholder='name' /><br /><br />
                <input type="text" name='password' value={data.password} onChange={onChange} placeholder='password' /><br /><br />
                <select name='selecter' onChange={onChange}>
                    <option >emp</option>
                    <option >user</option>
                </select><br /><br />
                <button >Sinup</button>
            </form>
        </div>
    )
}

export default Sinup