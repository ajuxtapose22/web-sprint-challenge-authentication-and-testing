import React, { useState } from 'react';
import axios from 'axios'
import e from 'cors';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3300/api/auth/register', {username, password});
            alert('Registration successful');
        } catch (error) {
            console.error('Registration error:', error.response.data);
            alert(error.response.data.message);
        }
    }


return (
<>
<form onSubmit={handleSubmit}>
    <h2>Register</h2>
    
    <input 
    type="text"
    placeholder="Username" 
    value={username}
    onChange={(e) => setUsername(e.target.value)} />
    
    <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    
    />
<button type="submit">Register</button>
</form>
</>


)

}

export default Register;