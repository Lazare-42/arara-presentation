/**
 *	Global variables : the name of the different graphs you can represent, which
 *	are the same as the names of the files
 *
 *	All graphs & their corresponding SVG 
 */
dotGraphs = ["main", "androidWebView", "androidJava"]
codeFiles = ["androidWebView.java", "clientApp.java", "araraLib.java", "araraIPS.java", "araraLocateMe.java"]

var previouslyClickedElementId = null
var previousSvg                = null

/**
 *	Load code corresponding to the clicked button
 */
function loadCode(clickedLink) {

	var Element 		= document.getElementById('presentationCode');

	//console.log("clicked : " + clickedLink)
	$("#presentationCode").hide()
	if (( index = codeFiles.findIndex(x => x.includes(clickedLink))) != -1) {
		// randomize the query to never get the cached version of the file
		//fetch("/resources/code/" + "arrayExamples.java" + "?" + performance.now())
		fetch("/resources/code/" + codeFiles[index] + "?" + performance.now())
			.then(res => res.text())
			.then(res => "<pre><code>\n" + res + "</pre></code>")
			.then(res =>
				{
					Element.innerHTML 	= res
					return res
				})
				.then(res => {
					hljs.initHighlighting.called = false;
					hljs.initHighlighting();
					$("#presentationCode").fadeIn(1500)
				})
	}
}

/**
 * Actions on Click
 */
function actionFromClick(clickedNode, dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {

	var dotSrcLines = dotSrc[index].split('\n');

	var title 		= d3.select(clickedNode).selectAll('title').text().trim();
	var text 		= d3.select(clickedNode).selectAll('text').text();
	var id 			= d3.select(clickedNode).attr('id');
	var class1 		= d3.select(clickedNode).attr('class');
	var shape 		= d3.select(clickedNode).attr('shape');

	/**
	 *  If a node or link was previously selected ; reset it to default
	 *  Only apply if not a menu button
	 */
	if(title != "Previous" && title != "Next" && title != "Delete") {
		if (previouslyClickedElementId != null && previousSvg == svg) {
			svg.select('#' + previouslyClickedElementId + ' :not(title):not(text)')
				.transition()
				.duration(1500)
				.attr("fill", "grey")
		}

		svg.select('#' + id + ' :not(title):not(text)')
			.transition()
			.duration(1500)
			.attr("fill", "#ffb347")

		previouslyClickedElementId = id
		previousSvg                = svg
	}

	if (dotGraphs.indexOf(text) > 0 && currentGraphName != text) {
		/**
		 *	Remove existing graphs after the current graph if they exist
		 */
		var nextSvg = svgNumber + 1
		if (d3.select("#graph" + nextSvg).empty() == true) {
			return getDot(title, svgNumber + 1)
		}
		else {
			while (d3.select("#graph" + nextSvg).empty() == false) {
				d3.select("#graph" + nextSvg).remove()
				nextSvg += 1
			}
			return getDot(title, svgNumber + 1)
		}
	}
	else {
		loadCode(title)
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

function attributer(datum, index, nodes, svg) {
	console.log("coucou")
	var selection = d3.select(this);
	if (datum.tag == "svg") {
		var width = 	svg.node().clientWidth;
		var height = 	svg.node().clientHeight;
		var x 		= "10";
		var y 		= "10";
		var unit 	= 'px';
		selection
			.attr("width", width + unit)
			.attr("height", height + unit);
		datum.attributes.width = width + unit;
		datum.attributes.height = height + unit;
	}
}

/**
 *	Dot rendering with D3 
 *	You can choose the graphviz engine to render the Dot
 */
function render(dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {
	return new Promise((resolve, reject) => {
		var dotTorender = dotSrc[index]

		graphviz
			.engine("dot")
			.transition(transition())
			.attributer(attributer(svg))
			.renderDot(dotTorender)

			.on("end", function () {
				document.getElementById("graph" + svgNumber).scrollIntoView({ block: 'end',  behavior: 'smooth' })
				nodes = svg.selectAll('.node,.edge');
				nodes
					.on("click", function () {
						actionFromClick(this, dotSrc, index, svgNumber, graphviz, svg, currentGraphName)
					})
				resolve()
			}
			)
	})
	//svg.call(d3.zoom().on("zoom", null))
}

function selectSvgForDot(digraphArray, index, svgNumber, currentGraphName) {

	d3.select("#svg_container")
		.append("graph")
		.attr("id", "graph" + svgNumber)

	var svg			= d3.select("#graph" + svgNumber)
	var graphviz 	= svg.graphviz()
	return addDigraphTitle(digraphArray, index, svgNumber, graphviz, svg, currentGraphName)
}

function getDot(graphName, svgNumber) {
	// randomize the query to never get the cached version of the file
	return fetch("/resources/" + graphName + ".dot" + "?" + performance.now())
		.then(res => res.text())
		.then(res => res.replace(/\t+/g, ' ').trim())
		.then((dotInfo =>
			{
				var currentGraphName = graphName
				var digraphArray = dotInfo.split("/*CUT*/")
				return selectSvgForDot(digraphArray, 0, svgNumber, currentGraphName)
			}))
			.then(loadCode.bind(null, graphName))
}

getDot(dotGraphs[0], 0)
