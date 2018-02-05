## Current Setup:

* Workflow `build-and-deploy`:  
  runs the following jobs in order
  * `build` 
  * `image-tests`
  * `deployment` (only when branch is master)

* Caching strategy:
  * For `node_modules` we expect that `package-lock.json` remains unchanged and that is why we used checksum of `package-lock.json`
  * Since npm seems to act weird, we added [partial key match](https://circleci.com/docs/2.0/caching/#restoring-cache). 
  * For caching, `.cache-require-paths.json` we decided to use caching on per day basis.
  * Cache key is today's date and hence with each date, first build might need to rebuild cache, but all subsequent builds have cache available.
## testing jobs locally

[Full documentation](https://circleci.com/docs/2.0/local-jobs/)

### TLDR;

#### Installing cli tool `circleci`
```
curl -o /usr/local/bin/circleci https://circle-downloads.s3.amazonaws.com/releases/build_agent_wrapper/circleci && chmod +x /usr/local/bin/circleci
```

#### Validating yaml file:
```
circleci config validate -c .circleci/config.yml
```

#### Executing a job locally:

- Change to root path of the project.
- Execute `circleci build`
