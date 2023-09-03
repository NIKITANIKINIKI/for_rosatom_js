const my_form = document.querySelector("#my-form");
const my_input = document.querySelector("#my-input");
const my_tasks = document.querySelector(".description");
const show = document.querySelector(".show");
const remove_f=document.getElementById("remove-f");
const remove_l=document.getElementById('remove-l');
const select_e=document.getElementById('select-e');
const select_o=document.getElementById('select-o');


let data = [];

if (localStorage.getItem("data"))
  data = JSON.parse(localStorage.getItem("data"));

data.sort((a,b)=> {
  if(a.check==='number-ok' && b.check!=='number-ok'){
    return 1;
  }
  else if(a.check!=='number-ok' && b.check==='number-ok'){
    return -1;
  }
  else{
    return 0;
  }
})


function addHTML(datas){
  const NewOb = `
    <div id='${datas.name}' class='${datas.style}'>
        <div class="block-messages">
            <p><span class=${datas.check}>${data.indexOf(datas) + 1}</span> ${
    datas.content
  }</p>
          <div class="button-task">
            <button id="ok">✓</button>
            <button id="del">✕</button>
          </div>
        </div>
    </div>`;

  my_tasks.insertAdjacentHTML("beforeend", NewOb);
}

data.forEach(function (datas) {
  addHTML(datas);
});

let count = document.getElementById("number-cases");
count.textContent = data.length;

my_form.addEventListener("submit", function (e) {
  const myInputText = my_input.value;

  if (myInputText === "") {
    e.preventDefault()
    show.style.display = "block";
  } else {
    show.style.display = "none";
    const newObj = {
      name: generateNewName(),
      content: myInputText,
      check: "number",
      style: 'my-app',
    };
    data.push(newObj);
    addHTML(newObj);
    saveData();
  }
});

my_tasks.addEventListener("click", function (e) {
  // console.log(e.target);
  if (e.target.getAttribute("id") === "ok") {
    console.log("UPDATE!");
    const myAppTag = e.target.closest(".my-app");
    const Index=data.findIndex(item => item.name===myAppTag.id);
    if(Index!==-1){
      if(data[Index].check==='number-ok'){
        data[Index].check='number';
      }
      else{
        data[Index].check='number-ok';
      }
    }
    location.reload();
  }
  if (e.target.getAttribute("id") === "del") {
    console.log("DELETE!");
    const myAppTag = e.target.closest(".my-app");

    data = data.filter((data) => data.name != myAppTag.id);

    console.log(data);
    myAppTag.remove();
    location.reload();
  }
  saveData();
});

remove_f.addEventListener('click', function(){
  if(data.length==0){
    alert('The task list is empty!');
  }
  else{
    data.splice(0,1);
    location.reload();
    saveData();
  }
  
})

remove_l.addEventListener('click', function(){
  if(data.length==0){
    alert('The task list is empty!');
  }
  else{
    data.pop();
    location.reload();
    saveData();
  }
})


select_e.addEventListener('click',function(){
  for(let i=0; i<data.length; i++){
    if(i%2!=0){
      data[i].style='my-app my-app-color-e';
    }
  }
  location.reload();
  saveData();
})


select_o.addEventListener('click',function(){
  for(let i=0; i<data.length; i++){
    if(i%2==0){
      data[i].style='my-app my-app-color-o';
    }
  }
  location.reload();
  saveData();
})



function generateNewName() {
  return Date.now().toString() + Math.random().toString().substring(3, 6);
}

function saveData() {
  localStorage.setItem("data", JSON.stringify(data));
  let len = data.length;
  let count = document.getElementById("number-cases");
  count.textContent = len;

}
