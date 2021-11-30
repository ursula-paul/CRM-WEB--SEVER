async function main() {

    
  try {
      
   const response = await fetch ('https://swapi.dev/api/people');

   console.log(response)

   const {results}= await response.json();
   let cardInfo = ``
   for (let i = 0; i < results.length; i++) {
       cardInfo += `
       <div class="col-sm-4">
       <div class="card cardcc">
       <div class="user-image-container text-center card-img-top">
           <img src="images/${i+1}.jpeg" alt="results[i].name" style="width: 200px; border-radius: 50%; height: 200px;"></img>
       </div>

       <div class="user-text-container">
           <h2><button onclick="showInfo('info${i}')" class="user-name btn btn-success" id="get-text">${results[i].name}</button></h2>
       </div>
       
       <div class="info text-center" id="info${i}" style="display:none">
       
               <p>Name: ${ results[i].name === "n/a" ? 'humanoid' : results[i].name}</p>
    
               <p>Gender: ${ results[i].gender === "n/a" ? 'humanoid' : results[i].gender}</p>

               <p>Height :${results[i].height} M</p>
           </tr>
       </div>
   </div>
   <br>
   </div>

       `
   }
   
   const container = document.querySelector(".row");
   container.innerHTML = cardInfo


   


} catch (error) {
   console.error(error.message)
}

   
   
};



document.addEventListener("DOMContentLoaded", main);

function showInfo (id) {
   const infoDiv = document.getElementById(id)
   if (infoDiv.style.display === "none") {
       infoDiv.style.display = "block"
   } else {
       infoDiv.style.display = "none"
   }
}
   val = String(new Date())

   console.log(val.length)

   class Human{
       constructor(color,height){
           this.color =color
           this.heigh =height
       }
   }

   let ursula =new Human('dark' , 'tall' , 'f');