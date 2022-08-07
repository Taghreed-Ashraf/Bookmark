var websiteNameInput = document.getElementById('siteNameInput');
var websiteUrlInput = document.getElementById('siteUrlInput');
var addBtn = document.getElementById('addBtn');
var inputs = document.getElementsByClassName('form-control-sm');
var tableBody = document.getElementById('tableBody');
var searchInput = document.getElementById('searchInput');
var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');


var currentNumIndex = 0;
var websiteList = [];


if(localStorage.getItem('websiteNameList') != null)
{
  websiteList = JSON.parse(localStorage.getItem('websiteNameList'));
  displayData()
}

//------------- Event Add Button ------------
addBtn.onclick = function ()
{
  if(addBtn.innerHTML == 'Submit')
    {
      addWebsite();
    }
    else 
    {
      updateWebsiteData();
    }
    displayData()
    resetInputs()
}

//------------- Function Add Data ---------------
function addWebsite ()
{
  // special condition validation
  if (checkValidName() && checkValidUrl() )
  {
    var website = 
  {
    name : websiteNameInput.value,
    url : websiteUrlInput.value,
  }

  websiteList.push(website);

  localStorage.setItem('websiteNameList' , JSON.stringify(websiteList));
  Swal.fire({
    icon: 'success',
    title: 'Add Website!',
    showConfirmButton: true,
    timer: 1500,
  });
  }
    
  else{
    nameAlert.classList.remove('d-none')
    urlAlert.classList.remove('d-none')
  }
}

//-------------- Function Display Data -------------
function displayData()
{
  cartona = "";

  for(var i=0 ; i<websiteList.length ; i++)
  {
    cartona +=
    `<tr>
    <td class="w-50">${websiteList[i].name}</td>
    <td><a href="${websiteList[i].url}" class="btn btn-primary border-0 px-3" target="_blank">Visit</a></td>
    <td><button onclick="getWebsiteData(${i})" class="btn btn-info">Update</button></td>
    <td><button onclick="deleteWebsite(${i})" class="btn btn-danger">Delete</button></td>
  </tr>
    `
  }
  tableBody.innerHTML = cartona;
}

//--------------- Function Clear Input------------------
function resetInputs()
{
  for (var i=0 ; i<inputs.length ; i++)
  {
    inputs[i].value = '';
    inputs[i].classList.remove('is-invalid' , 'is-valid');
  }
}

//--------------Function Delete------------------
function deleteWebsite(numIndex)
{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      websiteList.splice(numIndex,1)
      displayData()
      localStorage.setItem('websiteNameList' , JSON.stringify(websiteList));
      Swal.fire("Deleted!", "Your website has been deleted.", "success");
    }
});
}

//------------Function GetData-----------------
function getWebsiteData(numberIndex)
{
  currentNumIndex = numberIndex;

  var currentWebsite = websiteList[numberIndex];

  websiteNameInput.value = currentWebsite.name;
  websiteUrlInput.value = currentWebsite.url;

  addBtn.innerHTML = "Updata Website"
}

//------------Function Update-----------------
function updateWebsiteData()
{
  var website = 
  {
    name : websiteNameInput.value,
    url : websiteUrlInput.value,
  }

  websiteList[currentNumIndex] = website;
  localStorage.setItem('websiteNameList' , JSON.stringify(websiteList));
  addBtn.innerHTML = "Submit"
}

//------------ Function Search------------------
searchInput.onkeyup =function()
{
  var searchText = searchInput.value;
  var cartona = "";

  for(var i=0 ; i<websiteList.length ; i++)
  {
    if(websiteList[i].name.toLowerCase().includes(searchText.toLowerCase()))
    {
      cartona +=
      `<tr>
      <td class="w-50">${websiteList[i].name}</td>
      <td><a href="${websiteList[i].url}" class="btn btn-primary border-0 px-3" target="_blank">Visit</a></td>
      <td><button onclick="getWebsiteData(${i})" class="btn btn-info">Update</button></td>
      <td><button onclick="deleteWebsite(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
      `
    }
  }
  tableBody.innerHTML = cartona;
}

//---------------- Rejex Name Input--------------
websiteNameInput.addEventListener('keyup' , checkValidName)

function checkValidName()
{
  var nameRejex = /[a-zA-Z0-9]/ 
  var validName = false;
  if(nameRejex.test(websiteNameInput.value) == true)
  {
    websiteNameInput.classList.replace('is-invalid' , 'is-valid');
    nameAlert.classList.add('d-none')
    validName = true;
  }
  else{
    websiteNameInput.classList.add('is-invalid')
    nameAlert.classList.remove('d-none')
    validName = false;
  }
  return validName;
}

//-------------Rejex URL Input-------------
websiteUrlInput.addEventListener('keyup' , checkValidUrl)

function checkValidUrl()
{
  var nameRejex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  var validUrl = false;
  if(nameRejex.test(websiteUrlInput.value) == true)
  {
    websiteUrlInput.classList.replace('is-invalid' , 'is-valid');
    urlAlert.classList.add('d-none')
    validUrl = true ;
  }
  else{
    websiteUrlInput.classList.add('is-invalid')
    urlAlert.classList.remove('d-none')
    validUrl = false
  }
  return validUrl ;
}