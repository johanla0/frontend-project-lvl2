install:
	install-deps
install-deps:
	npm ci
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
uncommit:
	git reset --soft HEAD^

.PHONY: test