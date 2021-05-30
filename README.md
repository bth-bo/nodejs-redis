# Running simple Nodejs on K8s
example-nodejs project will be created automatically by jenkins ci/cd and deploy to Kubernetes

## Installation

**Requirements**

**1. microk8s: lightweight k8s platform on test environment https://microk8s.io/**

Enable microk8s features as below

- Build-in registry for keeping images
```microk8s enable registry```

- K8s dashboard (if needed)
```microk8s enable dashboard```

- k8s dns 
```microk8s enable dns```

Create alias for shorter kubectl command
```alias mkctl="microk8s kubectl"```

**2. Disable firewall or manaully allow these ports**
	
- Jenkins server: 31000
- hello-1: 31230
- hello-2: 31234

**3. Nginx service installed on your PC**
**4. Directory on localhost for keeping data inside jenkins server pod ($JENKINS-HOME)**
``` sudo mkdir /mnt/jenkins_home```

## Usage

**1. Jenkins server**
- Building jenkins image and store to private registry
``` cd ./jenkins
docker build -f dockerfile_jenkins -t jenkins-node .
docker tag jenkins-node:latest localhost:32000/jenkins-node
docker push localhost:32000/jenkins-node
```
- Provisioning Jenkins server

```cd ./jenkins/
mkctl apply -f jenkins-pv.yaml
mkctl apply -f jenkins-pvc.yaml
mkctl apply -f jenkins-deployment.yaml
mkctl apply -f jenkins-service.yaml
```

**2. Redis server**
```cd ./yaml/redis
mkctl apply -f redis-configmap.yaml
mkctl apply -f redis-deployment.yaml
mkctl apply -f redis-service.yaml
```





	
