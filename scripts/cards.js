//////////////////////////////////////  TRAZI  ////////////////////////////////////////////////////////////////////////////

document.querySelector("#search-box").addEventListener("keyup", (e)=> {
let query= e.currentTarget.value.toUpperCase();
let cards = document.querySelectorAll(".card");
for(let i =0; i<cards.length;i++)
{
    let card = cards[i];
    if(card.textContent.toUpperCase().indexOf(query)>= 0)
    {
        card.classList.remove("hidden");
    }
    else
    {
         card.classList.add("hidden");
    }
}
});

////////////////////////////////  NOVI POST  ///////////////////////////////////////////////////////////////////////////////////
let addCardButton = document.querySelector("#add-card-button");

addCardButton.addEventListener("click", (e) => {

let lokacija = prompt("Unesi lokaciju", "lokacija");
if(!lokacija) { return; }


let imageUrl = prompt("Unesi url slike", "images/slika2.jpg");
if(!imageUrl) { return; }


let tagovi = prompt("Unesi tagove", "#tag");
if(!tagovi) { return; }


let cardTemplate = document.querySelector("#card-template");
let cardElement = document.importNode(cardTemplate.content, true);

cardElement.querySelector(".location").textContent = lokacija;
cardElement.querySelector(".main-pic").src = imageUrl;
cardElement.querySelector(".hashtags").textContent = tagovi;


cardElement.querySelector(".heart-icon").addEventListener("click", handleHeartIconClick);
cardElement.querySelector(".fa-bookmark-o").addEventListener("click", handleBookmarkIconClick);
cardElement.querySelector(".fa-comment-o").addEventListener("click",handleCommentClick);

cardElement.querySelector(".comment").addEventListener("keypress",enter);
cardElement.querySelector(".comment").addEventListener(enter,handleSubmitButtonClick);

let cardsContainer = document.querySelector(".cards-container");

cardsContainer.prepend(cardElement); //dodaj na pocetak

});

///////////////////////////////////  BRISANJE PRIJEDLOGA ///////////////////////////////////////////////////////////

let deleteIcons = document.querySelectorAll(".follow .delete-button");

for(let i = 0; i < deleteIcons.length; i++)
{
    let deleteIcon = deleteIcons[i];
    deleteIcon.addEventListener("click", handleDeleteClick);
}

function handleDeleteClick(e)
{ 
    let deleteIcon = e.currentTarget;
    let follow = deleteIcon.parentElement;

    findClass=follow.classList;

    let toHide = document.getElementsByClassName(findClass); //da se izbrise i lijevo i desno (ista klasa)
    
    for(let i = 0; i < toHide.length; i++)
    {
            toHide[i].style.display="none"; 
    }   

}


///////////follow botuni/////////////////////////////////////////////////////
let followButtons = document.querySelectorAll(".follow .follow-button");

for(let i = 0; i < followButtons.length; i++){
    let followButton = followButtons[i];
    followButton.addEventListener("click", handleFollowClick);
}


function handleFollowClick(e){ 
    let followButton = e.currentTarget;
    let follow = followButton.parentElement;
   
    a=follow.classList;

    let toHide = document.getElementsByClassName(a);
    
    for(let i = 0; i < toHide.length; i++)
    {
            toHide[i].style.display="none";
    }   
 
    let numOfFol=document.getElementById('numOfFollowers');
    let counter=numOfFol.innerHTML;

    counter++;
    numOfFol.innerHTML=counter;
}


//////////////////////////////////// KORISNIK U ZAGLAVLJU /////////////////////////////////////////////////////////////////

let userIcon = document.querySelector("#headerUser");

userIcon.addEventListener("click", handleUserIconClick);

function handleUserIconClick(e)
{
    let usIcon = e.currentTarget; 
    
    let cards = document.querySelectorAll(".card.elseCard"); //kartice koje nisu od trenutnog korisnika

    if(usIcon.classList.contains("yellowUser"))
    {
        usIcon.classList.remove("yellowUser");
        for(let i =0; i<cards.length;i++)
        {
            let card = cards[i];
            card.classList.remove("hidden");
        }
    }
    else 
    {
        usIcon.classList.add("yellowUser");
        for(let i =0; i<cards.length;i++)
        {
            let card = cards[i];
            card.classList.add("hidden");
        }
    }    
}

///////////////////////BOOKMARK/////////////////////////////////////
let bookmarkIcon = document.querySelectorAll("#left .fa-bookmark-o"); //da ne reagira u O meni dijelu
for(let i = 0; i < bookmarkIcon.length; i++)
{
    let book = bookmarkIcon[i];
    book.addEventListener("click", handleBookmarkIconClick);
}

