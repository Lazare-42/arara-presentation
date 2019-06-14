var dotIndex = 0;
var graphviz = d3.select("#svg_container").graphviz()

function actionFromClick(nodes, dotSrc, index) {
//	var title = d3.select(nodes).selectAll('title').text().trim();
//	var text = d3.select(nodes).selectAll('text').text();
//	var id = d3.select(nodes).attr('id');
//	var class1 = d3.select(nodes).attr('class');
//	dotElement = title.replace('->',' -> ');
//	console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
//	console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
//	for (i = 0; i < dotSrcLines.length;) {
//		if (dotSrcLines[i].indexOf(dotElement) >= 0) {
//			console.log('Deleting line %d: %s', i, dotSrcLines[i]);
//			dotSrcLines.splice(i, 1);
//		} else {
//			i++;
//		}
//	}
//	dotSrc = dotSrcLines.join('\n');
	if (index != dotSrc.length - 1) {
	render(dotSrc, index + 1);
	}
	else {
	render(dotSrc, 0);
	}
}

function render(dotSrc, index) {
	console.log('DOT source =', dotSrc[index]);
	var dotSrcLines = dotSrc[index].split('\n');
	console.log(dotSrcLines)

	transition1 = d3.transition()
		.delay(100)
		.duration(1000);

	graphviz
		.transition(transition1)
		.renderDot(dotSrc[index])
		.on("end", function () {
			nodes = d3.selectAll('.node,.edge');
			nodes
				.on("click", function () {
					actionFromClick(this, dotSrc, index);
				}
				)}
		)
}

function getDot() {
	fetch("http://0.0.0.0:5000/resources/arara.dot").then(res => res.text()).then((allTheDot =>
		{
			var digraphArray = allTheDot.split("/*CUT*/")
			render(digraphArray, 0)
		}))
}
getDot()
