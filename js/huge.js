import HugeData from './data';
import { positionator } from "./posionator";

class HugeChristmas {
  constructor() {
    this.data = {};
    this.init();
    this.purposeButton = {};
    this.formNode = {};
    this.santas = [];
  }

  init() {
    // TODO: wire this with real santas from firebase
    this.data = new HugeData();
    this.listeners();
    this.santas = this.data.readData();
    let promiseSantas = new Promise((resolve, reject) => {
      resolve(this.data.readData());
    });
    promiseSantas.then((santas) => {
      this.santas = santas;
      setTimeout(() => {
        this.loadSantas(this.santas);
      }, 1000);
    });
    
  }

  loadSantas(santas) {
    positionator(santas);
    this.santaEvent();
  }

  santaEvent() {
    const santasDom = document.querySelectorAll('.santa-random');
    const scope = this;
    for (let node of santasDom) {
      node.addEventListener('click', function(e) {
        scope.createWindow(e, {
          ...e.target.dataset
        });
      }); 
    }
  }

  createWindow(e, data) {
    const messageContainer = document.querySelector('.purpose-data');
    let messageOffice = document.querySelector('.purpose-office');
    let messageText = document.querySelector('.purpose-text');
    let messageName = document.querySelector('.purpose-name');
    
    messageContainer.classList.add('visible');
    messageOffice.innerHTML = data.office;
    messageText.innerHTML = data.purpose;
    messageName.innerHTML = data.name;

  }

  listeners() {
    this.purposeButton = document.querySelector('.purpose');
    this.saveButton = document.querySelector('.sendpurpose');
    const formNode = document.querySelector('.form-container');
    const formLogic = document.querySelector('.form-wrapper');
    const name = document.getElementById('name');
    const purpose = document.getElementById('purpose');
    const office = document.getElementById('office');
    const closeWindow = document.querySelector('.purpose-data .close');
    const messageContainer = document.querySelector('.purpose-data');
    const closeFormButton = document.querySelector('.form-container .close');

    this.purposeButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeForm();
    });
    
    closeFormButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeForm();
    });

    closeWindow.addEventListener('click', (e) => {
      e.preventDefault();
      messageContainer.classList.remove('visible');
    });

    document.addEventListener("closeForm", function(e) {
      setTimeout(() => formNode.classList.add('submitted'), 300);
      setTimeout(() => formNode.classList.toggle('active'), 3000);
    });

    this.saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(new FormData(document.querySelector('.form-wrapper')));
      const post = this.writePost({
        name: name.value,
        purpose: purpose.value,
        office: office.value
      });
    });
  }

  closeForm() {
    const formNode = document.querySelector('.form-container');
    const formLogic = document.querySelector('.form-wrapper');
    formNode.classList.toggle('active');
    formNode.classList.remove('submitted');
    formLogic.reset();
  }
  
  writePost(post) {
    let response = this.data.writeData(post);
    return response;
  }
};

export default HugeChristmas; 