Number.prototype.formatMoney = function (symbol, thousand) {
    var places = 2;
    if(String(this).indexOf(".") == -1) {
        /**
         * 如果金额是没有小数位，则输出的格式化则不含小数点
         */
        places = 0
    }
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand !== undefined? thousand : ",";
    var decimal = ".";
    var number = this;
    var negative = number < 0 ? "-" : "";
    var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
