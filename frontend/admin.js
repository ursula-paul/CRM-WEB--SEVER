const tableBody = document.querySelector(".tbody")


async function getProduct(){
    try{
        const products = await (await fetch("https://shielded-inlet-06442.herokuapp.com/")).json();
        return products
    }catch(err){
        console.log(err)
    }
}
getProduct().then(data => {
    console.log(data, "data found")
    let results = ""
    data.map(({ productName, price, image, id }) => {
        results += `
        <tr>
            <th scope="row">${id}</th>
            <td>${productName}</td>
            <td>Otto</td>
            <td><img class = "table-img" src = ${image}></td>
            <td>${price}</td>
            <td>
            <i class="fa fa-edit greenColor"></i>
            <i class="fa fa-trash redColor"></i>
            </td>
        </tr>
        `
    })
    tableBody.innerHTML = results

})

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
let modalProductName = document.querySelector("#name");
let modalProductdescription = document.querySelector("#gender");
let modalImage = document.querySelector("#height");

// console.log(btnsOpenModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

let showModal = document.createElement("div");
    showModal.classList.add("show-modal");
    charEl.appendChild(showModal);
    showModal.innerHTML = `
    <img src="./series/${images[index]}" alt="image">
    <div class="movie-info">
        <h2>NAME : ${name}</h2>
    </div>
    `;

    const openModal = function () {
      modalName.textContent = `Name: ${name}`;
      modalgender.textContent = `Gender: ${gender}`;
      modalheight.textContent = `Height: ${height}`;
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };
    showModal.addEventListener("click", openModal);
    main.appendChild(charEl);
  

// console.log(data)

// alert("admin js found")