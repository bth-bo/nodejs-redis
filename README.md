# Running simple Nodejs on K8s
example-nodejs project will be created automatically by jenkins ci/cd and deploy to Kubernetes

## Installation

Requirements

1. microk8s: lightweight k8s platform on test environment [a link]https://microk8s.io/

	enable microk8s features as below

	- Build-in registry for keeping images
  	```microk8s enable registry```

	- K8s dashboard (if needed)
	```microk8s enable dashboard```

	- k8s dns 
	```microk8s enable dns```

2. Disable firewall or manaully allow these ports
	
	- Jenkins server: 31000
	- hello-1: 31230
	- hello-2: 31234

3. Nginx service installed on your PC

	

