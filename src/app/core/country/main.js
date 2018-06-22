import ipCountry from "ip-country";
import Countries from "./countries";

ipCountry.init({
    // You can specify the path to a custom MMDb file if you want
    // more details about IP addresses (like, city, zipcode, population).
    // Note: For most cases the default MMDb file should be enough.
    // Note: You can find free Dbs here: http://dev.maxmind.com/geoip/geoip2/geolite2/
    // Note: Big MMDb files will use more memory and lookups will be slower.
    mmdb: __dirname + '/GeoLite2-City.mmdb',
  
    // Return a default country when the country can not be detected from the IP.
    fallbackCountry: 'ZZ',
  
    // Expose full IP lookup info in the request (`res.locals.IPInfo`).
    exposeInfo: false
})

const countries = new Countries();

const getCity = ip => {
    try {
        return ipCountry.lookup(ip).city.names.en;
    } catch (error) {
        return '';
    }
}

export const getCountryByIP = ip => {
    const code = ipCountry.country(ip);

    return {
        name: countries.codes[code].name,
        city: getCity(ip),
        flag: countries.codes[code].tr_name
    };
}
