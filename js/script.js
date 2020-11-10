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
		$('.popup-container').toggleClass('active')
		$('html').addClass('scroll')
	}

	function hidepopup(){
		$('.popup-container').toggleClass('active')
		$('html').removeClass('scroll')
		$('.popup').fadeIn(500)
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

					console.log('Отправлено')

					th.trigger('reset');
				});

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