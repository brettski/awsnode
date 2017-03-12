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

