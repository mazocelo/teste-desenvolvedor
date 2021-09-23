function newIdGenerator() {
    const alphanumeric = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const idLegnth = 19
    var newId = []

    for (let i = 0; i <= (idLegnth - 1); i++) {
        if (i == 4 || i == 9 || i == 14) {
            newId[i] = '-'
        } else {
            newId[i] = alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
        }
    }
    newId = newId.join('')
    return newId
}
module.exports = { newIdGenerator }