window.check_favorite = (id, type) => {
    return new Promise(() => {
        open_connection()
            .then(db => {
                const tx = db.transaction(type, "readonly")
                const store = tx.objectStore(type)
                return store.get(id)
            })
            .then(data => {
                if (data == undefined) {
                    if (type === "team") {
                        getTeam(id).then(team => {
                            insert_db(type, team)
                        })
                    } else if (type === "match") {
                        getMatch(id).then(match => {
                            insert_db(type, match)
                        })
                    } else {
                        console.log("error")
                    }
                } else {
                    delete_db(type, id)
                }
            })
    })
}

window.deletefav = (id, type) => {
    if (type === "match") {
        delete_db(type, id).then(initFavoriteMatch())
    } else if (type === "team") {
        delete_db(type, id).then(initFavoriteTeam())
    }
}

function insert_db(type, data) {
    let item = {}
    if (type === "team") {
        item = {
            id: data.id,
            name: data.name,
            crestUrl: data.crestUrl,
            shortName: data.shortName
        }
    } else if (type === "match") {
        item = {
            id: data.match.id,
            match: {
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    } else {
        console.log("error")
    }

    open_connection().then(db => {
        const tx = db.transaction(type, 'readwrite');
        tx.objectStore(type).add(item)
        return tx.complete;
    }).then(() => {
        M.toast({
            html: 'Data added to fav'
        })
    }).catch(() => {
        M.toast({
            html: 'Error'
        })
    })

}

function delete_db(type, id) {
    return new Promise(() => {
        open_connection().then(db => {
            const tx = db.transaction(type, "readwrite")
            const store = tx.objectStore(type)
            store.delete(id)
            return tx.complete
        }).then(() => {
            M.toast({
                html: 'Data delete from fav!'
            })
        }).catch(() => {
            M.toast({
                html: 'Error'
            })
        })
    })
}

function getAllData(type) {
    return new Promise((resolve, reject) => {
        open_connection().then(db => {
                const tx = db.transaction(type, "readonly")
                const store = tx.objectStore(type)
                return store.getAll()
            })
            .then(data => {
                resolve(data)
            })
    })
}