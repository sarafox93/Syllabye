 // variables
var $infoClass, $toggledInfoClass, $menuToggled, $menuEventTrigger, $menuItem;


// Jquery Function to toggle class info
$.fn.toggleInfoWrapper = function() {
    
        this.click(function() {
            
            $infoClass = "." + $(this).attr('id') + ".info-wrapper";
            
            if($(this).hasClass("toggled")){
                closeToggledInfoClass();
            } else{
                closeToggledInfoClass();
                openInfoClass($(this));
            }
        });
};


function closeToggledInfoClass() {
    $toggledInfoClass = "." + $(".toggled").attr("id") + ".info-wrapper";
    
      $($toggledInfoClass).animate({
           height: "toggle",
          opacity: "toggle"
       });
     
    $(".toggled").removeClass("toggled");
}


function openInfoClass($obj) {
    $($infoClass).animate({
           height: "toggle",
          opacity: "toggle"
       });
    $($obj).addClass("toggled");
}


// Jquery Function to show child menu 
// ========================================================================
$.fn.menuListener = function() {
    
        this.click(function(event) {
            event.preventDefault();
            $menuItem = "#" + $(this).attr('id');
            showChildMenu($menuItem, event);
        });

        this.on("mouseover",function(event){
            event.preventDefault();
            $menuItem = "#" + $(this).attr('id');
            showChildMenu($menuItem, event);
        });

        this.on("touch",function(event){
            event.preventDefault();
            $menuItem = "#" + $(this).attr('id');
            showChildMenu($menuItem, event);
        });
};


function showChildMenu($mi, event){

   var miChild = $mi + '-child';

   if($menuToggled != null){

      // if menu being and event clicked is the current menu then hide it
      if($menuToggled == $mi && (event.type == 'click' || event.type == 'touch')){
        hideChildMenu(miChild);
        $menuToggled = null;  
        return;
      }
      else if($menuToggled == $mi && event.type == 'mouseover'){
        return;
      }
      // hide current child menu
      hideChildMenu(miChild);
   }


   // set child menu position
   var right = ($('body').outerWidth() - parseInt($($mi).position().left) - ($($mi).outerWidth()));
   var top = parseInt($($mi).position().top) + ($($mi).outerHeight() - $(window).scrollTop());
   $(miChild).css('right', right).css('top', top);
   
   // show child menu
   $(miChild).addClass('child-menu-showing');

   // set current toggled menu to the new menu
    $menuToggled = $mi;
}


function hideChildMenu(miChild){
   // show child menu
   $('.child-menu').removeClass('child-menu-showing');
}


// Jquery Function to show mobile menu 
// ========================================================================
$.fn.mobileMenuListener = function() {
        this.click(function(event) {
            event.preventDefault();
            $('.mobile-menu').fadeToggle();
        });

};


// function called when document is loaded
$(function() {
  $(".info-wrapper").hide();
  // $(".mobile-menu").hide();
  $('.ctitle').toggleInfoWrapper();
  $('.menu-item').menuListener();
  $('.mobile-menu-icon').mobileMenuListener();

  $('.child-menu').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
  });
  $(document).click(function() {
     $('.child-menu').removeClass('child-menu-showing');
  });

});
