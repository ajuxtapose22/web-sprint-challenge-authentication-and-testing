import React, { useState } from 'react';
import axios from 'axios'
// import e from 'cors';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset any previous error messages

        if (!username || !password) {
            setErrorMessage('Username and password are required.');
            return;
        }

        try {
            await axios.post('http://localhost:9000/api/auth/register', { username, password });
            alert('Registration successful');
            // Clear input fields
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
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