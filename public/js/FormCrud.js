class FormCrud {
    constructor(form) {
        this.form = form
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
            console.log(fetchConfig)
            fetch('/', fetchConfig)
                .then(resp => {
                    console.log(resp)
                })
        })
        document.querySelector('#read-one').addEventListener('click', (event) => {

            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.body = null
            fetchConfig.method = 'get'
            console.log(fetchConfig)
            fetch('/' + name, fetchConfig)
                .then(resp => {
                    console.log(resp)
                })


        })
        document.querySelector('#update-one').addEventListener('click', (event) => {

            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'put'
            fetchConfig.body = JSON.stringify(formObj)
            console.log(fetchConfig)
            fetch('/' + name, fetchConfig)
                .then(resp => {
                    console.log(resp)
                })


        })
        document.querySelector('#delete-one').addEventListener('click', (event) => {

            event.preventDefault()
            var formObj = this.formResult()
            var name = JSON.stringify(formObj.Name)
            fetchConfig.method = 'delete'

            console.log(fetchConfig)
            fetch('/' + name, fetchConfig)
                .then(resp => {
                    console.log(resp)
                })

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
        console.log(dataObj)
        return dataObj
    }
}

/**
 * this.creteOne =
this.readOne = 
this.changeOne 
this.deleteOne 
 */