
install:
	@npm install
	@component install

clean:
	@rm -rf components
	@rm -rf node_modules
	@rm -rf public

run:
	@NODE_ENV=production NODE_PATH=lib DEBUG=app,app:* bin/app

dev:
	@NODE_PATH=lib DEBUG=$(DEBUG),app,app:* DEBUG_COLORS=true \
	nodemon -q -w lib -w bin -x bin/app

debug:
	@NODE_PATH=lib DEBUG=* bin/app
