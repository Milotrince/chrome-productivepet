"use strict"

class CatPage {
    // pseudo-abstract
    // inherit and implement: changePage(pageName)

    constructor() {
        this.menu = {}
    }

    load(id=0) {
        if (this.pageIsRequested()) {
            this.setPage(this.requestedPage())
        } else {
            this.setPage(this.menu[id])
        }
    }

    makeButtons(buttons, onButton) {
        $('#buttons').empty()
        for (let i in buttons) {
            let pageName = buttons[i]
            let id = pageName.replace(/[^A-Z0-9]/ig, '-').toLowerCase()
            $('#buttons').append(`<button id="${id}">${pageName}</button>`)
            $('#' + id).click(() => {
                if (!!onButton) onButton()
                this.changePage(pageName)
            })
        }
    }

    setPage(page) {
        let i = Math.floor(Math.random() * page.prompt.length)
        Cat.setMood(page.mood[i])
        $('#prompt').text(page.prompt[i])
        $('#content').empty()
        $('#info-space').empty()
        if (page.content) $('#content').append(page.content)
        if (page.info) $('#info-space').append(page.info)
        if (page.action) page.action()
        this.makeButtons(page.buttons)
    }

    pageIsRequested() {
        let urlVars = this.getUrlVars()
        return 'page' in urlVars && urlVars['page'] in this.menu
    }

    requestedPage() {
        return this.menu[this.getUrlVars()['page']]
    }

    getUrlVars() {
        let vars = {}
        let regex = /[?&]+([^=&]+)=([^&]*)/gi
        window.location.href.replace(regex, function(m, key, value) {
            vars[key] = value
        })
        return vars
    }
}

class LinearCatPage extends CatPage {
    constructor() {
        super()
        this.index = 0
    }

    changePage() {
        this.index++
        if (this.index >= Object.keys(this.menu).length) {
            window.close()
        } else {
            this.setPage(this.menu[this.index])
        }
    }
}

class DynamicCatPage extends CatPage {
    constructor() {
        super()
        this.mainPage = {}
        this.previousPage = {}
        this.currentPage = {}
    }

    load(id=0) {
        this.mainPage = this.menu[id]
        super.load(id)
    }

    setPage(page) {
        this.previousPage = this.currentPage
        this.currentPage = page
        super.setPage(page)
    }

    changePage(pageName) {
        if (pageName == 'back') {
            // TODO: back button logic store list of non-main previous pages?
            this.setPage(this.mainPage)
        }
        else {
            this.setPage(this.menu[pageName])
        }
    }
}