import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import firebase from "./firebase.js";

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


//const mapResults = result => {
  //return result.map(row => <div>post title: {row.data.title}</div>);
//};







class App extends Component {
  state = {
    results: []
  };

  addPic = (pics) => {

    
    
    firebase
    .database()
    .ref("pics")
    .push(pics);

    


  };

  getSnap = () => {

    let db_pics = [];
    
    firebase
    .database()
    .ref("pics")
    .once("value")
    .then(snapshot => {
      snapshot.forEach(element => {
        
        console.log(element.val())
      });
    })
    .catch(error => {
      console.log(error)
    });

    


  };


  getPic = () => {
    let retrieved = [];
    firebase
    .database()
    .ref("/pics")
    .once("value")
    .then(snapshot => {
      snapshot.forEach(pic => {
        console.log(pic);
        if(pic.node_.value_) {
          console.log(pic.node_.value_);
          retrieved.push(pic.node_.value_);
        }
        

      });

      this.setState({results: retrieved})
    });
    console.log("Retrieved from database: ");
    };

  doSearch = () => {
    axios.get("https://images-api.nasa.gov/search?q=dog").then(response => {
         console.log(response);
      //const data = response.data.data.children;
      this.setState({ 
        link: "https://images-api.nasa.gov/search?q=dog",
        results: response.data.collection.items

      });
    }).catch(error => {console.log(error);
    });
  };


  render() {

    let pics = [];
    pics = this.state.results;
    let images = [];
    if (pics.length > 1) {
      images = pics.map(pic => {
        return <img src={pic} />;
      });
    }
  
    return (


      
      
      <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      <AppBar position="static">
      <Button color="inherit">Login</Button></AppBar>
        
        <header className="App-header">
        {/*{this.state.result !== null && mapResults(this.state.result)}*/}

      
  
        <Button onClick={this.doSearch}  style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "18px 36px",
            fontSize: "18px"
        }}
            color="primary"
            variant="contained">List images</Button>

<Button onClick={this.getPic}  style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "18px 36px",
            fontSize: "18px"
        }}
            color="primary"
            variant="contained">Get Pics</Button>

<Button onClick={this.getSnap}  style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "18px 36px",
            fontSize: "18px"
        }}
            color="primary"
            variant="contained">Get Snap</Button>

    

          


    <p></p>

   


    <Card>

        {images}
        </Card>
        </header>
      </div>
    );  
  }
}


export default App;
