const elWrapperParrots = document.querySelector('.parrots-wrapper');
const elParrotTemplate = document.getElementById('parrot-template').content;
const elFragWrap = document.createDocumentFragment();
const elAddCard = document.getElementById('add-parrot');

// ADD
const elAddTitle = document.getElementById('add-parrot-title');
const elAddImg = document.getElementById('add-parrot-img');
const elAddPrice = document.getElementById('add-parrot-price');
const modalBirthDate = document.getElementById('add-parrot-date');
const modalWidth = document.getElementById('add-parrot-width');
const modalHeight = document.getElementById('add-parrot-height');
const modalFeatures = document.getElementById('add-parrot-features');

// SEARCH
const elSearchForm = document.getElementById('search-parrots');

// EDIT
let elEditData = document.getElementById('edit-parrot');
let elEditTitle = document.getElementById('edit-parrot-title');
let elEditImg = document.getElementById('edit-parrot-img');
let elEditPrice = document.getElementById('edit-parrot-price');
let elEditBirthDate = document.getElementById('edit-parrot-date');
let elEditWidth = document.getElementById('edit-parrot-width');
let elEditHeight = document.getElementById('edit-parrot-height');
let elEditFeatures = document.getElementById('edit-parrot-features');

// AMOUNT
let parrotsAmount = document.getElementById('parrots-amount');
parrotsAmount.textContent = 'amount' + ': ' + products.length;

// RENDER
const renderParrots = (products) => {
  elWrapperParrots.innerHTML = null;
  products.forEach((product) => {
    let elCard = elParrotTemplate.cloneNode(true);

    let elCardBox = elCard.querySelector('.card');
    let elCardImg = elCard.querySelector('.card-img-top');
    let elCardTitle = elCard.querySelector('.card-title');
    let elCardCost = elCard.querySelector('.card-text');
    let elCardSize = elCard.querySelector('.card-size');
    let elCardYear = elCard.querySelector('.card-born');
    let elCardFeatures = elCard.querySelector('.card-features');
    let editBtn = elCard.querySelector('.edit');
    let likedBtn = elCard.querySelector('.liked');

    elCardBox.dataset.id = product.id;
    elCardImg.src = product.img;
    elCardTitle.textContent = product.title;
    elCardCost.textContent = '$' + product.price;
    elCardSize.textContent = product.sizes.width + ' x ' + product.sizes.height;
    elCardYear.textContent = product.birthDate;
    elCardFeatures.textContent = product.features;
    editBtn.dataset.id = product.id;
    likedBtn.dataset.id = product.id;

    let elItem = document.createElement('li');
    elItem.className = 'col-6 item';
    elItem.dataset.id = product.id;
    elItem.appendChild(elCard);
    elFragWrap.appendChild(elItem);
    elWrapperParrots.appendChild(elFragWrap);

    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      elEditData.dataset.id = editBtn.dataset.id;
      console.log(elEditData.dataset.id);
    });
  });
};

renderParrots(products);
function handleAddCard(evt) {
  evt.preventDefault();
  let data = {
    id: uuid.v4(),
    title: elAddTitle.value.trim(),
    img: 'https://media.istockphoto.com/photos/amazon-rainforest-parrot-macaw-picture-id1197182594?b=1&k=20&m=1197182594&s=170667a&w=0&h=bBQfSDgofCr_w2DBf79cwQe-JA45i02vCv7Ttx5qcmU=',
    price: elAddPrice.value.trim(),
    birthDate: modalBirthDate.value.trim(),
    sizes: {
      width: modalWidth.value.trim(),
      height: modalHeight.value.trim(),
    },
    features: modalFeatures.value.trim(),
  };
  products.push(data);
  renderParrots(products);
}

// SORT
const sortFunction = {
  lh: (a, b) => {
    if (a.price > b.price) {
      return 1;
    } else {
      return -1;
    }
  },
  hl: (a, b) => {
    if (a.price < b.price) {
      return 1;
    } else {
      return -1;
    }
  },
  bh: (a, b) => {
    if (a.birthDate > b.birthDate) {
      return 1;
    } else {
      return -1;
    }
  },
  hb: (a, b) => {
    if (a.birthDate < b.birthDate) {
      return 1;
    } else {
      return -1;
    }
  },
};

// SEARCH
function handleSearch(evt) {
  evt.preventDefault();
  const elSearchInput = document.getElementById('search');
  let value = elSearchInput.value.trim();
  const sortSelect = document.querySelector('.sort-select');
  const sort = sortSelect.value;
  let regex = new RegExp(value);
  let foundParrots = products.filter((parrot) => parrot.title.match(regex));
  elWrapperParrots.innerHTML = '';
  renderParrots(foundParrots);

  products.sort(sortFunction[sort]);
}

let copyCard = [];

function handleChange(evt) {
  if (evt.target.matches('.delete')) {
    let deletedItem = evt.target.closest('li');
    let itemId = deletedItem.dataset.id;
    let deleteCard = products.filter((product) => product.id != itemId);
    products = deleteCard;
    renderParrots(deleteCard);
  }
  if (evt.target.matches('.edit')) {
    copyCard = [];
    let copiedCard = products.find((item) => evt.target.dataset.id == item.id);
    copyCard.push(copiedCard);

    elEditTitle.value = copiedCard.title;
    elEditPrice.value = copiedCard.price;
    elEditBirthDate.value = copiedCard.birthDate;
    elEditWidth.value = copiedCard.sizes.width;
    elEditHeight.value = copiedCard.sizes.height;
    elEditFeatures.value = copiedCard.features;
    console.log(copyCard);
  }
  if (evt.target.matches('.liked')) {
    likedCard = [];
    let likedCard = products.find((item) => evt.target.dataset.id == item.id);
    let changedCOl = document.querySelector('.changed');
    console.log(changedCOl);
    changedCOl.classList.add('fa-solid');
    changedCOl.classList.add('fa-star');
  }
}

function changeCardContent(evt) {
  evt.preventDefault();
  console.log('ok');

  console.log(copyCard);

  copyCard[0].title = elEditTitle.value;

  copyCard[0].price = elEditPrice.value;

  copyCard[0].birthDate = elEditBirthDate.value;

  copyCard[0].sizes.width = elEditWidth.value;

  copyCard[0].sizes.width = elEditHeight.value;

  copyCard[0].features = elEditFeatures.value;

  renderParrots(products);
}

elEditData.addEventListener('submit', changeCardContent);
elAddCard.addEventListener('submit', handleAddCard);
elSearchForm.addEventListener('submit', handleSearch);
elWrapperParrots.addEventListener('click', handleChange);
