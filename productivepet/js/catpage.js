"use strict";

class CatPage {

    constructor(mode) {
        this.mode = mode; // either linear or navigate
        this.index = 0; // for linear
        this.cat = new Cat();
        this.menu= {};
    }

    load(id=0) {
        this.setMenu(this.menu[id])
    }

    makeButtons(buttons, onButton) {
        $('#buttons').empty();
        for (let i in buttons) {
            let name = buttons[i];
            let id = name.replace(/[^A-Z0-9]/ig, '-').toLowerCase();
            $('#buttons').append(`<button id="${id}">${name}</button>`);
            $('#' + id).click(() => {
                if (!!onButton) onButton();
                if (this.mode === 'linear') {
                    this.nextMenu();
                } else {
                    this.setMenu(this.menu[name]);
                }
            });
        }
    }

    // linear
    nextMenu() {
        this.index++;
        if (this.index >= Object.keys(this.menu).length) {
            window.close();
        } else {
            this.setMenu(this.menu[this.index]);
        }
    }

    setMenu(menu) {
        let i = Math.floor(Math.random() * menu.prompt.length);
        this.cat.setMood(menu.mood[i]);
        $('#prompt').text(menu.prompt[i]);
        $('#content').empty();
        $('#info-space').empty();
        if (menu.content) $('#content').append(menu.content)
        if (menu.info) $('#info-space').append(menu.info)
        if (menu.action) menu.action();
        this.makeButtons(menu.buttons);
    }
}