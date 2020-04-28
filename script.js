$(() => {
    hideErrors();
    let hasFinalSolved = false;
    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const doorData = [{
      number: 1,
      password: 'pantry'
    },
    {
      number: 2,
      password: 'guest room'
    },
    {
      number: 3,
      password: 'kitchen'
    },
    {
      number: 4,
      password: 'bedroom'
    },
    {
      number: 5,
      password: 'bathroom'
    },
    {
      number: 6,
      password: 'den'
    }];

    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    for (let door of doorData) {
      $(`#door${door.number}-form`).click((event) => {
        openDoor(door.number, door.password);
      });
    }

    $('#final-form').click((event) => {
      let password = $('#final-code').first().val().toLowerCase();
      console.log(password);
      if (password == "270985") { // doors 5, 3, 6, 4, 2, 1
        toggleDoor(document.querySelector('#door7'));
        if (!hasFinalSolved) $('#myModal').modal();
        hasFinalSolved = true;
        hideError(7);
      } else {
        showError(7);
      }

    });

    $('#key-logo').click(() => {
      $('#secretModal').modal();
    })

    function openDoor(doorNumber, doorPassword) {
      let password = $(`#door${doorNumber}-code`).first().val().toLowerCase();

      if (password === doorPassword) {
        console.log(password + ' ' + doorPassword);
        toggleDoor(document.querySelector(`#door${doorNumber}`));
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
})