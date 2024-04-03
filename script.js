

const title = document.querySelector("#title");
const description = document.querySelector("#description");


const addBtn=document.querySelector("#submit");
const inputs=document.querySelectorAll(".input");
const titleError=document.querySelector(".titleError");
const descriptionError = document.querySelector(".descriptionError");
const deleteButtons = document.querySelectorAll('.delete-btn');

let isTitleValid=false;
let isDescValid=false;


let jData=[];

const getDataFromJson = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blogs');
      jData = response.data; // Assign response.data to jData directly
      showCards(jData);//call showcards function to show the data from json file 
      
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
  

getDataFromJson();



const addToData =(nData)=>{
    axios.post('http://localhost:3000/blogs', nData)
    .then(response => {
      console.log('POST Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}








addBtn.addEventListener("click",  (e)=> {
    //prevent refreash the page when button is clicked
    e.preventDefault();


    addCard();
    //make button disable affter submit
    addBtn.setAttribute("disabled","disabled");

    isTitleValid=false;
    isDescValid=false;
    isImageValid=false;
});

let  addCard=()=>{

        //i put those inside the function because the function take a little time
        let card={
            title:title.value,
            description:description.value,
        }

        addToData(card);
        //add the object to json array 

        clearInputs();

        //to refreash the cards
        
        
    
}

let clearInputs=()=>{
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}


let showCards=(Data)=>{
    let list = document.getElementById('list');
    let htmlString = '';
    Data.map((item)=> {
        htmlString += `
        <div class="list_item">
        <div class="list_content">
            
                    <div class="item_desc">
                        <h2>${item.title}
                        </h2>
                        <p>${item.description}
                        </p>
                        <button class="delete-btn" data-id="${item.id}"><span class="fa-solid fa-trash"></span></button>
                    </div>
            
        </div>
    </div>
        `;
    });
    list.innerHTML=htmlString;
}


/*any button in list on click if it have 'delete-btn' class get the ID from the 'data-id' attribute
on it and call the function with id parameter to delete the blog with this ID*/
list.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        // Retrieve the ID from the data-id attribute
        let id = event.target.getAttribute('data-id');
        console.log("asdasda")
        deleteData(id);
        showCards(jData);

        }
});





let deleteData=(removeData)=> {
    fetch(`http://localhost:3000/blogs/${removeData}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(removeData)
    })
    .then(res => res.json())
    .then(json => displayData(json))
    .catch(error => console.error('Error:', error));
}






//show cards when opening the page




title.addEventListener('keyup',()=>{

    //this pattern make input start with Capital 
    let pattern=/^[A-Z][a-zA-Z 1-9]*$/;

    if(pattern.test(title.value)){
        titleError.style.cssText="display:none !important;";
        isTitleValid=true;
        
    }
    else{
        
        titleError.style.cssText="display:block !important;";
        isTitleValid=false;
    }

    //check if all inputs are valid to make button enabled 
    if(isTitleValid && isDescValid){
        addBtn.removeAttribute("disabled");
    }
    else{
        addBtn.setAttribute("disabled","disabled");
    }

})

description.addEventListener('keyup',()=>{


    if(description.value.trim() && description.value.length<500){
        descriptionError.style.cssText="display:none !important;";
        isDescValid=true;
    }
    else{
        descriptionError.style.cssText="display:block !important;";
        isDescValid=false;
    }


    if(isTitleValid && isDescValid ){
        addBtn.removeAttribute("disabled");
    }
    else{
        addBtn.setAttribute("disabled","disabled");
    }

})

