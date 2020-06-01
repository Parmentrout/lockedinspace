const answer1 = new SlotMachine(document.querySelector('#clue1'), {
  active: 0,
  auto: false
});
const answer2 = new SlotMachine(document.querySelector('#clue2'), {
  active: 0,
  auto: false
});
const answer3 = new SlotMachine(document.querySelector('#clue3'), {
  active: 0,
  auto: false
});
const answer4 = new SlotMachine(document.querySelector('#clue4'), {
  active: 0,
  auto: false
});
const answer5 = new SlotMachine(document.querySelector('#clue5'), {
  active: 0,
  auto: false
});
const answer6 = new SlotMachine(document.querySelector('#clue6'), {
  active: 0,
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

    let initialCode = [0,0,0,0,0,0];
    // 1=pluto, 2 = rocket, 3 = sun, 4 = galactic, 5 = meteor, 6 = astronaut
    // answer = 641325
    // Not proud of the hardcoding but I've had a little wine at this point
    function initializeCryptex() {
      $('#clue1').click((event) => {
        const answer = answer1.prev();
        isFinalSolved(0, answer);
      });
      $('#clue2').click((event) => {
        const answer = answer2.prev();
        isFinalSolved(1, answer);
      });
      $('#clue3').click((event) => {
        const answer = answer3.prev();
        isFinalSolved(2, answer);
      });
      $('#clue4').click((event) => {
        const answer = answer4.prev();
        isFinalSolved(3, answer);
      });
      $('#clue5').click((event) => {
        const answer = answer5.prev();
        isFinalSolved(4, answer);
      });
      $('#clue6').click((event) => {
        const answer = answer6.prev();
        isFinalSolved(5, answer);
      });
    }

    function isFinalSolved(portal, number) {
      const correctAnswer = JSON.stringify([6,4,1,3,2,5]);
      initialCode[portal] = number;
      const stringMe = JSON.stringify(initialCode);
      if (correctAnswer === stringMe) {
        console.log('Correct!');
        toggleLeft(document.querySelector(`#curtain7-left`));
        toggleRight(document.querySelector(`#curtain7-right`));
        $('#fireworks').css('display','block');
      }
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