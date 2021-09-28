class FormCrud {
    constructor(form) {
        this.form = form
        this.panel = document.querySelector('#panel')
        this.init()
    }
    init() {
        var myHeaders = new Headers({ 'Content-Type': 'application/json' })
        var fetchConfig = {
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        document.querySelector('#create-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            fetchConfig.method = 'post'
            fetchConfig.body = JSON.stringify(formObj)
            this.fetReq('/', fetchConfig)

        })
        document.querySelector('#read-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            delete fetchConfig.body
            fetchConfig.method = 'get'
            this.fetReq(('/' + name), fetchConfig)

        })
        document.querySelector('#update-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'put'
            fetchConfig.body = JSON.stringify(formObj)
            this.fetReq(('/' + name), fetchConfig)
        })
        document.querySelector('#delete-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'delete'
            delete fetchConfig.body
            this.fetReq(('/' + name), fetchConfig)
        })
    }
    formResult() {
        var dataObj = {};
        [...this.form].forEach((element, index) => {
            var nameEl = element.name
            if (nameEl == "Address" || nameEl == "Phone" || nameEl == "Name") {

                dataObj[nameEl] = element.value

            }
        })
        return dataObj
    }
    showIn(msg) {
        var final = msg.replace(/\x5D/g, '').replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/\x5B/g, '').replace(/\x5C/g, '')
        console.log(final)
        this.panel.innerHTML = final
    }
    fetReq(url, config, method) {
        fetch(url, config).then(resp => {
            return resp.blob()
        }).then(async resp => {
            var msg = await resp.text()
            if (method == 'post') {
                return alert(msg)
            }
            return this.showIn(msg)
        })
    }
}