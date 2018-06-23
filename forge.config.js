module.exports = {
    "make_targets": {
        "win32": [
            "squirrel"
        ]
    },
    "publish_targets": {
        "win32": ["github"]
    },
    "github_repository": {
        "owner": "assnctr",
        "name": "unfx-proxy-checker",
        "draft": false
    },
    "electronPackagerConfig": {
        "name": "unfx-proxy-checker-v1.0.3",
        "packageManager": "yarn",
        "appCopyright": "© 2018 ost UNFORCEPROXY (openproxy.space) by ASSNCTR",
        "icon": "./public/icons/icon.ico",
        "asar": true
    }
}