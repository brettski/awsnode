# awsnode
A collection of functions from working with the aws node sdk


## setup
To setup set aws keys in ~/.aws/credentials    

Typical format:
```
[default]
aws_access_key_id = <access key id>
aws_secret_access_key = <secret key>
```

### orphanSg.js
finds ec2 orphaned security groups.  Checking which ones are not in use by an instance. 

### orphanVpc.js
finds ec2 orphaned VPC's. Checking which ones are not in use by an instance. 

### certcheck.js
By elastic IP or Instance IP creates a list of accessible certificates with valid dates, etc.  
```json
{ ip: '10.0.0.20',
       commonName: '*.example.com',
       subjectAltName: 'DNS:*.example.com, DNS:example.com',
       validFrom: 'May 17 20:16:03 2016 GMT',
       validTo: 'May 18 20:16:03 2017 GMT',
       serialNumber: '0BF36A7ACAF1117438623EF0',
       note: null }
```

