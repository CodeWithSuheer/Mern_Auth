import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])



    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        }
        else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Login successful');
                navigate('/')
            } catch (err) {
                console.log(err?.data?.message || err.error);
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <input className='my-2' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Username' />
                <br />
                <input className='my-2' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <br />
                <input className='my-2' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                <br />
                <input className='my-2' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm Password' />
                <br />
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3 px-3'
                >Sign Up
                </Button>

                <Row>
                    <Col>
                        Already have an accont? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form >
        </FormContainer >
    )
}

export default RegisterScreen

