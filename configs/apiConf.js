const PREFIX = "/API/";
const API_VER = "v1/";
const PREFIX_END_POINT = PREFIX + API_VER;

function getApi() {
    return PREFIX_END_POINT;
}

module.exports = {
    getApi
}