declare const Alt1Api: any;

interface ChatLine {
  text: string;
  time: number;
}

class ChatboxReader {
  private lastReadTime = 0;
  private pos: { left: number; top: number; right: number; bottom: number } | null = null;

  find(): boolean {
    const appRect = Alt1Api.findWindow("RuneScape");
    if (!appRect) return false;

    const testboxes = Alt1Api.readTextBoxes(true);
    const filtered = testboxes.filter((box: { height: number; width: number; bottom: number }) => {
      return (
        box.height < 20 &&
        box.width > 50 &&
        box.bottom > appRect.bottom - 250
      );
    });

    if (filtered.length > 0) {
      this.pos = filtered[0];
      return true;
    }

    return false;
  }

  read(): ChatLine[] {
    if (!this.pos) return [];

    const lines = Alt1Api.readText(this.pos).map((line: { text: string }) => ({
      text: line.text,
      time: Date.now()
    }));

    this.lastReadTime = Date.now();
    return lines;
  }
}

(window as any).ChatboxReader = ChatboxReader;
