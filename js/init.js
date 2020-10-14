if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil")
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal")
            })
    })
} else {
    console.log("ServiceWorker belum didukung browser ini.")
}

if ("Notification" in window) {
    requestPermission()
} else {
    console.error("Browser tidak mendukung notifikasi.")
}


function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.")
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.")
            return;
        }

        console.log("Fitur notifikasi diijinkan.")
    })
}

if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BH-A_tC7lsGVqhrGSPRfKk66eCf1Oa700WFxeCnJV6hhoQeDW0YiuG8GTt_IVkbCqlGIsx0wzncJcWOXgHKjw-w")
        }).then(function (subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function (e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}