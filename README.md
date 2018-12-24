# Unfx Proxy Checker
Unfx Proxy Checker - Open source proxy checker built in Electron with React/Redux/Postcss.

With configured hot module replacement. You can use this as electron-react-redux-postcss template.

Download latest build [here](https://github.com/assnctr/unfx-proxy-checker/releases)

![](https://i.ibb.co/KG0FJwZ/Screenshot-2.png)
![](https://i.ibb.co/SwK6DNT/Screenshot-5.png)

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

## Blacklist
Filtering ip addresses through blacklists. You can enable/disable any blacklist separately.

### Add blacklist
Blacklist must be contain unique title and URL or Local path to ip addresses.

> Ip addresses can be as single (127.0.0.1) or with mask (127.0.0.0/24)

> Lists loads every time before checking (Without progress overlay)

#### Filtering
> Enable filtering through blacklists.

## Judges
Support Multiple proxy judges. With response validating.

#### SSL
> Uses only for HTTPS requests.

If disabled - uses as 'usual' for HTTP/SOCKS4/SOCKS5.

#### Validate
> Proxy will be valid is validate string was found in response body.

If disabled - allow all responses.

#### Swap
> Swaps next judge url after each request, for acceleration and keep min server busy.

If disabled - uses judge with min response timeout.

## Data capturing
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

## Sorting and filtering by all params
Easy sorting and filtering by ip, port, protocol, anon, country, keep-alive, blacklist, extra, timeout.

### Country selector
#### Double click for select/deselect all.

Search by:
```
Ip, port, country, city.
Can be contains multi words for capture, separated by space.
```

Exports currently filtered proxy list.

## Updates
Auto checking at updates and notification is latest version available.

## Openproxy.space resource:
* [Open Proxy Space](https://openproxy.space) - The largest open proxy list database.
* [Daily Proxy Lists](https://openproxy.space/lists/) - Daily updated proxy lists archive. Dump from database. Sorted by protocols.
* [API](https://openproxy.space/api) - Openproxy api - build own app based on our open proxy space

## IP Location database
This product includes GeoLite2 data created by MaxMind, available [here](https://dev.maxmind.com/geoip/geoip2/geolite2/).
