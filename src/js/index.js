import {$} from './common';

var widthWindow = $(window).width();

// Arrow top page
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},500);return false;});

// //range slider
// if($('.js-range-input').length){
// 	$('.js-range-input').each(function(){
// 		var $parent = $(this).parents('.js-range');
// 		var $rangeVal = $parent.find('.js-range-val');
// 		var numMin = $(this).data('slider-min').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// 		var numMax = $(this).data('slider-max').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// 		if($rangeVal.data('text') == 'день'){
// 			$rangeVal.html('<span class="range__val-num">' + $(this).data('slider-value') + '</span> ' + nameDay($(this).data('slider-value')));

// 			if($parent.data('note') == true){
// 				numMin = numMin + ' ' + nameDay($(this).data('slider-min'));
// 				numMax = numMax + ' ' + nameDay($(this).data('slider-max'));
// 			}
// 		}else{
// 			$rangeVal.html('<span class="range__val-num">' + $(this).data('slider-value') + '</span> ' + $rangeVal.data('text'));

// 			if($parent.data('note') == true){
// 				numMin = numMin + ' ' + $rangeVal.data('text');
// 				numMax = numMax + ' ' + $rangeVal.data('text');
// 			}
// 		}

// 		$parent.find('.js-range-min').text(numMin)
// 		$parent.find('.js-range-max').text(numMax)
// 	});
	

// 	$('.js-range-input').on("slide", function(e) {
// 		var $rangeVal = $(this).parents('.js-range').find('.js-range-val');

// 		if($rangeVal.data('text') == 'день'){
// 			$rangeVal.html('<span class="range__val-num">'+ e.value + '</span> ' + nameDay(e.value));
// 		}else{
// 			$rangeVal.html('<span class="range__val-num">'+ e.value + '</span> ' + $rangeVal.data('text'));
// 		}
// 	});

// 	function nameDay(val) {
// 		var lastFigure = parseInt(val.toString().substr(val.toString().length - 1, 1));

// 		if (val >= 11 && val < 15) {
// 			return 'дней';
// 		}
// 		else {
// 			if (lastFigure == 1) return 'день';
// 			if (lastFigure > 1 && lastFigure < 5) return 'дня';
// 			if (lastFigure == 0 || lastFigure >= 5) return 'дней';
// 		}
// 	}
// }