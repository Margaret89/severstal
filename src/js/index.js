import { each } from 'jquery';
import {$, noUiSlider} from './common';

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

// range-slider
if($('.js-slider-range').length){
	$('.js-slider-range').each(function(indx, element){
		var slider = document.getElementById($(element).attr('id'));//Слайдер
		var minRange = parseInt(slider.getAttribute('data-min'));//Минимальное значение
		var maxRange = parseInt(slider.getAttribute('data-max'));//Максимальное значение
		var start =  parseInt(slider.getAttribute('data-cur-min'));//Текущее значение
		var step =  parseInt(slider.getAttribute('data-step'));//Шаг
		var idMinElem = $(element).closest('.js-range').find('.js-slider-range-min').attr('id');//Поле, в которое выводим результат

		var $parent = $(this).parents('.js-range');//Обертка текущего слайдера
		var numMin = minRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");//Минимальное значение по разрядам
		var numMax = maxRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");//Максимальное значение по разрядам
		var numMinLabel = $parent.find('.js-range-min').data('label');// Подписи для минимального значения
		var numMaxLabel = $parent.find('.js-range-max').data('label');// Подписи для максимального значения

		//Выводим минимальное и максимальное значение снизу слайдера
		if(numMinLabel == 'год'){
			if(minRange == 1){
				numMinLabel = 'года';
			}else{
				numMinLabel = 'лет';
			}
		}

		if(numMaxLabel == 'год'){
			if(maxRange == 1){
				numMaxLabel = 'года';
			}else{
				numMaxLabel = 'лет';
			}
		}

		$parent.find('.js-range-min').html('от ' + numMin + ' ' + numMinLabel);
		$parent.find('.js-range-max').html('от ' + numMax + ' ' + numMaxLabel);

		//Инициализация слайдера
		var formatForSlider = {
			from: function (formattedValue) {
				formattedValue = formattedValue.replace(/[^0-9]/g, '');
				return Number(formattedValue);
			},
			to: function(numericValue) {//Вывод числа с разрядностью
				numericValue = String(Math.round(numericValue));
				numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
				return numericValue;
			}
		};
		
		noUiSlider.create(slider, {
			start: start,
			connect: 'lower',
			step: step,
			range: {
				'min': minRange,
				'max': maxRange
			},
			format: formatForSlider,
		});

		var snapValues = [
			document.getElementById(idMinElem),
		];

		var initRange = false;

		slider.noUiSlider.on('update', function (values, handle) {
			snapValues[handle].value = values[handle];

			if(initRange == false){
				if(handle == 1){
					initRange = true;
				}
			}else{
				$('.js-slider-range-min').trigger("change");
			}
		});

		snapValues.forEach(function (input, handle) {
			input.addEventListener('change', function () {
				var valItem = this.value;

				if(handle == 0){
					if((valItem < minRange) || (valItem > maxRange)){
						valItem = minRange;
					}
				}
				slider.noUiSlider.setHandle(handle, valItem);
			});
		});
	});

	// Проверка полей на ввод цифор
	function digits_int(target){
		let inVal = $(target).val().replace(/[^0-9]/g, '');
		inVal = inVal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		$(target).val(inVal);
	}

	$('.js-slider-range-min').on('change keyup input click', function(e){
		digits_int(this);
	});
}

// Yandex карта
if ($('#map').length) {
	// Иницилизация карты
	ymaps.ready(init);

	function init(){
		var myMap;
		myMap = new ymaps.Map("map", {
			center: [57.469, 79.040],
			zoom: 3.2,
			controls: []
		});

		//Задаем метки
		placemark('55.778398', '37.699664', 'ул. Большая Почтовая, 26в, стр. 2, Москва, Россия, 105082');
		placemark('56.821694', '60.572448', 'Ул. Посадская 28А, оф. 406. ТЦ Универбыт, Екатеринбург, Свердловская обл., 620102');
		placemark('58.003439', '56.236021', 'ул. Революции, 60/1, Пермь, Пермский край, 614000');

		function placemark(lat, long, text) {
			var myPlacemark = new ymaps.Placemark([lat, long] , 
				{
					balloonContentBody: text,
					hintContent: text
				},
				{
					iconLayout: 'default#image',
					iconImageHref: '/assets/img/mark-map.png',
					iconImageSize: [26, 33],
					iconImageOffset: [-13, -17],
				});
	
			myMap.geoObjects.add(myPlacemark);
		}
	}
}

//Выбор просмотра пути
if($('.js-choose-path').length){
	$('.js-choose-path').each(function(indx, element){
		if ($(this).is(":checked")) {
			$(this).closest('.js-switch').find('.js-switch-text-right').addClass('active')
		} else {
			$(this).closest('.js-switch').find('.js-switch-text-left').addClass('active')
		}
	});

	$('.js-choose-path').on('change', function(){
		if ($(this).is(":checked")) {
			$(this).closest('.js-switch').find('.js-switch-text-left').removeClass('active')
			$(this).closest('.js-switch').find('.js-switch-text-right').addClass('active')
		} else {
			$(this).closest('.js-switch').find('.js-switch-text-right').removeClass('active')
			$(this).closest('.js-switch').find('.js-switch-text-left').addClass('active')
		}
	});
}

// unwrap block
if($('.js-unwrap-block').length){
	$('.js-unwrap-head').on('click',function(event){
		event.preventDefault();
		var $parent = $(this).parents('.js-unwrap-block');
		
		$parent.toggleClass('opened');
		if($parent.hasClass('opened')){
			$parent.children('.js-unwrap-content').slideDown(300);
		}else{
			$parent.children('.js-unwrap-content').slideUp(300);
		}
	});
}

//Открыть/Закрыть мобильное меню
if($('.js-btn-sidebar').length){
	$('.js-btn-sidebar').on('click', function(){
		$(this).toggleClass('active');
		$('.js-header-wrap').toggleClass('open');
		$('.js-body').toggleClass('no-scroll');
	});
}

//Открыть/Закрыть реквизиты в футере
if($('.js-open-report').length){
	$('.js-open-report').on('click', function(){
		$('.js-report').addClass('open');
		$('.js-body').addClass('no-scroll');
	});

	$('.js-close-report').on('click', function(){
		$('.js-report').removeClass('open');
		$('.js-body').removeClass('no-scroll');
	});
}