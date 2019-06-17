#!/bin/bash 

if gcsplit -s $1 /digraph/ {*}
then
	for f in ./xx*
	do
		pdf_name=$f".pdf"
		echo "should bed outputing" $pdf_name
		if ! dot -Tpdf $f -o $pdf_name
			then echo "Could not convert to pdf"
			exit 1
		fi
	done
fi

	
