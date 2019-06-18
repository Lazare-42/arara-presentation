/**
 *	Add a menu on top of each graph with the graph name ;
 *	and buttons Next, Previous, and if the graph is not the 
 *	first graph Delete
 */
function addDigraphTitle(dotSrc, index, svgNumber, graphviz, svg, currentGraphName) {

    //console.log(dotSrc.length)
	dotSrcLines = dotSrc[index].split('\n')
	/**
	 *	Check if the menu has not already been added
	 *	If it is the case, render as is.
	 */
	for (i = 0; i < dotSrcLines.length - 1 && dotSrcLines[i].includes("cluster_Title") == false; i++) {
	}
	if (dotSrcLines[i].includes("cluster_Title") != false) {
		return render(dotSrc, index, svgNumber, graphviz, svg, currentGraphName)
	}
	else {
		for (i = 0; i < dotSrcLines.length, dotSrcLines[i].includes("digraph") == false; i++) {
		}
		if (dotSrcLines[i].includes("digraph") == false) {
			console.log("Your graphs should start with the keyword digraph")
		}
		else {
			// randomize the query to never get the cached version of the file
			return fetch("/resources/" + "digraphTitle" + ".dot" + "?" + performance.now())
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
                    if (index + 1 == dotSrc.length) {
						for (j = 0; j < lines.length, lines[j].includes("Next") == false; j++) {
						}
						lines.splice(j, 1)
                    }
                    if (index == 0) {
						for (j = 0; j < lines.length, lines[j].includes("Previous") == false; j++) {
						}
						lines.splice(j, 1)
                    }
					res = lines.join("\n")
					return res
				})
				.then(dotInfo => dotInfo += "\tlabel=\"" + currentGraphName + " " + (index + 1) + "/" + dotSrc.length + "\"\n\t}")
				.then(dotInfo => {
					found_first_subgraph = false
					for (g = i; g < dotSrcLines.length && found_first_subgraph == false; g++) {
						if (dotSrcLines[g].includes("subgraph")) {
							found_first_subgraph = true
							for (n = g; dotSrcLines[n].includes("}") == false; n++) {
								if (dotSrcLines[n].includes("shape")) {
									var firstWord 	= dotSrcLines[n].split(" ")[1]
                                    if (index != 0) {
                                        dotInfo 		+= "\nPrevious" + " -> " + firstWord  + "[style=invis]"
                                    }
                                    if (svgNumber != 0) {
                                        dotInfo 		+= "\nDelete" + " -> " + firstWord  + "[style=invis]"
                                    }
                                    if (index + 1 != dotSrc.length) {
                                        dotInfo 		+= "\nNext" + " -> " + firstWord + "[style=invis]"
                                    }
								}
							}
						}
					}
					return dotInfo
				})
				.then(dotInfo => {
					dotSrcLines.splice(i + 1, 0, dotInfo)
					dotSrc[index] 	= dotSrcLines.join('\n')
					return render(dotSrc, index, svgNumber, graphviz, svg, currentGraphName)
				})
		}
	}
}
