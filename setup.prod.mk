install-tools: \
	/usr/local/bin/docker \
	/usr/local/bin/docker-compose \
	/usr/local/bin/vim \
	/usr/local/bin/git

/usr/local/bin/docker:
	amazon-linux-extras install -y docker

/usr/local/bin/docker-compose:
	curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose

/usr/local/bin/vim:
	amazon-linux-extras install -y vim

/usr/local/bin/git:
	yum install -y git
