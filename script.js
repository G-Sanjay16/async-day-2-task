function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
}

let container = element("div", "container", "", "");
const H1 = element("H1", "text-center", "title", "Countries Weather Details");
const row = element("div", "row", "", "");

const response = fetch("https://restcountries.com/v3.1/all")
response.then((data) => data.json()).then((result) => {
    //console.log(result)
    for (let i = 0; i < result.length; i++) {
        const col = document.createElement("div")
        col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4"
        col.innerHTML = `
    <div class="card h-100">
    <div class="card-header ">
    <h5 class="card-title text-center">${result[i].name.common}</h5>
    </div>
    <div class="img-box">
    <img src="${result[i].flags.png}" class="card-img-top" alt="country image"/>
    </div>
    <div class= "card-body ">
    <div class= "card-text text-center ">Region:${result[i].region}</div>
    <div class= "card-text text-center ">Capital:${result[i].capital}</div>
    <div class= "card-text text-center ">Country code:${result[i].cca3}</div>
    <button class="btn btn-primary">Click for weather </button>
    </div>
    `
        row.append(col)
    }
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let latlng = result[index].latlng;
            let lat = latlng[0];
            let lon = latlng[1];
            // console.log(lat);
            //console.log(lon);
            let weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5e4ad1fd6197547e1036e67dbca1e6a0`);
            weatherApi.then((datas) => datas.json())
                .then((res) => {
                    //console.log(res))
                    alert(`weather of ${result[index].name.common} is ${Math.floor(res.main.temp)} 🌡️C`
                );
        });
            


                });
        });
    });
 document.body.append(H1, container);
  container.append(row);
