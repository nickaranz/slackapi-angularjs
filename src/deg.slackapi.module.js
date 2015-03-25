'use strict';

(function (angular) {
    
	var slackApi = angular.module("Deg.SlackApi", []);
	slackApi.value("slackConfig", {
		OAuthUrl: "https://slack.com/oauth/authorize",
		ApiUrl: "https://slack.com/api/",
		DefaultToken: ""
	});

}(angular));
