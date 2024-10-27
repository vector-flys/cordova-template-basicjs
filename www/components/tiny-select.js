/* Bismillah */

/*

Tiny Select - v24.06

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: June 2024
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Web: https://bug7a.github.io/basic.js-ui-components/

*/

"use strict";
const TinySelect = function(params = {}) {
    
    // Default values
    const defaults = {
        title: "",
        list: [], // [{ id: "1", label: "(none)" },]
        onSelect: function(index, id, label, title) {},
        selectedIndex: 0,
        fontSize: 20,
        border: 0,
        color: "transparent", // "whitesmoke"
        round: 3,
        width: "auto",
        height: 50,
        paddingX: 12,
        disabled: 0,
        arrow_icon: "components/tiny-select/arrow.svg",
        arrow_border: 0, // 1
        arrow_borderColor: "rgba(0, 0, 0, 0.2)",
        arrow_backgroundColor: "transparent", // "white"
        arrow_round: 3, // 30
        arrow_size: 24,
        list_fontSize: 14,
        list_textColor: "rgba(0, 0, 0, 0.8)",
        list_overTextColor: "indianred",
        emptyText: "Empty",
    };

    if (params == "get") return defaults; // CompName("get").border

    saveCurrentThat();

    // BOX: Component container
    const box = startFlexBox();

    // Values ready to use
    box.props(defaults, params);

    // *** PRIVATE VARIABLES:

    // To close listBox if opened (when listBox created will also put a function in this)
    box.closeListBox = null;

    // Create a tiny list to user selection
    box.createList = function() {

        if (box.list.length <= 0) return null;

        box.icoArrow.rotate = 180;

        box.closeListBox = function() {
            box.icoArrow.rotate = 0;
            listBox.remove();
            box.closeListBox = null;
        };

        const listBox = startFlexBox();
        that.color = "transparent";
        that.elem.style.whiteSpace = "nowrap";
        page.add(that);

            listBox.grp = startFlexBox({
                flexDirection: "column",
                alignItems: "flex-start",
                color: "whitesmoke",
                width: "auto",
                height: "auto",
                border: 1,
                round: 3,
            });
            that.elem.style.padding = "5px";
            that.elem.style.cursor = "pointer";
            that.position = "absolute";

                for (let i = 0; i < box.list.length; i++) {
                    const lbl = Label({
                        fontSize: box.list_fontSize,
                        text: box.list[i].label,
                        index: i,
                        spaceX: 6,
                        textColor: box.list_textColor,
                    });

                    if (box.selectedIndex != lbl.index) {

                        that.on("click", function() {
                            //box.selectedIndex = lbl.index;
                            //box.lblLabel.text = lbl.text;
                            //box.closeListBox();
                            box.setSelectedIndex(lbl.index);
                        });
                        that.on("mouseover", function() {
                            //lbl.color = "white";
                            lbl.textColor = box.list_overTextColor; //basic.ACTION_COLOR;
                        });
                        that.on("mouseout", function() {
                            //lbl.color = "whitesmoke";
                            lbl.textColor = box.list_textColor;
                        });

                    } else {
                        lbl.opacity = 0.5;
                    }
                }

            endFlexBox();

        listBox.on("click", function() {
            if (box.closeListBox != null) box.closeListBox();
        });

        listBox.grp.left = box.totalLeft + box.width - listBox.grp.width;
        listBox.grp.top = box.totalTop + box.height;

        endFlexBox();

        // Sayfa boyutu değiştiğinde; kutu açık ise otomatik kapat.
        let _resizeCount = 0;

        listBox.onResize(function() {
            if (_resizeCount > 1) {
                if (box.closeListBox != null) box.closeListBox();
            }
            _resizeCount++;
        });

        makeBasicObject(listBox);
        return listBox; 

    };

    /*
        - listeyi güncelle ve index i verileni seç

        list: [{ id: "1", label: "(none)" },]
        selectedIndex: 0

        object.setList([{ id: "1", label: "(none)" },], 0);

    */
    box.setList = function(list, selectedIndex = 0) {

        box.list = list;
        box.setSelectedIndex(selectedIndex);

    };

    // Seçili olanı değiştir.
    box.setSelectedIndex = function(index) {

        box.selectedIndex = index;

        if (box.list.length > box.selectedIndex) {
            box.lblLabel.text = box.list[box.selectedIndex].label;
            box.onSelect(index, box.list[index].id, box.list[index].label, box.title);
        } else {
            box.lblLabel.text = box.emptyText;
        }

        if (box.closeListBox != null) box.closeListBox();

    };

    // Başlığı değiştir
    box.setTitle = function(title) {

        box.title = title;
        if (box.title) {
            box.lblTitle.text = box.title + ":";
        } else {
            box.lblTitle.text = "";
        }

    };

    // Nesneyi kullanılamaz yap.
    box.setDisabled = function(value) {

        box.disabled = value;
        if (value == 1) {
            box.clickable = 0;
            box.opacity = 0.6;
        } else {
            box.clickable = 1;
            box.opacity = 1;
        }

    };

    box.getIndexById = function(id) {
        return box.list.findIndex(item => item.id === id);
    };

    box.setColor = function(color) {
        box.color = color;
    };
    // USAGE: get: componentName.color, set: componentName.setColor("red")

    // *** OBJECT VIEW:
    box.elem.style.whiteSpace = "nowrap";
    box.elem.style.cursor = "pointer";
    box.clickable = 1;

    // LABEL: Title
    box.lblTitle = Label({
        fontSize: box.fontSize,
    });
    that.elem.style.marginLeft = box.paddingX + "px";

    // LABEL: Label
    box.lblLabel = Label({
        fontSize: box.fontSize,
    });
    that.elem.style.fontFamily = "opensans-bold";
    that.elem.style.marginLeft = "6px";
    that.elem.style.marginRight = "4px";

    // ICON: Arrow
    box.icoArrow = Icon({
        width: box.arrow_size,
        height: box.arrow_size,
        color: box.arrow_backgroundColor,
        border: box.arrow_border,
        borderColor: box.arrow_borderColor,
        round: box.arrow_round,
        space: 0,
    });
    that.load(box.arrow_icon);
    that.setMotion("transform 0.3s");
    that.elem.style.marginTop = "2px";
    that.elem.style.marginRight = box.paddingX + "px";

    endFlexBox();

    // *** OBJECT INIT CODE:
    box.on("click", box.createList);
    box.setTitle(box.title);
    box.setSelectedIndex(box.selectedIndex);
    box.setDisabled(box.disabled);
    
    restoreThatFromSaved();
    makeBasicObject(box);
    return box;

};