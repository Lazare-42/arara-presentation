/**
 *	Global variables : the name of the different graphs you can represent, which
 *	are the same as the names of the files
 */
dotGraphs = ["main", "webView"]

function actionFromClick(nodes, dotSrc, index, svgNumber, graphviz, svg) {

	var dotSrcLines = dotSrc[index].split('\n');
	var svg			= d3.select("#graph" + svgNumber)

	console.log("user clicked " + "#graph" + svgNumber)
	var title 		= d3.select(nodes).selectAll('title').text().trim();
	var text 		= d3.select(nodes).selectAll('text').text();
	var id 			= d3.select(nodes).attr('id');
	var class1 		= d3.select(nodes).attr('class');
	
	dotElement = title.replace('->',' -> ');
	console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s\nSVG number="%d""', id, class1, title, text, dotElement, svgNumber);
	console.log('Finding and deleting references to %s from the DOT source', dotElement);


	/**
	 *	If the node title of the node on which we clicked on is a graph,
	 *	start a new svg avtivity with that graph
	 */
	if (title == "androidWebView") {
		getDot("webView", svgNumber + 1)
	}
	else {
		render(dotSrc, index + 1, svgNumber, graphviz, svg)
	}
//	//for (i = 0; i < dotSrcLines.length;) {
//	//	if (dotSrcLines[i].indexOf(dotElement) >= 0) {
//	//		console.log('Deleting line %d: %s', i, dotSrcLines[i]);
//	//		dotSrcLines.splice(i, 1);
//	//	} else {
//	//		i++;
//	//	}
//	//}
//	//dotSrc = dotSrcLines.join('\n');
//
}

function transition() {
	var transition1	= d3.transition()
						.ease(d3.easeLinear)
						.delay(10)
						.duration(1000);
	return (transition1)
}

function render(dotSrc, index, svgNumber, graphviz, svg) {

	console.log("This is the svg_to_select : " + "#graph" + svgNumber)

	graphviz
		.engine("dot")
		.transition(transition())
		.renderDot(dotSrc[index])
		.on("end", function () {
			nodes = svg.selectAll('.node,.edge');
			nodes
				.on("click", function () {
					actionFromClick(this, dotSrc, index, svgNumber, graphviz, svg);
				}
				)}
		)
}

function selectSvgForDot(digraphArray, index, svgNumber) {

	d3.select("#svg_container")
		.append("graph")
		.attr("id", "graph" + svgNumber)
	var svg			= d3.select("#graph" + svgNumber)
	var graphviz 	= svg.graphviz()
	render(digraphArray, index, svgNumber, graphviz, svg)
}

function getDot(graphName, svgNumber) {
	console.log("Will try opening the file http://0.0.0.0:5000/resources/" + graphName + ".dot" + " with the svgNumber : " + svgNumber)
	fetch("http://0.0.0.0:5000/resources/" + graphName + ".dot").then(res => res.text()).then((dotInfo =>
		{
			var digraphArray = dotInfo.split("/*CUT*/")
			selectSvgForDot(digraphArray, 0, svgNumber)
		}))
}

getDot("arara", 0)
