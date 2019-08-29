import React, {Component} from 'react';
import './App.css';


// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      users: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(res => {
        if (res && res.data){
          this.setState({ users: [...this.state.users, ...res.data]})
        }
      });
  }

  renderUsers(){
    if (this.state.users.length <= 0){
      return <div>Loading..</div>
    }else{
      return (
        this.state.users.map((val, key) => {
          return (
          <div key={key}>
            {val.name} | {val.age}
          </div>);
        })
      )
    }
  }

  render(){
    return(

    <div className="App">
      { this.renderUsers() }
    </div>

    );
  }
}

export default App;
