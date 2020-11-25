var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		 },
	 	pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {

		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},

		1024: {
			slidesPerView: 3,
			spaceBetween: 20,
		}
	},
});

$(document).ready(function(){

	function showpopup(){
		$('.popup-container').addClass('active')
		setTimeout(function() {
			$('.popup, .popup__succes').css({transform: "rotateX(1deg)"})
		}, 400)
		$('html').addClass('scroll')
	}

	function hidepopup(){
		$('.popup').css({transform: "rotateX(90deg)"})
		$('#name, #email, #tel').removeClass('error')
		$('#name, #email, #tel').val("")
		console.log ($('#name'))
		setTimeout(function() {
			$('.popup-container').removeClass('active')
			$('html').removeClass('scroll')
		}, 400)
	}

	function scrollMenu(event){
		event.preventDefault();

		let href = $(this).attr('href');

		let offset = $(href).offset().top;
		console.log(offset);

		$('html,body').animate({
			scrollTop: offset,
		}, 700);
	}

	$(".popup-tel").mask("+7(999) 999-9999");

	$('.call__button, .call__button_mobile, .form__button').on('click', showpopup);

	$('form').each(function(){
		$(this).validate({
			errorPlacement(error, element){
				return true;
			},
			focusInvalid: false,
			rules: {
				name: {
					required: true,
				},
				email: {
					required: true,
				},
				tel: {
					required: true,
				},
			},
			submitHandler(form) {
				let th = $(form);

				$.ajax({
					type: 'POST',
					url: '../php/mail.php',
					data: th.serialize(),
				}).done(()=>{

					th.trigger('reset');
				});

				$('.popup').addClass('popup__off')
					$('.popup__succes').addClass('active__succes')
					setTimeout(function() {
						$('.popup-container').removeClass('active')
						$('.popup__succes').removeClass('active__succes')
						$('.popup').removeClass('popup__off')
						$('html').removeClass('scroll')
					}, 2000);

				return false;
			}
		});
	});

	$('.popup-container').on('click', function(e){
		// console.log($(this))
		if (e.target == $('.popup-container')[0]) {
			hidepopup()
		}

	});
	$('.popup-cross').on('click', hidepopup);

	$('.menu-item').on('click', scrollMenu);
	
	$('.about-me__attribut').removeClass('about-me__anim');

	$('.header__nav_burger').click(function(event) {
		$('.header__nav_burger,.header__nav').toggleClass('active');
		});

});