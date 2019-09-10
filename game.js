
const cardArray = [0, 1 ,2, 3, 4, 5, 6, 7, 8].map(index => {
  const card = new Image();
  card.src = `images/sym${index + 1}.png`;
  card.id = index;
  card.draggable = false;
  card.selected = false;
  return card;
})
const winningSound = new Audio("sounds/win.mp3");
const loosingSound = new Audio("sounds/loss.mp3");
const cardSound = new Audio("sounds/cardSelect.mp3");

const blank = new Image();
blank.src = "images/blank.png";
blank.id = "blank";
blank.draggable = false;

const mysteryCard = new Image();
mysteryCard.src = "images/mystery.png";
mysteryCard.id = "mystery";
mysteryCard.draggable = false;

const winningPopup = new Image();
winningPopup.src = "images/win.png";
winningPopup.id = "win";

const losingText = new Image();
losingText.src = "images/lose.png";
losingText.id = "losingText";

      let selectedCardsArray = new Array();

      const cardSelect = image => {
        image.style.background = "yellow";
      };

      const cardUnselect = image => {
        for (let i = 0; i < selectedCardsArray.length; i++) {
          if(selectedCardsArray[i].id === image.id) {
            selectedCardsArray.splice(i,1)
            image.style.background = "none";
          }     
        }
        
      };

      const cardClicked = event => {
        for (let i = 0; i < cardArray.length; i++) {
          if (cardArray[i].id === event.target.id && cardArray[i].selected === true) {
            cardArray[i].selected = false;
            cardUnselect(cardArray[i]);

          } else if (cardArray[i].id === event.target.id && cardArray[i].selected === false && selectedCardsArray.length < 5) {
            cardArray[i].selected = true;
            selectedCardsArray.push(cardArray[i]);
            cardSound.play();
            cardSelect(cardArray[i]);
          }
        }
      };

      const buttonClicked = () => {
        if (selectedCardsArray.length === 0) {
          document.getElementById('error-msg').innerHTML = "You need to click a number before you click the button!";
          return;
        }

        let randomCard = generateRandomCard();

        for (let i = 0; i < selectedCardsArray.length; i++) {
        if (randomCard.id !== selectedCardsArray[i].id) {
          document.getElementById('error-msg').innerHTML = "";
          blank.src = randomCard.src;
          loosingSound.play();
          hideMisteryCard();
          displayLose();
        }
        if (randomCard.id === selectedCardsArray[i].id) {
          document.getElementById('error-msg').innerHTML = "";
          blank.src = selectedCardsArray[i].src;
          winningSound.play();
          hideMisteryCard();
          displayWin(losingText);
        }
      }
    };

      const playAgain = () => {
        document.getElementById("overlay").style.display = "none";
      };

      const hideMisteryCard = () => {
        let mystery = document.getElementById("mystery");
        mystery.style.visibility = "hidden";
      };

      const generateRandomCard = () => {
        let random = cardArray[Math.floor(Math.random() * cardArray.length)];
        return random;
      };

      const displayWin = () => {
        let loss = document.getElementById("loss")
        loss.style.display = "none";
        document.getElementById("overlay").style.display = "block";
      };

      const displayLose = () => {
        let loss = document.getElementById("loss")
        loss.style.display = "block";
        document.getElementById("loss").appendChild(losingText);
      };

      const displayAllCards = () => {
        for (let i = 0; i < cardArray.length; i++) {
          resizeCard(cardArray[i]);
          document.getElementById("cards").appendChild(cardArray[i]);
        }
      };

      const displayMysteryCard = () => {
        resizeMysteryCard(mysteryCard);
        document.getElementById("mysteryCard").appendChild(mysteryCard);
      };

      const displayBlankCard = () => {
        resizeBlankCard(blank);
        document.getElementById("mysteryCard").appendChild(blank);
      };

      const resizeCard = image => {
        image.style.width = "90px";
        image.style.height = "90px";
        image.style.padding = "6px";
      };

      const resizeBlankCard = image => {
        image.style.width = "140px";
        image.style.height = "140px";
      };

      const resizeMysteryCard = image => {
        image.style.width = "70px";
        image.style.height = "70px";
      };
      displayBlankCard();
      displayMysteryCard();
      displayAllCards();