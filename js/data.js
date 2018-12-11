import axios from 'axios';

class HugeData {
  constructor() {
    this.data = {};
    this.init();
    this.post = {
      name: '', 
      purpose: '', 
      office: ''
    };
  }

  init() {
    this.connectToFirebase();
  }

  connectToFirebase() {
    var config = {
      apiKey: "AIzaSyBeUzMx48ndfoavV0NO5Ip2a_DdvdnE_4k",
      authDomain: "projectId.firebaseapp.com",
      databaseURL: "https://christmas-huge.firebaseio.com/",
      storageBucket: "bucket.appspot.com"
    };
    firebase.initializeApp(config);
    this.data = firebase.database();
  }

  writeData(post) {
    const newPostKey = firebase.database().ref().child('purposes').push().key;
    let updates = {};
    let response = undefined;
    updates['purposes/' + newPostKey] = post;
    response = firebase.database().ref().update(updates);

    response.then((data) => {
      let event = new Event("closeForm", {bubbles: true});
      document.dispatchEvent(event);
    });
    return true;
  }

  readData() {
    let posts = firebase.database().ref('purposes/');
    let response = [];


    posts.orderByKey().on('child_added', function(snapshot) {
      response = [];
      response.push({
        name: snapshot.val().name,
        office: snapshot.val().office,
        purpose: snapshot.val().purpose
      });
      let event = new CustomEvent("loadSantasData", {bubbles: true, detail: response});
      document.dispatchEvent(event);
    });

    
    
    return response;
  }
  
};

export default HugeData; 