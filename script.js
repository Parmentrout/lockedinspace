$(() => {
    hideErrors();
    let hasFinalSolved = false;
    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const doorData = [{
      number: 1,
      password: 'meteor shower'
    },
    {
      number: 2,
      password: 'esfhlhfsle'
    },
    {
      number: 3,
      password: 'space invaders'
    },
    {
      number: 4,
      password: 'felhlshe'
    },
    {
      number: 5,
      password: 'eflsheslhe'
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

    for (let door of doorData) {
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

      if (password === doorPassword) {
        console.log(password + ' ' + doorPassword);
        toggleLeft(document.querySelector(`#curtain${doorNumber}-left`))
        toggleRight(document.querySelector(`#curtain${doorNumber}-right`)) 
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