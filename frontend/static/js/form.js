var flag1 = false;
var flag2 = false;
$.ajaxSetup({
	contentType: "application/json; charset=utf-8"
});
var DataDeal = {
	//将从form中通过$('#form').serialize()获取的值转成json  
	formToJson: function(data) {
		data = data.replace(/&/g, "\",\"");
		data = data.replace(/=/g, "\":\"");
		data = "{\"" + data + "\"}";
		return data;
	}
}

//验证
$('#name').blur(function() {
	if ($(this).val().length >= 2) {
		flag1 = true;
		$('#nameremind').text('√').removeClass('red').addClass('green');


	} else {
		flag1 = false;
		$('#nameremind').text('×').removeClass('green').addClass('red');
	}
})

$('#telephone').blur(function() {
	if (/^1[3|4|5|7|8]\d{9}$/.test($(this).val())) {
		flag2 = true;
		$('#telephoneremind').text('√').removeClass('red').addClass('green');

	} else {
		flag2 = false;
		$('#telephoneremind').text('×').removeClass('green').addClass('red');
	}
})



$('button').click(function() {
	if (flag1 && flag2) {
		var data = $('#form').serialize();
		data = decodeURIComponent(data, true); //防止中文乱码
		var param = DataDeal.formToJson(data);
		$.ajax({
			url: "/api/v1/message/",
			type: "post",
			data: param,
			success: function(data) {

				$('.success').show();
				setTimeout(function() {
					$('.success').hide()
				}, 2000)
			},
			error: function() {
				$('.error').show();
				setTimeout(function() {
					$('.error').hide()
				}, 2000)
			}
		})
	} else {
		$('.textjuge').show();
		setTimeout(function() {
			$('.textjuge').hide()
		}, 2000)
		return false;
	}
	$('#form').get(0).reset();
	$('#nameremind').text('').removeClass('green').removeClass('red');
	$('#telephoneremind').text('').removeClass('green').removeClass('red');
	flag1 = false;
	flag2 = false;
})

// function toggle(obj){
// 	$('.error').show();
// 	setTimeout($('.error').hide(),1000)
// }









