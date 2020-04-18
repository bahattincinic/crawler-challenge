check:
	pycodestyle . --exclude="*/migrations/*,env/*"
	python manage.py check
	safety check --bare --full-report
	mypy .
	bandit -r .
