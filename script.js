$(document).ready(function() {

  // hide game display before user chooses character
  $('.game-display').css('display','none');
  $('.after-game-display').css('display','none');

  // event on user click of a character image
  $('img').click(function() {

    // show game display
    $('.game-display').css('display','inline');

    // hide div of characters to choose from after a character has been selected
    $('.before-game-display').css('display','none');

    // assign 'user' attribute to character chosen, then assign 'enemy' attribute to other characters. move 'user' to '#user' section, and move 'enemy' to '#enemies' section
    $(this).attr('characterType','user');
    $('img').each(function() {
      if ($(this).attr('characterType') == 'user') {
        $('#user').append($(this));
      } else {
        $(this).attr('characterType','enemy');
        $('#enemies').append($(this));
      };
    });

    // update HTML of 'user' and 'defender' with their relative HP data
    var userHP = parseInt($("img[characterType='user']").attr('data-HP'), 10);
    var oldUserHTML = $('#user').html();

    // assign 'defender' attribute to enemy chosen, then move said enemy to '#defender' section
    $('img').click(function() {
      $(this).attr('characterType', 'defender');
      $('img').each(function() {
        if ($(this).attr('characterType') == 'defender') {
          $('#defender').append($(this));
        };
      });

      var defenderHP = parseInt($("img[characterType='defender']").attr('data-HP'), 10);
      var oldDefenderHTML = $('#defender').html();

      $('#user').html(oldUserHTML + userHP);
      $('#defender').html(oldDefenderHTML + defenderHP);

      // enable button
      $('.btn.fight').prop("disabled",false);

      // every time user clicks on fight button, HP of 'user' and 'defender' reduced
      $('.btn.fight').click(function() {

        var userAttack = parseInt($("img[characterType='user']").attr('data-AP'), 10);
        var defenderAttack = parseInt($("img[characterType='defender']").attr('data-CAP'), 10);

        userHP -= defenderAttack;
        defenderHP -= userAttack;

        $('#user').html(oldUserHTML + userHP);
        $('#defender').html(oldDefenderHTML + defenderHP);


        userAttack++;
        console.log(userAttack);

        // once HP of either 'user' or 'defender' has been reduced to 0 or less, game is over
        if (userHP < 0 || defenderHP < 0) {
          // if 'user' won, game continues
          if (userHP > defenderHP) {
            //disable button
            $('.btn.fight').prop("disabled",true);
            // delete entire 'defender' HTML element
            $("img[characterType='defender']").remove();
            console.log($("img[characterType='defender']"));
            console.log('WIN');
          } else {
            // if 'defender' won, game is over
            $('.after-game-display').css('display','inline');
            $('.btn.game-over').click(function() {
              window.location.reload(true);
            })
          };

        };
      });


    });
  });
})
