/**
 * db   扩展功能
 */

const moment = require('moment')

moment.locale('zh-cn'); // 使用中文

module.exports = function (schema) {
    schema.methods.create_at_ago = function () {
        return moment(this.create_at).format('YYYY-MM-DD HH:mm');
    };

    schema.methods.update_at_ago = function () {
        return moment(this.update_at).format('YYYY-MM-DD HH:mm');
    };
};