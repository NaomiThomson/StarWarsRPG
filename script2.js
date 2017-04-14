var choosingHero = true;

// hide game display before user chooses character
$('.game-display').addClass('hidden');
$('.after-game-display').addClass('hidden');


function handleHeroClick(){
  $(this).attr('characterType', 'user');
  $('img').each(function() {
    if($(this).attr('characterType') != 'user'){
      $(this).attr('characterType', 'enemy');
    };
  });
  chooseHeroHTML();
  // $('img').off('click', handleHeroClick);
  $('img').off('click');
  $('img').on('click', handleDefenderClick);
}


function chooseHeroHTML(){
  $('.game-display').removeClass('hidden');
  $('.before-game-display').addClass('hidden');
  $('#user').append($("img[characterType='user']"));
  $('img').each(function(){
    if($(this).attr('characterType') == 'enemy'){
      $('#enemies').append($(this));
    }
  })
}

function handleDefenderClick(){
  $('img[characterType="enemy"]').click(function(){
    $(this).attr('characterType', 'defender');
    updateDefenderHTML();
    // $('img').off('click', handleDefenderClick);
    $('img').off('click');
  })

}

function updateDefenderHTML(){
  $('img').each(function(){
    if ($(this).attr('characterType') == 'defender'){
      $('#defender').append($(this));
    }
  })
}

$('img').on('click', handleHeroClick);
