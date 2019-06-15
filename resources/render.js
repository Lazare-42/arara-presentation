function actionFromClick(nodes, dotSrc, index, svgNumber) {

	var dotSrcLines = dotSrc[index].split('\n');
	var svg			= d3.select("#graph" + svgNumber)

	console.log("user clicked " + "#graph" + svgNumber)
	var title 		= d3.select(nodes).selectAll('title').text().trim();
	var text 		= d3.select(nodes).selectAll('text').text();
	var id 			= d3.select(nodes).attr('id');
	var class1 		= d3.select(nodes).attr('class');

	dotElement = title.replace('->',' -> ');
	console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
	console.log('Finding and deleting references to %s from the DOT source %s ', dotElement);
	//for (i = 0; i < dotSrcLines.length;) {
	//	if (dotSrcLines[i].indexOf(dotElement) >= 0) {
	//		console.log('Deleting line %d: %s', i, dotSrcLines[i]);
	//		dotSrcLines.splice(i, 1);
	//	} else {
	//		i++;
	//	}
	//}
	//dotSrc = dotSrcLines.join('\n');

	if (index != dotSrc.length - 1) {
	render(dotSrc, index + 1, svgNumber);
	}
	else {
	render(dotSrc, 0, svgNumber);
	}
}

function transition() {
	d3.transition()
		.ease(d3.easeLinear)
		.delay(100)
		.duration(1000);
}

function render(dotSrc, index, svgNumber) {

	console.log("This is the svg_to_select : " + "#graph" + svgNumber)

	var svg			= d3.select("#graph" + svgNumber)
	var graphviz 	= svg.graphviz()

	graphviz
		.engine("dot")
		.transition(transition())
		.renderDot(dotSrc[index])
		.on("end", function () {
			nodes = svg.selectAll('.node,.edge');
			nodes
				.on("click", function () {
					actionFromClick(this, dotSrc, index, svgNumber);
				}
				)}
		)
}

function selectSvgForDot(digraphArray, svgNumber) {

	d3.select("#svg_container")
		.append("graph")
		.attr("id", "graph" + svgNumber)
	render(digraphArray, 0, svgNumber)
}

function getDot() {
	fetch("http://0.0.0.0:5000/resources/arara.dot").then(res => res.text()).then((allTheDot =>
		{
			var digraphArray = allTheDot.split("/*CUT*/")
			selectSvgForDot(digraphArray, 1)
		}))
	fetch("http://0.0.0.0:5000/resources/initial.dot").then(res => res.text()).then((allTheDot =>
		{
			var digraphArray = allTheDot.split("/*CUT*/")
			selectSvgForDot(digraphArray, 2)
		}))
}
getDot()
