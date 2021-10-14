import React from 'react';
import { useContext,useState} from 'react';
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
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Axios from 'axios';
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import {UserContext} from "../context/UserContext.js";
import Repos from "../component/Repo";
import UserCard from "../component/UserCard";


const Home = () =>{

  const context = useContext(UserContext);
  const [query,setQuery] = useState("");
  const [user,setUser] = useState(null);

  const fetchDetails = async () =>{
    try{
      const {data} = await Axios.get(`https://api.github.com/users/${query}`);
      setUser(data);
    }catch(error){
      toast.error("User not found",{type:"error"});
    }
  }

  if(!context.user?.uid){
    return <Redirect to="/signin" />
  }
    return(
      <Container>
      <Row className=" mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Please provide the username"
            />
            <InputGroupAddon addonType="append">
              <Button onClick={fetchDetails} color="primary">
                Fetch User
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user && <UserCard user={user} /> }
        </Col>
        <Col md="7">{user && <Repos repos_url={user.repos_url} />}</Col>
      </Row>
    </Container>
    );
}

export default Home;