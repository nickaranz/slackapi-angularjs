# slackapi-angularjs
AngularJS module wrapper for the Slack Web API and oAuth helpers for token authentication.

## Usage
Most methods documented here https://api.slack.com/methods are wrapped in an angular service. 
So far, only `im `, and `group` calls are not supported yet.
For a quick POC, you can manually set a default token on `deg.slackapi.module.js` - Get a token here: https://api.slack.com/web

```
  slackApi.value("slackConfig", {
  ...
  DefaultToken: ""
  ...
 });
 
```

### Load Module
`angular.module("app", ['Deg.SlackApi']);`

### Inject slackSvc Service
`angular.module("app").controller('myCtrl', ['$scope', 'slackSvc', function ($scope, slackSvc) { }]);`

##### Example
```
angular.module("app").controller('myCtrl', ['$scope', 'slackSvc', function ($scope, slackSvc) {

  slackSvc.search.files($scope.query, function(response){
      if(response.ok){
        // your code here
      }
  });
}]);  
```

##### Authentication
First, register your application with Slack here https://api.slack.com/applications/new 

* Authorize

Learn more here: https://api.slack.com/docs/oauth

```
var config = {
  client: "",
  authParms {
    state: "",
    redirect_uri: ""
    ...
  }; 
}
slackSvc.authorize(config.client, config.authParams);
```

* After redirect, Check `state` and `code` values then call

```
  slackSvc.oauth.access(clientId, clientSecret, code, function (response) {
      if(response.ok){
        //optional : preload you token for further requests
        slackSvc.InitToken(response.access_token);
      }
  });
```

##### Manual method call
Most slackSvc methods only take required values as parameters. To call a missing endpoint or to pass more parameters use:

```
var params{
  token: "",
  channel: "",
  inclusive : 0
}
  slackSvc.ExecuteApiMethod("groups.history", params, function(response){
     // your code here
  });
```

### Feedback

Questions, bugs, I am in Twitter [@nickaranz](http://twitter.com/nickaranz)
