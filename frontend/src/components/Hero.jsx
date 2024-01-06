import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    return (
        <div className='py-5'>
            <Container style={{ maxWidth: '100vh' }}>
                <Card className='text-center' style={{ width: '40rem' }}>
                    <Card.Body>
                        <Card.Title>MERN Auth</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <LinkContainer to='/login'>
                            <Button className='mx-2 px-4' variant="primary">Sign In</Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button className='mx-2 px-4' variant="primary">Register</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Hero
