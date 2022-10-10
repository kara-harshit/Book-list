const bookName=document.querySelector('#bn');
const authName=document.querySelector('#an');
const gen=document.querySelector('#genre');
const linkadd=document.querySelector('#bl');
const ab_btn=document.querySelector('#ab_btn');
const allList=document.querySelector('.all_list');

// events
document.addEventListener('DOMContentLoaded',getlist);
ab_btn.addEventListener('click',addbook);
allList.addEventListener('click',deletelist)


// functions
function addbook(event)
{
    event.preventDefault();
    var b_name=bookName.value;
    var auth_name=authName.value;
    var genre=gen.value;
    var link_add=linkadd.value;
    // div
    const listdiv=document.createElement('div');
    listdiv.classList.add("list");
    // para
    const listpara=document.createElement('p');
    listpara.classList.add("list_p");
    listpara.innerText=`${b_name} by ${auth_name}`;
    saveLocalList(listpara.innerText);
    listdiv.appendChild(listpara);
    //  trash button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    listdiv.appendChild(trashButton);

    allList.appendChild(listdiv) ;  
    bookName.value="";
    authName.value="";
    linkadd.value="";
}

function saveLocalList(list){
    let lists;
    if(localStorage.getItem('lists')===null)
    {
        lists=[];
    }else{
        lists=JSON.parse(localStorage.getItem('lists'));
    }
    lists.push(list);
    localStorage.setItem('lists',JSON.stringify(lists));
}

function getlist()
{
    let lists;
    if(localStorage.getItem('lists')===null)
    {
        lists=[];
    }else{
        lists=JSON.parse(localStorage.getItem('lists'));
    }
    lists.forEach(function(list){
        const listdiv=document.createElement('div');
        listdiv.classList.add("list");
        // para
        const listpara=document.createElement('p');
        listpara.innerText=list;
        listpara.classList.add("list_p");
        listdiv.appendChild(listpara);
        //  trash button
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        listdiv.appendChild(trashButton);

        allList.appendChild(listdiv) ;  
    });
}

function deletelist(e)
{
    const item=e.target;
    // console.log(item.classList);
    if(item.classList[1]==="fa-trash")
    {
        item.parentElement.classList.add("del");
        removefromlocal(item.parentElement);
        item.parentElement.addEventListener('transitioned',function(){
            item.parentElement.remove();
        });
    }
}

function removefromlocal(list){
    let lists;
    if(localStorage.getItem('lists')===null)
    {
        lists=[];
    }
    else{
        lists=JSON.parse(localStorage.getItem('lists'));
    }   

    const listIndex=list.children[0].innerText;
    lists.splice(lists.indexOf(listIndex),1);
    localStorage.setItem("lists",JSON.stringify(lists));
}