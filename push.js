var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BH-A_tC7lsGVqhrGSPRfKk66eCf1Oa700WFxeCnJV6hhoQeDW0YiuG8GTt_IVkbCqlGIsx0wzncJcWOXgHKjw-w",
    "privateKey": "M7spPWAd6a7Zf1GkW6ELx7VqWJiqvJDxXDs0KPbh2Xk"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cucxbolXZZA:APA91bH0GAjdP7K1zFSXYH1YsjVKLJqW61j6FPkAAmBQHB-C9tjkw_sbueN6jNFhcfMLO5ksgMf-bjWhffyT4hcipqB4AOZ6Sv7PWY08CmEW00pNNgmVazJE9RtedlQfi0XBOhvLa4Sc",
    "keys": {
        "p256dh": "BILbtlSnwoXPJurF8nbLjmHQRBj4nRcxjLaXFTBw84+f/eV+xu2rWwpD/4mxdGz93WIasejGizOYPfM2ARVcL18=",
        "auth": "IK8umMma4W8AV8Szh9+0Jw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '550633660371',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);