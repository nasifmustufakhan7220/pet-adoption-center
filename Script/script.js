// Common Function Start
const spinner = (bool, id1, id2) =>{
  if(bool === true){
    document.getElementById(id1).classList.remove("hidden");
    document.getElementById(id2).classList.add("hidden");
  }else{
    document.getElementById(id2).classList.remove("hidden");
    document.getElementById(id1).classList.add("hidden");
  }
}

// Common Function End


// clicking functions start
let imgArr = [];
const addThumbnail = (imgUrl, id)=>{

    const exitingData = imgArr.find(item => item.id === id);
    if(!exitingData){
        let newObj = {
            id: id,
            image: imgUrl,
        }
        imgArr.push(newObj);
    }
    displayImages();
}
// clicking functions end


// API Start

// Catagories Btn Api Start
const loadAllCatagoriesBtnApi = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";

  const res = await fetch(url);
  const datas = await res.json();
  displayCatagoriesBtn(datas.categories);
};
// Catagories Btn Api End

// All Pets Api Start
const allPets = async()=>{
  spinner(true, "short-spinnerId", "card-container");
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const datas = await res.json();
  displayShorting(datas.pets);

}
// All Pets Api End

// Category By Pet Api Start
const categoryByPet = async (id, category) => {
  spinner(true, "short-spinnerId", "card-container");
  const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
  const res = await fetch(url);
  const datas = await res.json();
  displayCategoryByPet(datas.data);
};
// Category By Pet Api End


// Details Api Start
const detailsApi = async(id)=>{
  document.getElementById("my_modal_5").showModal();
  spinner(true, "modal-spinnerId", "modal-container");
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(url);
  const datas = await res.json();
  displayDetails(datas.petData);
}
// Details Api End

// API End




// Display UI Start




// Display Category Btn Start
const displayCatagoriesBtn = (categories) => {
  const catagoriesBtnId = document.getElementById("catagories-btnId");
  categories.forEach((category) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="category-${category.id}" onclick="categoryByPet(${category.id}, '${category.category}')" class="flex items-center gap-3 px-16 py-6 rounded-2xl border border-gray-200 shadow-sm hover:rounded-full hover:bg-[rgba(14,122,129,10%)] hover:border-[#0E7A81] hover:border-1 hover:transition-all transition-all duration-300 w-full sm:w-auto">
                <img src="${category.category_icon}" class="w-10 h-10 object-contain" alt="dog" />
                <span class="font-bold text-lg text-gray-800">${category.category}</span>
            </button>
        `;
    catagoriesBtnId.append(btnDiv);
  });
};
// Display Category Btn End

// Display Card Start
const displayCategoryByPet = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if(cards.length === 0){
    const div = document.createElement("div");
    div.classList.add("col-span-full");
    div.innerHTML = `
    <div class="relative">
    <img src="./images/error.webp" alt="" srcset="" />
  </div>

  <!-- Text -->
  <h2 class="font-black text-2xl text-gray-800 mt-4">No Information Available</h2>
  <p class="text-sm text-gray-500 text-center max-w-sm">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
  </p>
    `;
    cardContainer.append(div);
    spinner(false, "short-spinnerId", "card-container");
    return;
  }
  cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
            <div class="border border-gray-200 rounded-2xl p-3 shadow-sm flex flex-col gap-2 w-full">
        <img
          src="${card.image}"
          class="w-full h-40 sm:h-36 md:h-40 object-cover rounded-xl"
          alt="pet"
        />
        <div class="flex flex-col justify-center gap-1">
          <h2 class="font-bold text-sm sm:text-base md:text-lg">${card.pet_name}</h2>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2081_39)">
            <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_39">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Breed: ${card.breed}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M17.5 15.625V9.375C17.5 8.87772 17.3025 8.40081 16.9508 8.04917C16.5992 7.69754 16.1223 7.5 15.625 7.5H4.375C3.87772 7.5 3.40081 7.69754 3.04917 8.04917C2.69754 8.40081 2.5 8.87772 2.5 9.375V15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Birth: ${card.date_of_birth? card.date_of_birth : "not mentioned"}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7" clip-path="url(#clip0_2081_51)">
            <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_51">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Gender: ${card.gender? card.gender : "Not mentioned"}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2081_59)">
            <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.67029 5 7.03441 5.26339 6.56557 5.73223C6.09673 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09673 8.79893 6.56557 9.26777C7.03441 9.73661 7.67029 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.83479 14.9785 7.35409 14.8082 6.95311 14.5112C6.55213 14.2142 6.24921 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_59">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Price: ${card.price === null || card.price === undefined? "not mentioned": card.price}$
          </p>
        </div>
        <div class="flex items-center gap-2 border-t border-gray-100 pt-2 w-full">
            <button onclick="addThumbnail('${card.image}', ${card.petId})"  class="btn btn-ghost border-[rgba(19,19,19,60%)] sm:btn-sm flex-1"><i class="fa-regular fa-thumbs-up"></i></button>
            <button id="adoptedID-${card.petId}" onclick="adoptedDisplay('${card.petId}')"  class="btn btn-outline sm:btn-sm text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white flex-1">Adopt</button>

            <span id="countdown-wrapper-${card.petId}" class="countdown font-mono text-xl hidden">
            <span id="timer-${card.petId}" style="--value:3;"></span>
            </span>
            
            <button id="detailsId-${card.petId}" onclick="detailsApi(${card.petId})" class="btn btn-outline sm:btn-sm text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white flex-1">Details</button>
            </div>
        </div>
        `;
    cardContainer.append(cardDiv);
  });
  spinner(false, "short-spinnerId", "card-container");
};
// Display Card End

