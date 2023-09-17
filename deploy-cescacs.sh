#!/bin/bash

# needs:
# sudo npm install -g uglify-js

usage() {                                 # Function: Print a help message.
  echo "Usage: $0 [ -h ]" 1>&2 
}
exit_abnormal() {                         # Function: Exit with error.
  usage
  exit 1
}

SRC="/srv/http/cescacs/"
DEST="/srv/http/cescacs.deploy/"
MIRRORSYNC="/home/cesc/Web/typescript.cescacs"
MINIFIER_OPTIONS='--collapseBooleanAttributes --collapse-whitespace --decodeEntities --html5 --removeAttributeQuotes --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --removeStyleLinkTypeAttributes --use-short-doctype --trimCustomFragments --minify-css true --minify-js true --maxLineLength 120'

while getopts ":h" options; do
	case "${options}" in
	h)	usage
		exit 0
		;;
	*)									# If unknown (any other) option:
		exit_abnormal					# Exit abnormally.
      ;;
  esac
done

if [ ! -d $DEST ]
then
	echo "Empty directory $DEST doesn't exists."
	exit_abnormal
fi
rm -r $DEST* 2> /dev/null

cd $SRC
if [ $? -ne 0 ]
then
	echo "Source directory $SRC doesn't exists."
	exit_abnormal
fi

if [ $(stat -c %Y cescacs.css) -gt $(stat -c %Y cescacs.min.css) ]
then
	echo 'CSS cescacs.css must be minified again into cecscacs.min.css'
	exit_abnormal
fi

# ENSURE GIT MIRROR ACTUALIZED
pushd $MIRRORSYNC > /dev/null 2>&1
if [ $? -ne 0 ] 
then
  echo "directory doen't exist:"
  echo "  "  $MIRRORSYNC
  exit exit_abnormal
fi
source ./mirror-sync.sh
if [ $? -ne 0 ] 
then
  exit $?
fi
popd > /dev/null 2>&1

pushd cescacs.typescript > /dev/null 2>&1
if [ $? -ne 0 ] 
then
  echo "directory doen't exist:"
  echo "  $(pwd)/cescacs.typescript"
  exit exit_abnormal
fi
source ./makejs.sh -mo
if [ $? -ne 0 ] 
then
  exit $?
fi
popd > /dev/null 2>&1

if [ -d "$DEST" ]
then

	shopt -s nullglob
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST$HTMLFILE
	done

	cd ca || exit_abnormal
	mkdir -p $DEST"ca"
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST"ca/"$HTMLFILE
	done
	cd ..

	cd es || exit_abnormal
	mkdir -p $DEST"es"
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST"es/"$HTMLFILE
	done
	cd ..

	cd en || exit_abnormal
	mkdir -p $DEST"en"
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST"en/"$HTMLFILE
	done
	cd ..

	cd und || exit_abnormal
	mkdir -p $DEST"und"
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST"und/"$HTMLFILE
	done
	cd ..

	cd cescacs.typescript || exit_abnormal
	mkdir -p $DEST"cescacs.typescript/dist"
	for HTMLFILE in *.html
	do
	  html-minifier $MINIFIER_OPTIONS $HTMLFILE > $DEST"cescacs.typescript/"$HTMLFILE
	done
	uglifyjs cescacs.game.js -c -m -o $DEST"cescacs.typescript/cescacs.game.js"
	#sed -i 's/\(from[ ]*"[^"]*\)";/\1.js";/g' $DEST"cescacs.typescript/cescacs.game.js"
	cp cescacs.game.css $DEST"cescacs.typescript/cescacs.game.css"
	cp *.png $DEST"cescacs.typescript/"
	cp *.svg $DEST"cescacs.typescript/"
	cd dist || exit_abnormal
	cp * $DEST"cescacs.typescript/dist"
	cd ../..

	cp w3.css $DEST
	cp w3-colors-win8.css $DEST
	cp cescacs.min.css $DEST"cescacs.css"
	cp noredefines.sed $DEST"noredefines.sed"
	cp *.png $DEST
	cp *.ico $DEST
	cp site.webmanifest $DEST
	cp -r other/ $DEST"other"
	cp -r js/ $DEST"js"
	cp -r img/ $DEST"img"
	
	

	shopt -u nullglob
else
	echo "Error: required directory $DEST doesn't exist." 1>&2
	exit_abnormal
fi
exit 0
