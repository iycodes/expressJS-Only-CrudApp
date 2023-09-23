import { fruitType2 } from "./fruits";

export function allFruitsPage(data: Array<fruitType2>) {
  return ` 
    ${boilerPlate1}
    <body id="bodyAll" >
    <div> Add new Fruit to database <button id="createNewFruitPage">Create New Fruit</button> </div>
  
    <div class="allFruitsWrapper" >  ${data
      .map((fruit, i) => fruitComponentAll(fruit, i))
      .join(" ")} </div>
  </body>
  
  </html>  
    `;
}
export function createFruitPage() {
  return `${boilerPlate1}
    <body>
       ${createFruitForm}
    </body>
    
    </html>`;
}
const createFruitForm = `
  <div class="aFruitWrapper">
          <form id="aFruitForm" data-create="create">
              <div>
                  <label for="">
                      Genus
                      <input id="input1" class="aFruitFormInput" type="text">
                  </label>
              </div>
              <div>
                  <label for="">
                      Name
                      <input class="aFruitFormInput" type="text">
                  </label>
              </div>
              <div>
                  <label for="">
                      Id
                      <input class="aFruitFormInput" type="text">
                  </label>
              </div>
              <div>
                  <label for="">
                      Family
                      <input class="aFruitFormInput" type="text">
                  </label>
              </div>
              <div>
                  <label for="">
                      Order
                      <input class="aFruitFormInput" type="text">
                  </label>
              </div>
              <div>
                  <div>Nutritions</div>
                  <div>
                      <label for="">
                          Carbohydrates
                          <input class="aFruitFormInput" type="text">
                      </label>
                  </div>
                  <div>
                      <label for="">
                          Proteins
                          <input class="aFruitFormInput" type="text">
                      </label>
                  </div>
                  <div>
                      <label for="">
                          Fat
                          <input class="aFruitFormInput" type="text">
                      </label>
                  </div>
                  <div>
                      <label for="">
                          Calories
                          <input class="aFruitFormInput" type="text">
                      </label>
                  </div>
                  <div>
                      <label for="">
                          Sugar
                          <input class="aFruitFormInput" type="text">
                      </label>
                  </div>
              </div>
              <button type="submit" id="formSubmitBtn">Submit</button>
          </form>
          <div id="formStatus"></div>
      </div>
  
  
    `;

function fruitComponentAll(fruit: fruitType2, index: number): string {
  const n = fruit.nutritions;
  return ` <div class="aFruitWrapper">
    <div>
        <span>Genus</span> <span>${fruit.genus}</span>
    </div>
    <div>
        <span>Name</span> <span>${fruit.name}</span>
    </div>
    <div>
        <span>Id</span> <span>${fruit.id}</span>
    </div>
    <div>
        <span>Family</span> <span>${fruit.family}</span>
    </div>
    <div>
        <span>Order</span> <span>${fruit.order}</span>
    </div>
    <div class="nutritionWrapper">
        <div> Nutritions</div>
        <div class="nutt">
            <div> <span>Carbohydrates</span> <span>${n.carbohydrates}</span> </div>
            <div> <span>Proteins</span> <span>${n.protein}</span> </div>
            <div> <span>Fat</span> <span>${n.fat}</span> </div>
            <div> <span>Calories</span> <span>${n.calories}</span> </div>
            <div> <span>Sugar</span> <span>${n.sugar}</span> </div>
        </div>
  
    </div>
    <button id= "viewFruit${index}" data-fruitid= "${fruit.id}" > View </button>
    <div id="aFruitStatus">
    </div>
  </div>`;
}

export function fruitComponent(fruit: fruitType2): string {
  const n = fruit.nutritions;
  return ` <div class="aFruitWrapper">
    <div>
        <span>Genus</span> <span>${fruit.genus}</span>
    </div>
    <div>
        <span>Name</span> <span>${fruit.name}</span>
    </div>
    <div>
        <span>Id</span> <span>${fruit.id}</span>
    </div>
    <div>
        <span>Family</span> <span>${fruit.family}</span>
    </div>
    <div>
        <span>Order</span> <span>${fruit.order}</span>
    </div>
    <div class="nutritionWrapper">
        <div> Nutritions</div>
        <div class="nutt">
            <div> <span>Carbohydrates</span> <span>${n.carbohydrates}</span> </div>
            <div> <span>Proteins</span> <span>${n.protein}</span> </div>
            <div> <span>Fat</span> <span>${n.fat}</span> </div>
            <div> <span>Calories</span> <span>${n.calories}</span> </div>
            <div> <span>Sugar</span> <span>${n.sugar}</span> </div>
        </div>
  
    </div>
    <div class="btns">
        <button id="editFruitBtn">Edit</button>
        <button data-fruitid="${fruit.id}" id="delBtn"> Delete </button>
    </div>
    <div id="aFruitStatus">
    </div>
  </div>
  
  
  <div class="aFruitWrapper" style="display: none;">
    <form id="aFruitForm">
        <div>
            <label for="">
                Genus
                <input id="input1" value=${fruit.genus} class="aFruitFormInput" type="text">
            </label>
        </div>
        <div>
            <label for="">
                Name
                <input value=${fruit.name} class="aFruitFormInput" type="text">
            </label>
        </div>
        <div>
            <label for="">
                Id
                <input value=${fruit.id} class="aFruitFormInput" type="text">
            </label>
        </div>
        <div>
            <label for="">
                Family
                <input value=${fruit.family} class="aFruitFormInput" type="text">
            </label>
        </div>
        <div>
            <label for="">
                Order
                <input value=${fruit.order} class="aFruitFormInput" type="text">
            </label>
        </div>
        <div>
            <div>Nutritions</div>
            <div>
                <label for="">
                    Carbohydrates
                    <input value=${n.carbohydrates} class="aFruitFormInput" type="text">
                </label>
            </div>
            <div>
                <label for="">
                    Proteins
                    <input value=${n.protein} class="aFruitFormInput" type="text">
                </label>
            </div>
            <div>
                <label for="">
                    Fat
                    <input value=${n.fat} class="aFruitFormInput" type="text">
                </label>
            </div>
            <div>
                <label for="">
                    Calories
                    <input value=${n.calories} class="aFruitFormInput" type="text">
                </label>
            </div>
            <div>
                <label for="">
                    Sugar
                    <input value=${n.sugar} class="aFruitFormInput" type="text">
                </label>
            </div>
        </div>
        <button type="submit" id="formSubmitBtn">Submit</button>
    </form>
    <div id="formStatus"></div>
  </div>`;
}

export function fruitPage(fruit: fruitType2): string {
  return `${boilerPlate1}
  <body>
     ${fruitComponent(fruit)}
  </body>
  
  </html>`;
}

const boilerPlate1 = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
       <script type="module" src="../domMod.js"> </script> 
      <link rel="stylesheet" href="../style.css">
  </head>`;
