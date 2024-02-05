function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
} 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const ouvrir = document.querySelector(".close-btn");
const modal = document.querySelector(".close-modal");
const close = document.querySelector(".closeModalFermeture");
const fermer = document.querySelector(".fermer");

// launch modal event 
modalBtn.forEach((btn) => btn.addEventListener("click",launchModal));

// launch modal form
function launchModal () {
  modalbg.style.display = "block";
}
// close modal form 
function closeModal() {
  modalbg.style.display="none";
}
// modal de fin d'inscription
closeBtn.addEventListener("click",closeModal);

// fermeture derniere modal
close.addEventListener("click",closeModal);
// fonction pour mettre a zero les valeurs de la formulaire
function remiseAZero () {
  closeModal();
  document.getElementById("formulaire").reset();
  document.querySelector(".close-modal").style.display = "none";
  document.querySelector(".content").style.display = "block";
}

fermer.addEventListener("click",remiseAZero);

// verification formulaire
// fonction d'affichage d'erreur
function ToggleError (element, dataError, dataErrorVisible) {
  element.setAttribute("data-error",dataError);
  element.setAttribute("data-error-visible",dataErrorVisible);
}

// verifier si un champ est vide
function verifierChamp (chaine) {
  let test = true;
  if(chaine.length<=2){
    test = false
  }
  return test;
}

// verification du modéle de l'email
function verifierEmail (mail){
  let test=false;
  let emailRegExp = new RegExp(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/);
  if (emailRegExp.test(mail)){
    test = true ;
  }
  return test;
}
// verification nbr de tournoi
function nbTournoi (){
  if (!(parseInt(document.getElementById("quantity").value) >= 0)){
    ToggleError(document.getElementById("quantity").parentElement,"vous devez entrer le nombre de tournois.","true");
    return false;
  }
  ToggleError(document.getElementById("quantity").parentElement,undefined, "false");
  return true;
}

// verification de selection du pays
function isAnyLocationSelected (){
  let test = true;
  const locations = document.getElementsByName('location');
  let villeSelectionnes = null;
  for(const location of locations){
    if (location.checked) {
      villeSelectionnes = location.value
      break;
    }
  }
  if (villeSelectionnes===null){
    test= false;
    ToggleError(document.getElementById("locations"),"vous devez selectionner une ville.","true");
  }else{
    ToggleError(document.getElementById("locations"),undefined,"false");
    test = true;
  }
  return test;
}

// affichage d'erreur apres verification
function testErreur (id,message){
  if (!verifierChamp(document.getElementById(id).value)){
    ToggleError(document.getElementById(id).parentElement, message, "true");
    return false;
  }
  ToggleError(document.getElementById(id).parentElement,undefined, "false");
  return true;
}

// acceptation des termes 
function testCheckBox () {
  const conditionUtilisation = document.getElementById("checkbox1").checked;
  if (!conditionUtilisation){
    ToggleError(document.getElementById("checkbox1").parentElement,"Vous devez vérifier que vous acceptez les termes et conditions.","true");
    return false;
  }
  ToggleError(document.getElementById("checkbox1").parentElement,undefined,"false");
  return true;
}

function validerForm(){  
  const testPrenom = testErreur("first","Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  const testNom = testErreur("last","Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  const testMail =testErreur("email","l'adresse mail est invalide");
  const testDate = testErreur("birthdate","Vous devez entrer votre date de naissance.");
  const testQuantity = nbTournoi();
  const testLocation = isAnyLocationSelected();
  const testCondition = testCheckBox();
  return  testPrenom && testNom && testMail && testDate && testQuantity && testLocation && testCondition;
}

submitBtn.addEventListener("click",function(event){
  event.preventDefault();
  if(validerForm()==true){
    document.querySelector(".content").style.display = "none";
    document.querySelector(".close-modal").style.display = "block";
  }
})
