/*!
 * ng-deg.slackapi JavaScript Library v1.0
 * https://github.com/nickaranz/slackapi-angularjs
 *
 * Copyright (c) 2015 Nick Aranzamendi nickaranz@gmail.com
 * Released under the MIT license 
 */

'use strict';

(function (angular) {
    
	var slackApi = angular.module("Deg.SlackApi", []);
	slackApi.value("slackConfig", {
		OAuthUrl: "https://slack.com/oauth/authorize",
		ApiUrl: "https://slack.com/api/",
		DefaultToken: ""
	});

}(angular));

(function (angular) {

    angular.module("Deg.SlackApi").service('slackSvc', ['$http', '$log', 'slackConfig', function ($http, $log, slackConfig) {

        return {
            //auth
            authorize: authorizeApp,
            auth: {
                test: authTest
            },
            oauth: {
                access: getAccessToken
            },

            //channels
            channels: {
                archive: archiveChannel,
                create: createChannel,
                history: channelHistory,
                info: getChannel,
                invite: channelInvite,
                join: channelJoin,
                kick: channelKick,
                leave: channelleave,
                list: getChannelList,
                mark: channelMark,
                rename: channelRename,
                setPurpose: channelSetPurpose,
                setTopic: channelSetTopic,
                unarchive: channelUnarchive
            },

            //chat
            chat: {
                delete: deleteMessage,
                postMessage: postMessage,
                update: updateMessage
            },

            //files
            files: {
                delete: deleteFile,
                info: getFileInfo,
                list: listfiles,
                upload: uploadFile
            },
            
            //rtm
            rtm: {
                start: startRtm
            },

            //search
            search: {
                all: searchAll,
                files: searchFiles,
                messages: searchMessages
            },

            //stars
            stars: {
                list: starsList
            },

            //team
            team: {
                accessLogs: teamLogs,
                info: getTeamInfo
            },

            //users
            users: {
                getPresence: getUserPresence,
                info: getUserinfo,
                list: getUserslist,
                setActive: setUserActive,
                setPresence: setUserPresence
            },

            //Helpers
            InitToken: initToken,
            ExecuteApiMethod: executeApiCall,
            
            //groups
            groups: {
                archive: notImplemented,
                close: notImplemented,
                create: notImplemented,
                createChild: notImplemented,
                history: notImplemented,
                invite: notImplemented,
                kick: notImplemented,
                leave: notImplemented,
                list: notImplemented,
                mark: notImplemented,
                open: notImplemented,
                rename: notImplemented,
                setPurpose: notImplemented,
                setTopic: notImplemented,
                unarchive: notImplemented
            },

            //im
            im: {
                close: notImplemented,
                history: notImplemented,
                list: notImplemented,
                mark: notImplemented,
                open: notImplemented
            },
        };

        // USERS
        function getUserPresence(userId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            executeApiCall("users.getPresence", params, callback);
        }
        function getUserinfo(userId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            executeApiCall("users.info", params, callback);
        }
        function getUserslist(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("users.list", params, callback);
        }
        function setUserActive(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("users.setActive", params, callback);
        }
        function setUserPresence(status, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                presence: status
            };
            executeApiCall("users.setPresence", params, callback);
        }


        function startRtm(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("auth.test", params);
        }

        //AUTH
        function authorizeApp(clientId, params) {
            var qs = "&" + toQueryString(params);
            var url = slackConfig.OAuthUrl + "?client_id=" + clientId + qs;
            window.location.replace(url);
        }
        function initToken(token, callback) {
            slackConfig.DefaultToken = token;
            authTest(callback);
        }
        function getAccessToken(client, secret, code, callback) {
            var params = {
                client_id: client,
                client_secret: secret,
                code: code
            };
            executeApiCall("oauth.access", params, callback);
        }
        function authTest(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("auth.test", params, callback);
        }
        // CHANNELS
        function archiveChannel(channeId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            executeApiCall("channels.archive", params, callback);
        }
        function channelUnarchive(channeId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            executeApiCall("channels.unarchive", params, callback);
        }
        function channelHistory(channeId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            executeApiCall("channels.history", params, callback);
        }
        function channelInvite(channeId, userId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                user: userId
            };
            executeApiCall("channels.invite", params, callback);
        }
        function channelJoin(channeName, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeName
            };
            executeApiCall("channels.join", params, callback);
        }
        function channelKick(channelId, userId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                user: userId
            };
            executeApiCall("channels.kick", params, callback);
        }
        function channelleave(channelId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            executeApiCall("channels.leave", params, callback);
        }
        function channelMark(channelId, timeStamp, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                ts: timeStamp
            };
            executeApiCall("channels.mark", params, callback);
        }
        function channelRename(channelId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            executeApiCall("channels.rename", params, callback);
        }

        function channelSetPurpose(channelId, text, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                purpose: text
            };
            executeApiCall("channels.setPurpose", params, callback);
        }
        function channelSetTopic(channelId, text, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                topic: text
            };
            executeApiCall("channels.setTopic", params, callback);
        }
        function getChannelList(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("channels.list", params, callback);
        }
        function getChannel(channelId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            executeApiCall("channels.info", params, callback);
        }
        function createChannel(channeName, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                name: channeName
            };
            executeApiCall("channels.create", params, callback);
        }

        // CHAT
        function postMessage(channeId, message, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                text: message
            };
            executeApiCall("channels.info", params, callback);
        }
        function deleteMessage(channeId, timestamp, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                ts: timestamp
            };
            executeApiCall("chat.delete", params, callback);
        }
        function updateMessage(channeId, timestamp, newMessage, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                ts: timestamp,
                text: newMessage
            };
            executeApiCall("chat.update", params, callback);
        }

        // TEAM
        function getTeamInfo(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("team.info", params, callback);
        }
        function teamLogs(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("team.accessLogs", params, callback);
        }
        // FILES
        function deleteFile(fileId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                file: fileId
            };
            executeApiCall("files.delete", params, callback);
        }

        function getFileInfo(fileId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                file: fileId
            };
            executeApiCall("files.info", params, callback);
        }

        function listfiles(callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            executeApiCall("files.list", params, callback);
        }
        function uploadFile(params, callback) {

            params.token = token || slackConfig.DefaultToken;

            if (params.content) {
                var url = slackConfig.ApiUrl + "files.upload";
                executePostRequest(url, params, callback);
            }

            executeApiCall("files.upload", params, callback);
        }

        // SEARCH
        function searchFiles(query, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            executeApiCall("search.files", params, callback);
        }
        function searchAll(query, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            executeApiCall("search.all", params, callback);
        }
        function searchMessages(query, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            executeApiCall("search.messages", params, callback);
        }

        // STARS
        function starsList(userId, callback, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            executeApiCall("stars.list", params, callback);
        }

        // HELPERS
        function executeApiCall(endpoint, paramsObj, callback) {
            var qs = toQueryString(paramsObj);
            var url = slackConfig.ApiUrl + endpoint + "?" + qs;
            executeGetRequest(url, callback);
        }
        function executeGetRequest(url, callback) {
            $http.get(url).
              success(function (result) {
                  if (callback)
                      callback(result);
              }).
              error(function (data, status) {
                  $log.log(status);
                  $log.log(data);
              });
        }
        function executePostRequest(url, data, callback) {
            $http.post(url, data).
              success(function (result) {

                  callback(result);
              }).
              error(function (data, status) {
                  $log.log(status);
                  $log.log(data);
              });
        }
        function toQueryString(obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
            }
            return parts.join("&");
        }

        function notImplemented() {
            $log.log("Method not implemented. Remind nickaranz@gmail.com to quit slacking");
        }

    }]);

})(angular);
