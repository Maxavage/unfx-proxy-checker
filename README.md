# Unfx Proxy Checker
Unfx Proxy Checker - Open source proxy checker built on (Electron/React/Redux).

With configured hot module replacement. You can use this as electron-react-redux-postcss template.

![](https://github.com/assnctr/unfx-proxy-checker/blob/master/public/unfx.gif?raw=true)

```
Current version 1.1.1
```

Download Latest Build [Here](https://openproxy.space/software/proxy-checker) or on github releases page

## Settings
Threads
```
Maximum active checks
Min 1
Max 500
```
Timeout
```
Min 1000
Max 60000
```

#### Support protocols (selectable):
Http, Https, Socks4, Socks5.

#### Retry
Retries the check if has been received bad response (on each protocol separately).


# Judges
Support Multiple proxy judges. With response validating.

#### For SSL
> Uses only for HTTPS requests.

If disabled - uses as 'usual' for HTTP/SOCKS4/SOCKS5.

#### Validate
> Proxy will be valid is validate string was found in response body.

If disabled - allow all responses.

#### Swap
> Swaps next judge url after each request, for acceleration and keep min server busy.

If disabled - uses judge with min response timeout.


# Data capturing
Capture full data
```
Capture and save all response data (body, timings, headers) for looking at the results page.
```
Capture extra data
```
Parses response body at server signatures.
Checking connection: Keep-Alive/Close
Proxy types: Mikrotik, Squid.
Server: Apache, Nginx
OS: Ubuntu, CentOS
```

# Simple filtering and results export
Filter proxy list by protocols, anons, countries, keep-alive.

Search by:
```
Ip, port, extra data (is enabled), country, city.
Can be contains multi words for capture, separated by space.

Example:
put "Mikrotik" and will be captured only Mikrotik proxies. If we put "Mikrotik Squid 8080" will be captured Mikrotik proxies, Squid proxies and 8080 port proxies.
```

Exports currently filtered proxy list.

#### Updates
#### Auto checking at updates and notification is latest version available.

## Openproxy.space resource:
* [Open Proxy Space](https://openproxy.space) - The largest open proxy list database.
* [Daily Proxy Lists](https://openproxy.space/lists/) - Daily updated proxy lists archive. Dump from database. Sorted by protocols.
* [API documentation](https://openproxy.space/api) - Openproxy api - build own app based on our open proxy space