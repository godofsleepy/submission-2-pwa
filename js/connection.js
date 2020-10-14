function open_connection() {
    var dbPromise = idb.open("submission2", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team")) {
            upgradeDb.createObjectStore("team", {
                keyPath: "id"
            })
        }

        if (!upgradeDb.objectStoreNames.contains("match")) {
            upgradeDb.createObjectStore("match", {
                keyPath: "id"
            })
        }
    })

    return dbPromise
}