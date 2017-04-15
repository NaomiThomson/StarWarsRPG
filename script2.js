var characterInfo = {
  'userHP' : 0,
  'defenderHP' : 0,
  'userAttack' : 0,
  'defenderAttack' : 0
}

// hide game display before user chooses character
$('.game-display').addClass('hidden');
$('.after-game-display').addClass('hidden');

// for character chosen, assign 'user' type to it, then the rest become 'enemies'
function handleHeroClick(){
  $(this).attr('characterType', 'user');
  $('img').each(function() {
    if($(this).attr('characterType') != 'user'){
      $(this).attr('characterType', 'enemy');
    };
  });
  characterInfo.userHP = parseInt($("img[characterType='user']").attr('data-HP'), 10);
  characterInfo.userAttack = parseInt($("img[characterType='user']").attr('data-AP'), 10);
  updateUserHTML();
  $('img').off('click');
  $('img').on('click', handleDefenderClick);
}

// hide before game display, and show game display
// append 'user' HTML element to '#user' div
// append 'enemy' HTML element to '#enemies' div
function updateUserHTML(){
  $('.game-display').removeClass('hidden');
  $('.before-game-display').addClass('hidden');
  $('#user').html($("img[characterType='user']"));
  $('#user-HP').html(characterInfo.userHP);

  $('img').each(function(){
    if($(this).attr('characterType') == 'enemy'){
      $('#enemies').append($(this));
    }
  })
}

// for enemy chosen, assign 'defender' type to it
// turn off event listener so that no additonal enemies can be selected at this time
function handleDefenderClick(){
  $(this).attr('characterType', 'defender');
  characterInfo.defenderHP = parseInt($("img[characterType='defender']").attr('data-HP'), 10);
  characterInfo.defenderAttack = parseInt($("img[characterType='defender']").attr('data-CAP'), 10);
  updateDefenderHTML();
  $('img').off('click');

}

// add 'defender' HTML element to '#defender' div
function updateDefenderHTML(){
  $('img').each(function(){
    if ($(this).attr('characterType') == 'defender'){
      $('#defender').html($(this));
    }
  })
  $('#defender-HP').html(characterInfo.defenderHP);
}

// when characters fight, userHP reduces by defender's attack power, defenderHP reduces by user's attack power
// user's attack power increases each time by its base number
function handleFightClick(userHP, defenderHP, userAttack, defenderAttack) {
  var userAttackConstant = parseInt($("img[characterType='user']").attr('data-AP'), 10);
  characterInfo.userHP -= characterInfo.defenderAttack;
  characterInfo.defenderHP -= characterInfo.userAttack;
  updateUserHTML();
  updateDefenderHTML();
  characterInfo.userAttack += userAttackConstant;
};


$('img').on('click', handleHeroClick);
$('.btn.fight').on('click', handleFightClick);
