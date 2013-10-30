
install:
	@npm install
	@component install

clean:
	@rm -rf components
	@rm -rf node_modules
	@rm -rf public

run:
	@NODE_ENV=production DEBUG=app,app:* npm start

dev:
	@NODE_PATH=lib DEBUG=$(DEBUG),app,app:* DEBUG_COLORS=true \
	nodemon -q -w lib -w bin

debug:
	DEBUG=* npm start
