import React,{ useContext,useState} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
} from 'reactstrap';

import {UserContext} from "../context/UserContext";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

import firebaseConfig from "../Config/firebaseConfig"
import firebase from 'firebase/compat';
firebase.initializeApp(firebaseConfig);


const Signin = () =>{
  const context = useContext(UserContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignUp = () =>{
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res =>{
      console.log(res);
      toast.success("User Created Successfully");
      context.setUser({email:res.user.email,uid: res.user.uid});
    })
    .catch(err =>{
      console.log(err);
      toast.error(err.message,{
        type: "error"
      });
    });
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    handleSignUp();
  }

  if(context.user?.uid){
    return <Redirect to="/"/>
  }
    return(
        <Container className='text-center'>
          <Row>
            <Col lg={6} className='offset-lg-3 mt-5'>
              <Card>
                <Form onSubmit={handleFormSubmit}>
                  <CardHeader className=''>SignIn here</CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Label for='email' sm={3}>
                        Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='provide your email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for='password' sm={3}>
                        Password
                      </Label>
                      <Col sm={9}>
                        <Input
                          type='password'
                          name='password'
                          id='password'
                          placeholder='your password here'
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button type='submit' block color='primary'>
                      Sign In
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
    )
}

export default Signin;