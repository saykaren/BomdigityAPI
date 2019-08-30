// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import './App.css';


const App = () => {

  const guestData = { "data": [
    {
      "id":0,
      "name":"Guest",
      "address":"No address on file",
      "email":"",
      "strideLength":0,
      "dailyStepGoal":0,
      "friends":[0]
    }
  ]}

  const [users, setUsers] = useState([]);  
  const [Id, setId] = useState(guestData["data"][0].id);
  const [name, setName] = useState(guestData["data"][0].name);
  const [friends, setFriends] = useState(guestData["data"][0].friends);
  const [email, setEmail] = useState(guestData["data"][0].email);
  const [hasError, setErrors] = useState(false);
 

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/users');

      res
      .json()
      .then(res => setUsers(res))
      .then(res => setId(res[0].Id))
      .catch(err => setErrors(err));
    }

    fetchData();
  }, []);

  const userChange = event =>{
    const stringEvent = event.target.value;
    const eventTarget = parseInt(stringEvent);
    
    if (eventTarget > 0 && eventTarget < users["data"].length){
      let userResultArray = users["data"].filter(x=>(x.id === eventTarget));
      let userResultId = userResultArray[0].id;
      let userResultEmail = userResultArray[0].email;
      const userResultFriendsId = userResultArray[0].friends;
      const userResultName = userResultArray[0].name;
      setId(userResultId);
      setEmail(userResultEmail);
      setFriends(userResultFriendsId);
      setName(userResultName);
    }else{
      setId(guestData["data"][0].id);
      setName(guestData["data"][0].name);
      setEmail(guestData["data"][0].email);
      
    };

  };

  return(
    <div className="App">
      <Input
        value={Id}
        onChangeInput={userChange}
      >
      Login ID:
      </Input><br></br>
      Name {name}<br></br>
      ID {Id} <br></br>
      Email: {email} <br></br>
      Friends {friends} <br></br>
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>

    );
  
};


const Input = ({value, onChangeInput, children}) => (
  <label
    className="inputLabel"
  >
    {children}
    <input
      type="number"
      value={value}
      onChange={onChangeInput}
      className="inputNum"
      />
  </label>
);

export default App;
