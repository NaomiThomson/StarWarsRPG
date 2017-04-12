$(document).ready(function() {

  // event on user click of a character image
  $('img').click(function() {

    // hide div of characters to choose from after a character has been selected
    $('div.characters').css('display','none');

    // assign 'user' attribute to character chosen, then assign 'enemy' attribute to other characters. move 'user' to '#user' section, and move 'enemy' to '#enemies' section
    $(this).attr('attr','user');
    $('img').each(function() {
      if ($(this).attr('attr') == 'user') {
        $('#user').append($(this));
      } else {
        $(this).attr('attr','enemy');
        $('#enemies').append($(this));
      };
    });

    // assign 'defender' attribute to enemy chosen, then move said enemy to '#defender' section
    $('img').click(function() {
      $(this).attr('attr', 'defender');
      $('img').each(function() {
        if ($(this).attr('attr') == 'defender') {
          $('#defender').append($(this));
        };
      });
    });

    // update HTML of 'user' and 'defender' with their relative HP data
  });
})
