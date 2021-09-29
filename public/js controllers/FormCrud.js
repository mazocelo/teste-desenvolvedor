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
            this.fetReq('/', fetchConfig, fetchConfig.method)

        })
        document.querySelector('#read-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            delete fetchConfig.body
            fetchConfig.method = 'get'
            this.fetReq(('/' + name), fetchConfig, fetchConfig.method)

        })
        document.querySelector('#update-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'put'
            fetchConfig.body = JSON.stringify(formObj)
            this.fetReq(('/' + name), fetchConfig, fetchConfig.method)
        })
        document.querySelector('#delete-one').addEventListener('click', (event) => {
            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'delete'
            delete fetchConfig.body
            this.fetReq(('/' + name), fetchConfig, fetchConfig.method)
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
    showIn(msg, method) {
        var final = msg;
        if (method == 'get') {
            msg = eval(msg)
            if (msg.length > 0) {
                this.cleanPanel()
                msg.forEach((user, i) => {
                    this.appendDiv(user)
                })
            } else {
                console.log(msg[0])
                this.panel.innerHTML = 'Sem Usuários com esse nome cadastrado'
            }

        } else {
            final = final.replace(/\x5D/g, '').replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/\x5B/g, '').replace(/\x5C/g, '')
            this.panel.innerHTML = final;
        }

        /// this.panel.innerHTML = final
    }
    fetReq(url, config, method) {
        fetch(url, config).then(resp => {
            return resp.blob()
        }).then(async resp => {
            var msg = await resp.text()
            if (method == 'post') {
                return alert(msg)
            }
            return this.showIn(msg, method)
        })
    }
    appendDiv(user) {
        console.log(user)
        var newDiv = document.createElement('div')
        newDiv.classList.add('container')
        newDiv.classList.add('user-tabela')

        var titleName = document.createElement("h2")
        titleName.innerHTML = "Nome: " + (user['Name'])
        newDiv.appendChild(titleName)

        var titleAddress = document.createElement("h2")
        titleAddress.innerHTML = "Endereço: " + (user['Address'])
        newDiv.appendChild(titleAddress)

        var titlePhone = document.createElement("h2")
        titlePhone.innerHTML = "Telefone: " + (user['Phone'])
        newDiv.appendChild(titlePhone); // 

        this.panel.appendChild(newDiv)
    }
    cleanPanel() {
        return this.panel.innerHTML = ""
    }
}