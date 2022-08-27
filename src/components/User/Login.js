import React, { useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'

const Login = () => {
    // const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const sendData = async(e) => {
        e.preventDefault();
        await fetch('http://localhost:3030/api/findUser', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            if(res.status==0){
                localStorage.setItem('email',res.email)
                alert('login Successfull')
                window.location.href='/'
            }
        })
        .catch(()=>{})
    }

    return (
        <div className='mx-auto my-5' style={{ 'width': '320px' }}>
            <form onSubmit={(e)=>sendData(e)}>
                <h3>Login</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name='email'
                        required
                        value={data.email}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name='password'
                        required
                        value={data.password}
                        onChange={(e) => setData({...data, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className='mx-auto my-5' style={{ 'width': 'fit-content' }}><Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login;