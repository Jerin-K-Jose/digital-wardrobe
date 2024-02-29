// script.js
const fileInput = document.getElementById('fileInput');
const wardrobe = document.getElementById('wardrobe');
const shuffleButton = document.getElementById('shuffleButton');

fileInput.addEventListener('change', handleFileUpload);
shuffleButton.addEventListener('click', shuffleOutfit);

function handleFileUpload(event) {
    const files = event.target.files;
    
    // Clear previous images
    wardrobe.innerHTML = '';
    
    // Check if any file is selected
    
        const file = files[0]; // Get the first selected file
        const reader = new FileReader();
        
        // When file reading is completed
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            wardrobe.appendChild(img);

            const url = reader.result;
        };
        
        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    
}

function addTop(){
    const files = fileInput.files;
    file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
        const url = reader.result;
        if(localStorage.getItem('tops') == null){
            localStorage.setItem('tops', '[]');
        }

        var old_data = JSON.parse(localStorage.getItem('tops'));
        old_data.push(url);
        localStorage.setItem('tops', JSON.stringify(old_data));
    })

    alert('Item added to Top section');
}


function addBottom(){
    const files = fileInput.files;
    file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
        const url = reader.result;
        if(localStorage.getItem('bottoms') == null){
            localStorage.setItem('bottoms', '[]');
        }

        var old_data = JSON.parse(localStorage.getItem('bottoms'));
        old_data.push(url);
        localStorage.setItem('bottoms', JSON.stringify(old_data));
    })


    alert('Item added to bottom section');
}

function addItem(){

    const selectedGender = document.querySelector('input[name="btnradio"]:checked');

    if (selectedGender.value == 'top') {
       addTop();
    }else if(selectedGender.value == 'bottom'){
        addBottom();
    }
}


// Function to display uploaded images
function viewItems() {
    const topContainer = document.getElementById('topImageContainer');
    const bottomContainer = document.getElementById('bottomImageContainer');
    bottomContainer.innerHTML = '';

    
    // Get the uploaded files array from localStorage
    if(localStorage.getItem('tops') != null){
        const urls = JSON.parse(localStorage.getItem('tops'));

        urls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.width = 300;
            component = document.createElement('div');
            component.classList.add('m-1', 'overflow-hidden');
            component.style.width = '200px';
            component.style.height = '200px';
            component.appendChild(img);
            topContainer.appendChild(component)
            
        });
    }


    if(localStorage.getItem('bottoms') != null){
        const urls = JSON.parse(localStorage.getItem('bottoms'));

        urls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.width = 300;
            component = document.createElement('div');
            component.classList.add('m-1', 'overflow-hidden');
            component.style.width = '200px';
            component.style.height = '200px';
            component.appendChild(img);
            bottomContainer.appendChild(component)
            
        });
    }
    
}




function shuffleOutfit() {

    const Outfit = document.getElementById('outfitContainer');
    const topOutfit = document.getElementById('topOutfit');
    const bottomOutfit = document.getElementById('bottomOutfit');

    var len1 = 0;
    var len2 = 0;
    if(localStorage.getItem('tops') != null && localStorage.getItem('bottoms') != null){
        const urlsTop = JSON.parse(localStorage.getItem('tops'));
        len1 = urlsTop.length;
        var rand1 = Math.floor(Math.random() * urlsTop.length);
   
        const urlsBottom = JSON.parse(localStorage.getItem('bottoms'));
        len2 = urlsBottom.length;
        var rand2 = Math.floor(Math.random() * urlsBottom.length);

        topOutfit.src = urlsTop[rand1];
        bottomOutfit.src = urlsBottom[rand2];        
    }
    

    if(len1 == 0 || len2 == 0){
        Outfit.innerHTML = 'Sorry No Outfit combination to show. Add more items!!';
    }


}
