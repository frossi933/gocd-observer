import  { GoCDEvent, GoCDEventType, stageBarChanges$ } from "./events";
import configService from "./services/ConfigService";
import slackService from "./services/SlackService";

// This piece of code enables the popup on goCD valid pages
chrome.runtime.onInstalled.addListener(function() {
    const goCDBaseUrl = configService.getGoCDServerName();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: goCDBaseUrl}
                    })
                ],
                actions: [
                    new chrome.declarativeContent.ShowPageAction()
                ]
            }
        ]);
    });

});

// Reacting to stage bar chages
stageBarChanges$.subscribe(event => {
    const stageBar = event.data;
    slackService.chatPostMessage({
        text: `${stageBar.name} -> ${stageBar.state}`
    })
})

// Just for testing
window["global"] = {
    configService,
    slackService
}