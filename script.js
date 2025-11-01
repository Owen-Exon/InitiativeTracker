let n=0;
let actors = [];
let stats = ["Turn","Name","AC","Str","Dex","Con","Wis","Int","Cha","Damage","Health","Statblock"]
addActor()

function updateBlock(actorNum) {
  if(document.getElementById("Statblock"+actorNum).value == "") {
    showHideStat(actorNum,0)
  }
  if (document.getElementById("Statblock"+actorNum).value.split(":")[0]=="L") {
    [mon0,mon1,mon2,mon3].forEach(monArray => {
      if(monArray[document.getElementById("Statblock"+actorNum).value.split(":")[1]]!=null) {
        document.getElementsByClassName("actorImage"+actorNum)[0].children[0].children[0].innerHTML = monArray[document.getElementById("Statblock"+actorNum).value.split(":")[1]]
      }
    });
  } else if (document.getElementById("Statblock"+actorNum).value.split(":")[0]=="https"){
    document.getElementsByClassName("actorImage"+actorNum)[0].children[0].children[0].innerHTML = `<iframe Title="Embed-${actorNum}" src="${document.getElementById("Statblock"+actorNum).value}#col" style="width:100%; height:80vh;"></iframe>`
  } else {
    document.getElementsByClassName("actorImage"+actorNum)[0].children[0].children[0].innerHTML = document.getElementById("Statblock"+actorNum).value
  }
}

function addActor(Turn=0,Name="",AC=0,Str=0,Dex=0,Con=0,Wis=0,Int=0,Cha=0,Damage=0,Health=0,Statblock="") {
  document.querySelector("table").children[0].innerHTML += 
  '<tr class="actor" id="actor'+n+'">\
  <td><button onclick="removeActor('+n+')">-</button></td>\
  <td><input onchange="updateState('+n+',\'Turn\')" class="ability" type="number" value="'+Turn+'" id="Turn'+n+'" name="Turn'+n+'" placeholder="Turn"></td>\
  <td><input onchange="updateState('+n+',\'Name\')" type="text" value="'+Name+'" id="Name'+n+'" name="Name'+n+'" placeholder="Name"></td>\
  <td><input onchange="updateState('+n+',\'AC\')" class="ability" type="number" value="'+AC+'" id="AC'+n+'" name="AC'+n+'" placeholder="AC"></td>\
  <td><input onchange="updateState('+n+',\'Str\')" class="ability" type="number" value="'+Str+'" id="Str'+n+'" name="Str'+n+'" placeholder="Str"></td>\
  <td><input onchange="updateState('+n+',\'Dex\')" class="ability" type="number" value="'+Dex+'" id="Dex'+n+'" name="Dex'+n+'" placeholder="Dex"></td>\
  <td><input onchange="updateState('+n+',\'Con\')" class="ability" type="number" value="'+Con+'" id="Con'+n+'" name="Con'+n+'" placeholder="Con"></td>\
  <td><input onchange="updateState('+n+',\'Wis\')" class="ability" type="number" value="'+Wis+'" id="Wis'+n+'" name="Wis'+n+'" placeholder="Wis"></td>\
  <td><input onchange="updateState('+n+',\'Int\')" class="ability" type="number" value="'+Int+'" id="Int'+n+'" name="Int'+n+'" placeholder="Int"></td>\
  <td><input onchange="updateState('+n+',\'Cha\')" class="ability" type="number" value="'+Cha+'" id="Cha'+n+'" name="Cha'+n+'" placeholder="Cha"></td>\
  <td><input onchange="updateState('+n+',\'Damage\')" class="longAbility" type="number" min="0" value="'+Damage+'" id="Damage'+n+'" name="Damage'+n+'" placeholder="Damage"></td>\
  <td><input onchange="updateState('+n+',\'Health\')" class="longAbility" type="number" min="0" value="'+Health+'" id="Health'+n+'" name="Health'+n+'" placeholder="Health"></td>\
  <td><input onchange="updateState('+n+',\'Statblock\')" type="text" value="" id="Statblock'+n+'" name="Statblock'+n+'" placeholder="Statblock"></td>\
  <td><button onclick="showHideStat('+n+')">Toggle</button></td>\
  <td><input onchange="updateActiveBool('+n+')" class="ability" type="checkbox" id="ActiveBool'+n+'" name="ActiveBool'+n+'" placeholder="NONE"></td>\
  </tr>\
  <tr class="actorImage inactive actorImage'+n+'"><td colspan="100"><div class="statBlockContainer"></div></td></tr>'
  actors.push(n)
  document.getElementById("Statblock"+n).value = Statblock
  updateState(n)
  n=n+1;
}

function updateState(actorNum, input) {
  if (input==null) {
    stats.forEach(stat => {
      updateState(actorNum,stat)
    });
    return
  }
  document.getElementById(input+actorNum).setAttribute('value', document.getElementById(input+actorNum).value);
  if (input == "Statblock") {
    updateBlock(actorNum)
  }
  if ((input=="Damage" || input=="Health")) {
    if (parseInt(document.getElementById("Damage"+actorNum).value) >= parseInt(document.getElementById("Health"+actorNum).value)){
      document.getElementById("actor"+actorNum).classList.add("deadRow")
      document.getElementsByClassName("actorImage"+actorNum)[0].classList.add("deadRow")
    } else {
      document.getElementById("actor"+actorNum).classList.remove("deadRow")
      document.getElementsByClassName("actorImage"+actorNum)[0].classList.remove("deadRow")
    }
  }
}

