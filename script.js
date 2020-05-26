const answer1 = new SlotMachine(document.querySelector('#clue1'), {
  active: 1,
  auto: false
});
const answer2 = new SlotMachine(document.querySelector('#clue2'), {
  active: 1,
  auto: false
});
const answer3 = new SlotMachine(document.querySelector('#clue3'), {
  active: 1,
  auto: false
});
const answer4 = new SlotMachine(document.querySelector('#clue4'), {
  active: 1,
  auto: false
});
const answer5 = new SlotMachine(document.querySelector('#clue5'), {
  active: 1,
  auto: false
});
const answer6 = new SlotMachine(document.querySelector('#clue6'), {
  active: 1,
  auto: false
});

// machine.next() and machine.prev()
$(() => {
    hideErrors();
    initializeCryptex();
    const sessionKey = 'portalData';
    let doorData = getSessionData();
    if (!doorData) {
      closeCryptex();
      doorData = [{
        number: 1,
        isSolved: false
      },
      {
        number: 2,
        isSolved: false
      },
      {
        number: 3,
        isSolved: false
      },
      {
        number: 4,
        isSolved: false
      },
      {
        number: 5,
        isSolved: false
      },
      {
        number: 6,
        isSolved: false
      }];
    } else {
      const allSolved = checkIfAnyDoorsOpen();
      if (allSolved) {
        openShowArea();
      } else {
        closeCryptex();
      }
    }

    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const passwordData = [{
      number: 1,
      password: 'meteor shower'
    },
    {
      number: 2,
      password: 'sun'
    },
    {
      number: 3,
      password: 'space invaders'
    },
    {
      number: 4,
      password: 'astronaut'
    },
    {
      number: 5,
      password: 'pluto'
    },
    {
      number: 6,
      password: 'rocket'
    }];

    function toggleLeft(element) {
      element.classList.toggle("open-left");
    }

    function toggleRight(element) {
      element.classList.toggle("open-right");
    }


    function checkIfAnyDoorsOpen() {
      let isAllSolved = true;
      for (let door of doorData) {
        if (door.isSolved) {
          toggleLeft(document.querySelector(`#curtain${door.number}-left`));
          toggleRight(document.querySelector(`#curtain${door.number}-right`));
        } else {
          isAllSolved = false;
        }
      }
      return isAllSolved;
    }

    function isEverythingSolved() {
      let isAllSolved = true;
      for (let door of doorData) {
        if (!door.isSolved) {
          isAllSolved = false;
        }
      }
      return isAllSolved;
    }

    for (let door of passwordData) {
      $(`#door${door.number}-form`).click((event) => {
        openDoor(door.number, door.password);
      });
    }

    function openDoor(doorNumber, doorPassword) {
      let password = $(`#door${doorNumber}-code`).first().val().toLowerCase();
      const lookupDoor = doorData.filter(d => d.number === doorNumber)[0];
      
      if ((password === doorPassword) || lookupDoor.isSolved) {
        console.log(password + ' ' + doorPassword);
        toggleLeft(document.querySelector(`#curtain${doorNumber}-left`));
        toggleRight(document.querySelector(`#curtain${doorNumber}-right`));

        lookupDoor.isSolved = true;
        console.log('Saving');
        saveToSession();

        const allSolved = isEverythingSolved();
        if (allSolved) {
          openShowArea();
        }

        hideError(doorNumber);
      } else {
        showError(doorNumber);
      }
    }

    function showError(door) {
      $(`#door${door}Error`).show();
    }

    function hideError(door) {
      $(`#door${door}Error`).hide();
    }

    function hideErrors() {
      $('#door1Error').hide();
      $('#door2Error').hide();
      $('#door3Error').hide();
      $('#door4Error').hide();
      $('#door5Error').hide();
      $('#door6Error').hide();
      $('#door7Error').hide();
    }

    function openShowArea() {
      $('#unsolved').css('display','none');
      $('#solved').css('display','block');
    }

    function closeCryptex() {
      $('#solved').css('display','none');
      $('#unsolved').css('display','block');
    }

    // Not proud of the hardcoding but I've had a little wine at this point
    function initializeCryptex() {
      $('#clue1').click((event) => {
        const firstIndex = answer1.prev();
      });
      $('#clue2').click((event) => {
        const firstIndex = answer2.prev();
      });
      $('#clue3').click((event) => {
        const firstIndex = answer3.prev();
      });
      $('#clue4').click((event) => {
        const firstIndex = answer4.prev();
      });
      $('#clue5').click((event) => {
        const firstIndex = answer5.prev();
      });
      $('#clue6').click((event) => {
        const firstIndex = answer6.prev();
      });
    }

    // Session data
    function getSessionData() {
      let result = window.localStorage.getItem(sessionKey); 
      if (!result) { return null; }
      return JSON.parse(result);
    }

    function saveToSession() {
      removeFromSession();
      window.localStorage.setItem(sessionKey, JSON.stringify(doorData));
    }

    function removeFromSession() {
      window.localStorage.removeItem(sessionKey);
    }
})