import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Login successful');
            navigate('/')
        } catch (err) {
            console.log(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <input className='my-2' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <br />
                <input className='my-2' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                <br />
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3 px-3'
                >Sign In
                </Button>

                <Row>
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form >
        </FormContainer >
    )
}

export default LoginScreen
