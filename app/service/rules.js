

exports.checkUser = ({ user, account, password, email }) => {
    if (user) {
        let reg = /^.{0,12}$/;
        if (!reg.test(user)) return '用户名应 2 - 12 位'
    }else return '用户名不能为空'

    if (account) {
        let reg = /^(\d|\w){2,12}$/;
        if (!reg.test(account)) return '账号应为 2 - 12 位数字或字母组合'
    }else return '账号不能为空'

    if (password) {
        let reg = /^(\d\w|[!.@_]){2,12}$/;
        if (!reg.test(password)) return '密码应为 2 - 12 位，必须包含数字与字母，可选特殊符号为!.@_'
    }else return '密码不能为空'

    if (email) {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(password)) return '邮箱格式错误';
    }else return '邮箱不能为空'

    return false
}