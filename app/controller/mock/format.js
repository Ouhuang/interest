module.exports = ({
    data,
    length = 2
}) => {
    if (!Array.isArray(data)) return {
        error: 'type',
        msg: '请传数组对象类型的json'
    };

    let obj = {}
    data.forEach((v) => {
        if (v.key === '') return;
        obj[v.key] = v.value
    })


    return {
        [`data|${length}`]: [obj]
    }
}