// Display image Start
const displayImages = () => {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = ""; // ✅ only clear content, keep the container

  imgArr.forEach(pet => {
    const img = document.createElement("img");
    img.src = pet.image;
    img.className = "w-full h-20 xl:h-24 object-cover rounded-xl";
    img.alt = pet.pet_name;
    imageContainer.append(img);
  });
}
// Display image End

// Diplay details start
const displayDetails= (obj)=>{
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <div class="p-3 flex flex-col gap-2 w-full">
        <img
          src="${obj.image}"
          class="w-full h-full object-cover object-center"
          alt="pet"
        />
        <div class="flex flex-col justify-center gap-1">
          <h2 class="font-bold text-sm sm:text-base md:text-lg">${obj.pet_name}</h2>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2081_39)">
            <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_39">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Breed: ${obj.breed}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M17.5 15.625V9.375C17.5 8.87772 17.3025 8.40081 16.9508 8.04917C16.5992 7.69754 16.1223 7.5 15.625 7.5H4.375C3.87772 7.5 3.40081 7.69754 3.04917 8.04917C2.69754 8.40081 2.5 8.87772 2.5 9.375V15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Birth: ${obj.date_of_birth}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7" clip-path="url(#clip0_2081_51)">
            <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_51">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Gender: ${obj.gender}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2081_59)">
            <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.67029 5 7.03441 5.26339 6.56557 5.73223C6.09673 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09673 8.79893 6.56557 9.26777C7.03441 9.73661 7.67029 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.83479 14.9785 7.35409 14.8082 6.95311 14.5112C6.55213 14.2142 6.24921 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2081_59">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            Price: ${obj.price}$
          </p>
          <p class= "ext-xs sm:text-sm text-gray-600 flex items-center gap-2"><i class="fa-sharp-duotone fa-solid fa-syringe"></i> Vaccinated: ${obj.vaccinated_status}</p>
          <p>${obj.pet_details}</p>
          
        </div>
  `
  spinner(false, "modal-spinnerId", "modal-container");
}
// Diplay details end

// Display sort prices Start
const displayShorting=(arr)=>{
  let datas = arr.sort((a, b) => b.price - a.price);
  displayCategoryByPet(datas);
  spinner(false, "short-spinnerId", "card-container");
};
// Display sort prices End

// Dsiplay Adopted Start
const adoptedDisplay = (id) => {
  alert("Are you sure!");

  const adoptId = document.getElementById(`adoptedID-${id}`);
  const countdownWrapper = document.getElementById(`countdown-wrapper-${id}`);
  const timer = document.getElementById(`timer-${id}`);

  countdownWrapper.classList.remove("hidden");
  adoptId.disabled = true; // ✅ disable button while counting


  let seconds = 3;
  timer.style.setProperty("--value", seconds);

  const interval = setInterval(() => {
    seconds--;
    timer.style.setProperty("--value", seconds);

    if(seconds <= 0) {
      clearInterval(interval);
      countdownWrapper.classList.add("hidden");
      adoptId.innerText = `Adopted`; // ✅ only changes AFTER countdown finishes!
      adoptedDisplay.disabled = true; // ✅ keep button disabled after adopted
    }
  }, 1000);
  
  
}
// Dsiplay Adopted End

// Display UI End
loadAllCatagoriesBtnApi();

