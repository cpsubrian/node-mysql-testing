
check =																															\
	if [ -z `which siege` ]; then																			\
		echo "please install siege. http://www.joedog.org/siege-home/";	\
		exit 1;																													\
	fi

install-bench:
	@$(call check)
	@npm install
	@cd bench; npm install

bench-connections: install-bench
	@./node_modules/.bin/benchmarx \
	  --title "connection" \
		--runner siege \
		bench/connections/*.js

.PHONY: bench-connections