// let all_fruits: Array<fruitType>;
console.log("sctipt loaded");
let showEditFruitForm = false;
let all_fruits: Array<fruitType>;
function InjectAllFruit() {
  const divv = document.createElement("div");
  divv.innerHTML = "";
}
//
const btnToCreatePage = document
  .getElementById("createNewFruitPage")
  ?.addEventListener("click", () => {
    window.location.href = "http://localhost:1000/create_fruit";
  });
const statusDiv = document.getElementById("aFruitStatus");
const delBtn = document.getElementById("delBtn");
const fruitForm = document.getElementById("aFruitForm");
const allFruits = document.getElementsByClassName("aFruitWrapper");
const aFruitInputs = document.getElementsByClassName(
  "aFruitFormInput"
) as HTMLCollectionOf<HTMLInputElement>;
// const createFruitFormInputs = document.getElementsByClassName(
//   "createFruitFormInput"
// ) as HTMLCollectionOf<HTMLInputElement>;
const formStatusDiv = document.getElementById("formStatus");
// document.getinp
if (delBtn) {
  delBtn.addEventListener("click", () => {
    console.log(`caught click", "id is => ${delBtn.dataset.fruitid} `);
    deleteFruit();
  });
}

for (let i = 0; i < allFruits.length; i++) {
  const fruitBtn = document.getElementById(`viewFruit${i}`);
  console.log(`fruit btn =>> ${fruitBtn}`);
  fruitBtn?.addEventListener("click", () => {
    window.location.href = `http://localhost:1000/fruit/${fruitBtn.dataset.fruitid}`;
  });
}

fruitForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (fruitForm.dataset.create == "create") {
    console.log("creating");
    createFruit();
    return;
  }
  editFruit();
});
document.getElementById("editFruitBtn")?.addEventListener("click", () => {
  console.log("edit btn clicked");
  if (showEditFruitForm) {
    fruitForm!.parentElement!.style.display = "none";
  } else {
    fruitForm!.parentElement!.style.display = "block";
  }
  showEditFruitForm = !showEditFruitForm;
});

if (aFruitInputs) {
  for (let i = 0; i < aFruitInputs.length; i++) {
    if (i == 2 || i >= 5) {
      // console.log(Number(i));
      aFruitInputs[i].addEventListener("change", (e) => {
        const val = aFruitInputs[i].value;
        if (Number.isNaN(Number(val))) {
          const errDiv = document.createElement("div");
          errDiv.setAttribute("id", `errDiv${i}`);
          errDiv.classList.add("errText");
          errDiv.textContent = "invalid number!";
          aFruitInputs[i].parentElement?.parentElement?.appendChild(errDiv);
        } else {
          const err = document.getElementById(`errDiv${i}`);
          err?.remove();
          // console.log("removed");
        }
      });
    }
  }
}

//

async function createFruit() {
  clearInterval(interval1);
  const data: fruitType = {
    genus: aFruitInputs[0].value,
    name: aFruitInputs[1].value,
    id: Number(aFruitInputs[2].value),
    family: aFruitInputs[3].value,
    order: aFruitInputs[4].value,
    nutritions: {
      carbohydrates: Number(aFruitInputs[5].value),
      protein: Number(aFruitInputs[6].value),
      fat: Number(aFruitInputs[7].value),
      calories: Number(aFruitInputs[8].value),
      sugar: Number(aFruitInputs[9].value),
    },
  };
  console.log(data);
  fetch("/add_fruit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status == 200) {
      if (formStatusDiv) {
        formStatusDiv.innerText = "Created Succesfully";
        setTimeout(() => {
          if (fruitForm?.dataset.create != "create") {
            fruitForm!.parentElement!.style.display = "none";
            return;
          }
          window.location.href = `http://localhost:1000/fruit/${data.id}`;
        }, 3000);
      }
    }
  });
}

async function deleteFruit() {
  // display something that shows delete request is in progress
  const id = delBtn?.dataset.fruitid as string;
  if (id == "undefined") {
    return;
  }
  if (delBtn) {
    delBtn.innerHTML = loader;
  }

  fetch(`/delete_fruit/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status == 204) {
        if (statusDiv) {
          statusDiv.innerHTML = "deleted succesfully";
        }
        setTimeout(() => {
          window.location.replace("http://localhost:1000/all_fruits");
        }, 3000);
        return console.log("deleted succesfully");
      }
      console.log("Something went wrong");
    })
    .catch((err) => {
      console.log(err);
      if (statusDiv) {
        statusDiv.innerHTML = JSON.stringify(err);
      }
    });
}
function disableSubmitBtn(
  formInputs: HTMLCollectionOf<HTMLInputElement>,
  submitBtn: string
) {
  for (let i = 0; i < formInputs.length; i++) {
    const val = formInputs[i].value;
    if (i == 2 || i >= 5) {
      if (Number.isNaN(Number(val))) {
        // console.log(val);
        (document.getElementById(submitBtn) as HTMLButtonElement).disabled =
          true;
        // console.log(btnn);
        return;
      }
      (document.getElementById(submitBtn) as HTMLButtonElement).disabled =
        false;
      return;
    }
  }
}

function editFruit() {
  // fruitForm?.children
  clearInterval(interval1);
  const data: fruitType = {
    genus: aFruitInputs[0].value,
    name: aFruitInputs[1].value,
    id: Number(aFruitInputs[2].value),
    family: aFruitInputs[3].value,
    order: aFruitInputs[4].value,
    nutritions: {
      carbohydrates: Number(aFruitInputs[5].value),
      protein: Number(aFruitInputs[6].value),
      fat: Number(aFruitInputs[7].value),
      calories: Number(aFruitInputs[8].value),
      sugar: Number(aFruitInputs[9].value),
    },
  };
  console.log(data);

  fetch("/update_fruit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status == 200) {
      if (formStatusDiv) {
        formStatusDiv.innerText = "Updated Succesfully";
        setTimeout(() => {
          if (fruitForm) {
            fruitForm.parentElement!.style.display = "none";
          }
        }, 3000);
      }
    }
  });
}

const interval1 = setInterval(() => {
  disableSubmitBtn(aFruitInputs, "formSubmitBtn");
}, 200);
const loader = `
<div class="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
// types
type fruitType = {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions?: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
};

type dat = {
  a: string;
  c: string;
};
