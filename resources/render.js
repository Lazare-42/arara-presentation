/**
 *	Global variables : the name of the different graphs you can represent, which
 *	are the same as the names of the files
 *
 *	All graphs & their corresponding SVG 
 */
dotGraphs = ["main", "androidWebView", "androidJava"]

/**
 * Actions on Click
 */
function actionFromClick(clickedNode, dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {

	var dotSrcLines = dotSrc[index].split('\n');

	var title 		= d3.select(clickedNode).selectAll('title').text().trim();
	var text 		= d3.select(clickedNode).selectAll('text').text();
	var id 			= d3.select(clickedNode).attr('id');
	var class1 		= d3.select(clickedNode).attr('class');
	
	dotElement = title.replace('->',' -> ');
	//console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s\nSVG number="%d""', id, class1, title, text, dotElement, svgNumber);
	//console.log('Finding and deleting references to %s from the DOT source', dotElement);

	console.log("Clicked : " + title)
	/**
	 *	If the node title of the node on which we clicked on is a graph,
	 *	the corresponding graph is not already open
	 *	start a new svg avtivity with that graph
	 */
	if (dotGraphs.indexOf(title) > 0 && currentGraphName != title) {
		getDot(title, svgNumber + 1)
	}
	else {
		if (index != 0 && title == "Previous") {
			addDigraphTitle(dotSrc, index - 1, svgNumber, graphviz, svg, currentGraphName)
		}
		if (index != dotSrc.length - 1 && title == "Next") {
			addDigraphTitle(dotSrc, index + 1, svgNumber, graphviz, svg, currentGraphName)
		}
		if (title == "Delete") {
			svg.remove()
		}
	}
}

/**
 *	Transition function between two graph states
 */
function transition() {
	var transition1	= d3.transition()
						.ease(d3.easeLinear)
						.delay(10)
						.duration(1000);
	return (transition1)
}

/**
 *	Dot rendering with D3 + graphviz
 *	You can choose the graphviz engine to render the Dot
 */
function render(dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {

	//svg.call(d3.zoom().on("zoom", null))
	
	var dotTorender = dotSrc[index]

	graphviz
		.engine("dot")
		.transition(transition())
		.renderDot(dotTorender)

		.on("end", function () {
			nodes = svg.selectAll('.node,.edge');
			nodes
				.on("click", function () {
					actionFromClick(this, dotSrc, index, svgNumber, graphviz, svg, currentGraphName);
				}
			)}
		)
}

/**
 *	Add a menu on top of each graph with the graph name ;
 *	and buttons Next, Previous, and if the graph is not the 
 *	first graph Delete
 */
function addDigraphTitle(dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {

	dotSrcLines = dotSrc[index].split('\n')
	for (i = 0; i < dotSrcLines.length, dotSrcLines[i].includes("digraph") == false; i++) {
	}
	if (dotSrcLines[i].includes("digraph") == false) {
		console.log("Your graphs should start with the keyword digraph")
	}
	else {
		// randomize the query to never get the cached version of the file
		fetch("http://0.0.0.0:5000/resources/" + "digraphTitle" + ".dot" + "?" + performance.now())
			.then(res => res.text())
			.then(res => {
				var lines = res.split("\n")
				/**
				 *	If the svgNumber is zero ; then we remove the "Delete" button
				 */
				if (svgNumber == 0) {
					for (j = 0; j < lines.length, lines[j].includes("Delete") == false; j++) {
					}
					lines.splice(j, 1)
					}
				res = lines.join("\n")
				return res
			})
			.then(dotInfo => dotInfo += "\tlabel=\"" + "Graph\t\t" + currentGraphName + "\"\n\t}")
			.then(dotInfo => {
				found_first_subgraph = false
				for (i = 0; i < dotSrcLines.length && found_first_subgraph == false; i++) {
					if (dotSrcLines[i].includes("subgraph")) {
						found_first_subgraph = true
						for (n = i; dotSrcLines[n].includes("}") == false; n++) {
							if (dotSrcLines[n].includes("shape")) {
								var firstWord 	= dotSrcLines[n].split(" ")[1]
								dotInfo 		+= "\nPrevious" + " -> " + firstWord  + "[style=invis]"
								dotInfo 		+= "\nNext" + " -> " + firstWord + "[style=invis]"
							}
						}
					}
				}
				return dotInfo
			})
			.then(dotInfo => {
				dotSrcLines.splice(i + 1, 0, dotInfo)
				dotSrc[index] 	= dotSrcLines.join('\n')
				render(dotSrc, index, svgNumber, graphviz, svg, currentGraphName)
			})
	}
}

function selectSvgForDot(digraphArray, index, svgNumber, currentGraphName) {

	d3.select("#svg_container")
		.append("graph")
		.attr("id", "graph" + svgNumber)

	var svg			= d3.select("#graph" + svgNumber)
	var graphviz 	= svg.graphviz()
	addDigraphTitle(digraphArray, index, svgNumber, graphviz, svg, currentGraphName)
}

function getDot(graphName, svgNumber) {
	// randomize the query to never get the cached version of the file
	fetch("http://0.0.0.0:5000/resources/" + graphName + ".dot" + "?" + performance.now())
		.then(res => res.text())
		.then(res => res.replace(/\t+/g, ' ').trim())
		.then((dotInfo =>
		{
			var currentGraphName = graphName
			var digraphArray = dotInfo.split("/*CUT*/")
			selectSvgForDot(digraphArray, 0, svgNumber, currentGraphName)
		}))
}

getDot(dotGraphs[0], 0)