function handleBookmarkIconClick(e)
{

    let currentBook = e.currentTarget; //bookmark na kojeg smo sad klikli
    let bookMarkNo = document.getElementById('bookmarkNumber'); //o meni dio
    let number = bookMarkNo.innerHTML; //za promjenu broja

    if(currentBook.classList.contains("yellowBookmark"))
    { 
        currentBook.classList.remove("yellowBookmark");
        number--;
        bookMarkNo.innerHTML = number;
    }
    else 
    {
        
        currentBook.classList.add("yellowBookmark");
        number++;
        bookMarkNo.innerHTML = number;
    }
    
}
///////////SRCA-DA SE POVECA BROJAC U O MENI DIJELU/////////////////////////////////////////////////////
///////////////////////////+ da se poveća u postu///////////////////////////////////////////////////////

let heartIcons = document.querySelectorAll("#left .heart-icon"); //da ne dira desni dio
for(let i = 0; i < heartIcons.length; i++)
{
    let heartIcon = heartIcons[i];
    heartIcon.addEventListener("click", handleHeartIconClick);
}

function handleHeartIconClick(e){
    let heartIcon = e.currentTarget; 
    

    let totalHeartNumber = document.getElementById('totalLikeNumber'); //ukupan broj (desno)
    let number = totalHeartNumber.innerHTML;


    let cards = document.querySelectorAll(".card");

    for(let i =0; i<cards.length;i++)
    {
        let card = cards[i];
        if(card.contains(heartIcon))
        {
            let thisLike = document.getElementsByClassName('addLike'); //broj u postu
            let brojac = thisLike[i].innerHTML;
            if(heartIcon.classList.contains("fa-heart-o"))
                brojac++;
        
            else
                brojac--;
             thisLike[i].innerHTML = brojac;
        
        }
     }

    if(heartIcon.classList.contains("fa-heart-o"))
    { 
        heartIcon.classList.remove("fa-heart-o");
        heartIcon.classList.add("fa-heart");
        number++;
        totalHeartNumber.innerHTML = number;

    }
    else 
    {
        heartIcon.classList.remove("fa-heart");
        heartIcon.classList.add("fa-heart-o");
        number--;
        totalHeartNumber.innerHTML = number;     
    }
    
}

//////////Srce u headeru/////////////////////////////////////

let headerHeart = document.querySelector("#headerHeart");

headerHeart.addEventListener("click", handleHeaderHeartIconClick);


function handleHeaderHeartIconClick(e)
{

    let headerIcon=e.currentTarget;
    let cards=document.querySelectorAll(".card");
    let allHearts=document.querySelectorAll("#left .heart-icon"); //da ne reagira desni

    if(headerIcon.classList.contains("fa-heart-o"))
    {
        headerIcon.classList.remove("fa-heart-o");
        headerIcon.classList.add("fa-heart");

        for(let i =0;i<cards.length;i++)
        {
            if(allHearts[i].classList.contains("fa-heart-o"))
                cards[i].classList.add("hidden");
        }
    }

    else
    {
        headerIcon.classList.remove("fa-heart");
        headerIcon.classList.add("fa-heart-o");

        for(let i =0;i<cards.length;i++)
            cards[i].classList.remove("hidden");
    }

}












////////////////////KOMENTAR-redirekcija/////////////////////////////////////////

let commentButtons=document.querySelectorAll(".fa-comment-o");
for(let i = 0; i < commentButtons.length; i++){
    let commentButton = commentButtons[i];
    commentButton.addEventListener("click", handleCommentClick);
}
function handleCommentClick(e){
    let currentCom=e.currentTarget;
    let a=currentCom.parentElement.parentElement.parentElement;//da se dode do klase bellow pic
    commentBoxFocus=a.querySelector(".comment").focus(); //fokus

}


/*let submitButtons=document.querySelectorAll(".subButton"); //sakriveno u css da se ne vidi botun
for(let i=0;i<submitButtons.length;i++)
    submitButtons[i].addEventListener("click",handleSubmitButtonClick);
*/
///////KOMENTARI///////////////////////////////////
function handleSubmitButtonClick()
{

   clickedSubmitButton=event.currentTarget; //event, a ne (e)
   let parentOfClicked=clickedSubmitButton.parentElement; // da se usmjerimo na trenutnu karticu

   let mojeIme=document.querySelector("#current-user-name");
   
   let poruka=mojeIme.innerHTML+ ": "+event.currentTarget.value; //lipimo vrijednsot komentara
  

   let whereToPlace=parentOfClicked.querySelectorAll(".mess"); //nac di triba zalipit komentar
   let linebreak = document.createElement("br");
   
   whereToPlace[0].appendChild(linebreak); //od nula isto ka za foundCommentValue
   whereToPlace[0].innerHTML+= poruka;


    event.currentTarget.value=""; 

}


/////da se komentira sa enter///////

let a=document.getElementsByClassName("comment");
for(let i=0;i<a.length;i++)
    a[i].onkeyup=enter; //omoguci potvrdu sa enterom za sve comment box-ove

        
    function enter(e) {
        if (e.which == 13) 
        handleSubmitButtonClick();
    }



