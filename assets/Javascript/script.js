// initialize characterInfo object
var characterInfo = {
  'userHP' : 0,
  'defenderHP' : 0,
  'userAttack' : 0,
  'defenderAttack' : 0
};

// hide game display, game over display, and defeated display before user chooses character
$('.game-display').addClass('hidden');
$('.after-game-display').addClass('hidden');
$('#defeated').addClass('hidden');

function handleUserClick(){
  // for character chosen, assign 'user' type to it, then the rest become 'enemies'
  $(this).attr('characterType', 'user');
  $('img').each(function() {
    if($(this).attr('characterType') != 'user'){
      $(this).attr('characterType', 'enemy');
    };
  });
  // update user info
  characterInfo.userHP = parseInt($("img[characterType='user']").attr('data-HP'), 10);
  characterInfo.userAttack = parseInt($("img[characterType='user']").attr('data-AP'), 10);
  // update HTML with updated user info
  updateUserHTML();
  // turn off click event for handleUserClick so another character can't be selected
  $('img').off('click');
  // turn on click event for handleDefenderClick so a defender is ready to be selected out of the enemies section
  $('img').on('click', handleDefenderClick);
};

function updateUserHTML(){
  // hide before game display, and show game display
  $('.game-display').removeClass('hidden');
  $('.before-game-display').addClass('hidden');
  // append 'user' HTML element to '#user' div
  $('#user').html($("img[characterType='user']"));
  $('#user-HP').html(characterInfo.userHP);
  // append 'enemy' HTML element to '#enemies' div
  $('img').each(function(){
    if($(this).attr('characterType') == 'enemy'){
      $('#enemies').append($(this));
    }
  })
};

function handleDefenderClick(){
  // for enemy chosen, assign 'defender' type to it
  $(this).attr('characterType', 'defender');
  // update defender info
  characterInfo.defenderHP = parseInt($("img[characterType='defender']").attr('data-HP'), 10);
  characterInfo.defenderAttack = parseInt($("img[characterType='defender']").attr('data-CAP'), 10);
  // update HTML with updated defender info
  updateDefenderHTML();
  // turn off event listener so that no additonal enemies can be selected at this time to be defender
  $('img').off('click');

};

function updateDefenderHTML(){
  // add 'defender' HTML element to '#defender' div
  $('img').each(function(){
    if ($(this).attr('characterType') == 'defender'){
      $('#defender').html($(this));
    }
  })
  // show defender HP
  $('#defender-HP').removeClass('hidden');
  $('#defender-HP').html(characterInfo.defenderHP);
};

function handleFightClick() {
  // set user's base attack power number
  var userAttackConstant = parseInt($("img[characterType='user']").attr('data-AP'), 10);
  // when characters fight, userHP reduces by defender's attack power, defenderHP reduces by user's attack power
  characterInfo.userHP -= characterInfo.defenderAttack;
  characterInfo.defenderHP -= characterInfo.userAttack;
  // update user and defender HTML, then check gameStatus to see if game is over or not
  updateUserHTML();
  updateDefenderHTML();
  gameStatus();
  // user's attack power increases each time by its base number
  characterInfo.userAttack += userAttackConstant;
};

function gameStatus() {
  // if userHP or defender HP is equal to or less than 0, check the following conditions
  if (characterInfo.userHP <= 0 || characterInfo.defenderHP <= 0) {
    // if 'user' won, game continues
    if (characterInfo.userHP > characterInfo.defenderHP) {
      // characterInfo needs to be reset
      characterInfo.defenderHP = 0;
      characterInfo.userAttack = 0;
      characterInfo.defenderAttack = 0;
      // 'defender' section HTML needs to be updated
      $('#defender').html('<h2>Defeated!</h2>');
      $('#defender-HP').addClass('hidden');
      $('#defeated').append($("img[characterType='defender']"));
      // handleDefenderClick event needs to be turned back on so another defender can be selected to fight
      $('img').on('click', handleDefenderClick);
    } else {
      // if 'defender' won, game is over
      $('.after-game-display').removeClass('hidden');
      $('.btn.game-over').click(function() {
        window.location.reload(true);
      });
    }
  };

  // if 'user' won against all defenders, only the 'user' image should remain
  // therefore, img.length should equal 1
  // game is over
  if ($("img").length == 1) {
    $('.after-game-display').removeClass('hidden');
    $('.btn.game-over').click(function() {
      window.location.reload(true);
    });
  }
};

// call handleUserClick when img is clicked on
$('img').on('click', handleUserClick);
// call handleFightClick when fight button is clicked on
$('.btn.fight').on('click', handleFightClick);
