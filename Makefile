MAKE=make

ALL: pl/index.html

pl/index.html: pl/index.md template.html
	build.js -l pl -t template.html > pl/index.html

watch: ALL
	@inotifywait -m -e close_write ??/*.md template.html | while read events; do $(MAKE) --no-print-directory; done
