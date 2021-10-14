import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {ListGroup, ListGroupItem} from 'reactstrap';


const Repo = ({repos_url}) =>{

  const[repos, setRepos] = useState([]);

  const fetchRepo = async() => {

    const {data} = await Axios.get(repos_url);
    setRepos(data);


  }

  useEffect(() => {
    fetchRepo();
  }, [repos_url]);


  return(
    <ListGroup>
      {repos.map(repo => (
        <ListGroupItem key={repo.id}>
          <div className="text-primary">{repo.name}</div>
          <div className="text-secondary">{repo.language}</div>
          <div className="text-info">{repo.discription}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );

}

export default Repo;