function updateActiveBool(actorNum,ignoreprefix=false) {
  if (document.getElementById("Name"+actorNum).value.includes(":") && !ignoreprefix) {
    let prefix = document.getElementById("Name"+actorNum).value.split(":")[0]
    actors.forEach(actor => {
      if (actor != actorNum) {
        if (document.getElementById("actor"+actor).children[stats.indexOf("Name")+1].children[0].value.split(":")[0]==prefix) {updateActiveBool(actor,true)}
      }
    });
  }
  
  let checkbox = document.getElementById("ActiveBool"+actorNum)

  if (ignoreprefix) {
    if (checkbox.checked) {
      checkbox.checked = false
    } else {
      checkbox.checked = true
    }
  }
  
  if (checkbox.checked) {
    checkbox.setAttribute('checked', true)
  } else {
    checkbox.removeAttribute('checked')
  }

  if (checkbox.checked) {
    document.getElementById("actor"+actorNum).classList.add("activeRow")
    document.getElementsByClassName("actorImage"+actorNum)[0].classList.add("activeRow")
  } else {
    document.getElementById("actor"+actorNum).classList.remove("activeRow")
    document.getElementsByClassName("actorImage"+actorNum)[0].classList.remove("activeRow")
  }
}

function showHideStat(actorNum, state=null) {
  let actorImage = document.getElementsByClassName("actorImage"+actorNum)[0]
  if (state != null) {
    if (state==0) {
      if(actorImage.classList.contains("active")) {
        actorImage.classList.remove("active");
        actorImage.classList.add("inactive");
      }
    } else if (state==1) {
      if(actorImage.classList.contains("inactive")) {
        actorImage.classList.remove("inactive");
        actorImage.classList.add("active");
      }
    }
    } else {
      if(actorImage.children[0].children[0].innerHTML != "") {
        if(actorImage.classList.contains("inactive")) {
          actorImage.classList.remove("inactive");
          actorImage.classList.add("active");
        } else if(actorImage.classList.contains("active")) {
          actorImage.classList.remove("active");
          actorImage.classList.add("inactive");
        }
      }
    }
}

function removeActor(actorNum, ignoreEmpty=false) {
  document.getElementById("actor"+actorNum).remove();
  document.getElementsByClassName("actorImage"+actorNum)[0].remove()
  actors.splice(actors.indexOf(n),1)
  if(document.querySelector("table").children[0].children[1] == null && !ignoreEmpty) {
    addActor()
  }
}

function sortActors() {
  let turns = []
  let tempActors = []
  let tempActorsImage = []
  Array.from(document.getElementsByClassName("actor")).forEach(actor => {
    thisn =  actors[actors.indexOf(parseInt(actor.id.slice(5)))]
    thist = parseInt(actor.children[stats.indexOf("Turn")+1].children[0].value)
    thisName = actor.children[stats.indexOf("Name")+1].children[0].value
    thisDex = actor.children[stats.indexOf("Dex")+1].children[0].value
    turns.push([thist,thisn,thisName,thisDex])
  });
  
  turns.sort(function (a, b) {
    if(b[0] - a[0] != 0) {
      return b[0] - a[0]
    } else {
      if (b[3] - a[3] !=0) {
        return b[3] - a[3]
      } else if (a[2] < b[2]) {
        return -1
      } else if (a[2] > b[2]) {
        return 1
      } else {
        return 0
      }
    }
  });
  
  turns.forEach(turn => {
    tempActors.push(document.getElementById("actor"+turn[1]).outerHTML)
    tempActorsImage.push(document.getElementsByClassName("actorImage"+turn[1])[0].outerHTML)
  });
  document.querySelector("table").children[0].innerHTML = "<tr><th></th><th>Turn</th><th>Name</th><th>AC</th><th>Str</th><th>Dex</th><th>Con</th><th>Wis</th><th>Int</th><th>Cha</th><th>Damage</th><th>Health</th><th>Statblock (L:)</th><th>Stats</th><th>Active</th></tr>"
  for (let i = 0; i < tempActors.length; i++) {
    document.querySelector("table").children[0].innerHTML += tempActors[i]
    document.querySelector("table").children[0].innerHTML += tempActorsImage[i]
  }
}


function saveGrid() {
  let gridTemp = []
  Array.from(document.getElementsByClassName("actor")).forEach(actor => {
    let actorTemp = {Turn: 0,Name: "",AC: 0,Str: 0,Dex: 0,Con: 0,Wis: 0,Int: 0,Cha: 0,Damage: 0,Health: 0,Statblock: ''}
    stats.forEach(stat => {
      actorTemp[stat] = actor.children[stats.indexOf(stat)+1].children[0].value
    });
    gridTemp.push(actorTemp)
  });
  document.getElementById("jsContent").value = JSON.stringify(gridTemp)
}

function loadGrid() {
  let gridTemp = []
  gridTemp = JSON.parse(document.getElementById("jsContent").value)

  actors.forEach(actor => {
    removeActor(actor,true)
  });

  gridTemp.forEach(actor => {
    addActor(actor["Turn"],actor["Name"],actor["AC"],actor["Str"],actor["Dex"],actor["Con"],actor["Wis"],actor["Int"],actor["Cha"],actor["Damage"],actor["Health"],actor["Statblock"],)
  });
}