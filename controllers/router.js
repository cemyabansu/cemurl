
exports.Index = function (req, res) {
    res.render('pages/index', {
        title: 'The Url Shortener',
        description: 'There is no such thing as perfect',
        keywords: 'cemyabansu, cem, yabansu, cemyabansu.com, url, shortener, url shortener'
    });
}

exports.Error = function (req, res) {
	res.status(404);
	res.render('pages/error', {
		title: 'What are you looking for is not here.',
		description: 'error page',
		keywords: 'error, 404, lol'
	});
}
