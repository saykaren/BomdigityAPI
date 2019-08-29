// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import './App.css';


const App = () => {

  const [users, setUsers] = useState([]);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/users');
      res
      .json()
      .then(res => setUsers(res))
      .catch(err => setErrors(err));
    }

    fetchData();
  });

  const renderUsers = () =>{
    if (users.length <= 0){
      return <div>Loading..</div>
    }else{
      return (
        users.map((val, key) => {
          return (
          <div key={key}>
            {val.name} | {val.age}
          </div>
          );
        })
      )
    }
  };

  return(
    <div className="App">
      {renderUsers()}
      {JSON.stringify(users)}
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>

    );
  
};

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state= {
//       users: []
//     }
//   }

//   componentDidMount(){
//     fetch('http://localhost:3000/users')
//       .then(response => response.json())
//       .then(res => {
//         if (res && res.data){
//           this.setState({ users: [...this.state.users, ...res.data]})
//         }
//       });
//   }

//   renderUsers(){
//     if (this.state.users.length <= 0){
//       return <div>Loading..</div>
//     }else{
//       return (
//         this.state.users.map((val, key) => {
//           return (
//           <div key={key}>
//             {val.name} | {val.age}
//           </div>);
//         })
//       )
//     }
//   }

//   render(){
//     return(

//     <div className="App">
//       { this.renderUsers() }
//     </div>

//     );
//   }
// }

export default App;
