var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
// let all_fruits: Array<fruitType>;
console.log("sctipt loaded");
var showEditFruitForm = false;
var all_fruits;
function InjectAllFruit() {
    var divv = document.createElement("div");
    divv.innerHTML = "";
}
//
var btnToCreatePage = (_a = document
    .getElementById("createNewFruitPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    window.location.href = "http://localhost:1000/create_fruit";
});
var statusDiv = document.getElementById("aFruitStatus");
var delBtn = document.getElementById("delBtn");
var fruitForm = document.getElementById("aFruitForm");
var allFruits = document.getElementsByClassName("aFruitWrapper");
var aFruitInputs = document.getElementsByClassName("aFruitFormInput");
// const createFruitFormInputs = document.getElementsByClassName(
//   "createFruitFormInput"
// ) as HTMLCollectionOf<HTMLInputElement>;
var formStatusDiv = document.getElementById("formStatus");
// document.getinp
if (delBtn) {
    delBtn.addEventListener("click", function () {
        console.log("caught click\", \"id is => ".concat(delBtn.dataset.fruitid, " "));
        deleteFruit();
    });
}
var _loop_1 = function (i) {
    var fruitBtn = document.getElementById("viewFruit".concat(i));
    console.log("fruit btn =>> ".concat(fruitBtn));
    fruitBtn === null || fruitBtn === void 0 ? void 0 : fruitBtn.addEventListener("click", function () {
        window.location.href = "http://localhost:1000/fruit/".concat(fruitBtn.dataset.fruitid);
    });
};
for (var i = 0; i < allFruits.length; i++) {
    _loop_1(i);
}
fruitForm === null || fruitForm === void 0 ? void 0 : fruitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (fruitForm.dataset.create == "create") {
        console.log("creating");
        createFruit();
        return;
    }
    editFruit();
});
(_b = document.getElementById("editFruitBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    console.log("edit btn clicked");
    if (showEditFruitForm) {
        fruitForm.parentElement.style.display = "none";
    }
    else {
        fruitForm.parentElement.style.display = "block";
    }
    showEditFruitForm = !showEditFruitForm;
});
if (aFruitInputs) {
    var _loop_2 = function (i) {
        if (i == 2 || i >= 5) {
            // console.log(Number(i));
            aFruitInputs[i].addEventListener("change", function (e) {
                var _a, _b;
                var val = aFruitInputs[i].value;
                if (Number.isNaN(Number(val))) {
                    var errDiv = document.createElement("div");
                    errDiv.setAttribute("id", "errDiv".concat(i));
                    errDiv.classList.add("errText");
                    errDiv.textContent = "invalid number!";
                    (_b = (_a = aFruitInputs[i].parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errDiv);
                }
                else {
                    var err = document.getElementById("errDiv".concat(i));
                    err === null || err === void 0 ? void 0 : err.remove();
                    // console.log("removed");
                }
            });
        }
    };
    for (var i = 0; i < aFruitInputs.length; i++) {
        _loop_2(i);
    }
}
//
function createFruit() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            clearInterval(interval1);
            data = {
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
            }).then(function (res) {
                if (res.status == 200) {
                    if (formStatusDiv) {
                        formStatusDiv.innerText = "Created Succesfully";
                        setTimeout(function () {
                            if ((fruitForm === null || fruitForm === void 0 ? void 0 : fruitForm.dataset.create) != "create") {
                                fruitForm.parentElement.style.display = "none";
                                return;
                            }
                            window.location.href = "http://localhost:1000/fruit/".concat(data.id);
                        }, 3000);
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
function deleteFruit() {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            id = delBtn === null || delBtn === void 0 ? void 0 : delBtn.dataset.fruitid;
            if (id == "undefined") {
                return [2 /*return*/];
            }
            if (delBtn) {
                delBtn.innerHTML = loader;
            }
            fetch("/delete_fruit/".concat(id), {
                method: "DELETE",
            })
                .then(function (res) {
                if (res.status == 204) {
                    if (statusDiv) {
                        statusDiv.innerHTML = "deleted succesfully";
                    }
                    setTimeout(function () {
                        window.location.replace("http://localhost:1000/all_fruits");
                    }, 3000);
                    return console.log("deleted succesfully");
                }
                console.log("Something went wrong");
            })
                .catch(function (err) {
                console.log(err);
                if (statusDiv) {
                    statusDiv.innerHTML = JSON.stringify(err);
                }
            });
            return [2 /*return*/];
        });
    });
}
function disableSubmitBtn(formInputs, submitBtn) {
    for (var i = 0; i < formInputs.length; i++) {
        var val = formInputs[i].value;
        if (i == 2 || i >= 5) {
            if (Number.isNaN(Number(val))) {
                // console.log(val);
                document.getElementById(submitBtn).disabled =
                    true;
                // console.log(btnn);
                return;
            }
            document.getElementById(submitBtn).disabled =
                false;
            return;
        }
    }
}
function editFruit() {
    // fruitForm?.children
    clearInterval(interval1);
    var data = {
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
    }).then(function (res) {
        if (res.status == 200) {
            if (formStatusDiv) {
                formStatusDiv.innerText = "Updated Succesfully";
                setTimeout(function () {
                    if (fruitForm) {
                        fruitForm.parentElement.style.display = "none";
                    }
                }, 3000);
            }
        }
    });
}
var interval1 = setInterval(function () {
    disableSubmitBtn(aFruitInputs, "formSubmitBtn");
}, 200);
var loader = "\n<div class=\"loader\">\n                <div></div>\n                <div></div>\n                <div></div>\n                <div></div>\n            </div>";
