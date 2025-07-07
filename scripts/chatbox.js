"use strict";
class ChatboxReader {
    constructor() {
        this.lastReadTime = 0;
        this.pos = null;
    }
    find() {
        const appRect = Alt1Api.findWindow("RuneScape");
        if (!appRect)
            return false;
        const testboxes = Alt1Api.readTextBoxes(true);
        const filtered = testboxes.filter((box) => {
            return (box.height < 20 &&
                box.width > 50 &&
                box.bottom > appRect.bottom - 250);
        });
        if (filtered.length > 0) {
            this.pos = filtered[0];
            return true;
        }
        return false;
    }
    read() {
        if (!this.pos)
            return [];
        const lines = Alt1Api.readText(this.pos).map((line) => ({
            text: line.text,
            time: Date.now()
        }));
        this.lastReadTime = Date.now();
        return lines;
    }
}
window.ChatboxReader = ChatboxReader;
