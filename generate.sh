#! /bin/bash -e
for f in $(cd widgets; echo *.vue); do
  b=$(basename $f .vue)
  rm -f resources/$b-* $b.js $b.html
done
node ../node-red-flexdash/gen-widget-nodes.js
