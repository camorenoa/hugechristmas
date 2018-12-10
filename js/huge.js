import HugeData from './data';

class HugeChristmas {
  constructor() {
    this.data = {};
    this.init();
    this.purposeButton = {};
    this.formNode = {};
    this.santas = [];
  }

  init() {
    this.data = new HugeData();
    this.listeners();
    this.loadSantas().then((result) => {
      console.log('result', result)
    });
  }
  
  loadSantas() {
    let data = this.data.readData();
    return data;
  }

  listeners() {
    this.purposeButton = document.querySelector('.purpose');
    this.saveButton = document.querySelector('.sendpurpose');
    const formNode = document.querySelector('.form-container');
    const formLogic = document.querySelector('.form-wrapper');
    const name = document.getElementById('name');
    const purpose = document.getElementById('purpose');
    const office = document.getElementById('office');

    this.purposeButton.addEventListener('click', (e) => {
      e.preventDefault();
      formNode.classList.toggle('active');
      formNode.classList.remove('submitted');
      formLogic.reset();
    });

    document.addEventListener("closeForm", function(event) {
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

  
  writePost(post) {
    let response = this.data.writeData(post);
    return response;
    console.log(response);
  }
};

export default HugeChristmas; 