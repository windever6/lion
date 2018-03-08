$ ->
	$('a.rucaptcha-image-box').click (event) =>
		img = $(this).find('img:first')
		currentSrc = img.attr('src')
		img.attr('src', currentSrc.split('?')[0] + '?' + (new Date()).getTime())
		return false