const el = document.querySelector('#clue1');
const machine = new SlotMachine(el, {
  active: 1,
  auto: false
});
// machine.next() and machine.prev()
$(() => {


    hideErrors();
    const sessionKey = 'portalData';

    let doorData = getSessionData();
    if (!doorData) {
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
      checkIfAnyDoorsOpen();
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
      password: 'flahelhe'
    }];

    function toggleLeft(element) {
      element.classList.toggle("open-left");
    }

    function toggleRight(element) {
      element.classList.toggle("open-right");
    }


    function checkIfAnyDoorsOpen() {
      for (let door of doorData) {
        if (door.isSolved) {
          toggleLeft(document.querySelector(`#curtain${door.number}-left`));
          toggleRight(document.querySelector(`#curtain${door.number}-right`));
        }
      }
    }

    for (let door of passwordData) {
      $(`#door${door.number}-form`).click((event) => {
        openDoor(door.number, door.password);
      });
    }

    // $('#final-form').click((event) => {
    //   let password = $('#final-code').first().val().toLowerCase();
    //   console.log(password);
    //   if (password == "270985") { // doors 5, 3, 6, 4, 2, 1
    //     toggleDoor(document.querySelector('#door7'));
    //     if (!hasFinalSolved) $('#myModal').modal();
    //     hasFinalSolved = true;
    //     hideError(7);
    //   } else {
    //     showError(7);
    //   }

    // });

    $('#key-logo').click(() => {
      $('#secretModal').modal();
    })

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