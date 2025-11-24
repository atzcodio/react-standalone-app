type Unit = 'px' | '%' | 'em' | 'rem';

export class ValueUnit {
    value: number;
    unit: Unit;

    constructor(value: number = 0, unit: Unit = 'px') {
        this.value = value;
        this.unit = unit;
    }
}

export class Spacing {
    top: ValueUnit;
    right: ValueUnit;
    bottom: ValueUnit;
    left: ValueUnit;

    constructor(value: string) {
        const parts = value.split(' ').map(part => {
            const match = part.match(/^(\d+)(px|%|em|rem)$/);
            return match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit();
        });

        this.top = parts[0] || new ValueUnit();
        this.right = parts[1] || this.top;
        this.bottom = parts[2] || this.top;
        this.left = parts[3] || this.right;
    }

    toString() {
        return `${this.top.value}${this.top.unit} ${this.right.value}${this.right.unit} ${this.bottom.value}${this.bottom.unit} ${this.left.value}${this.left.unit}`;
    }
}

  
  // Define other CSS property classes
export class Padding extends Spacing {}
export class Margin extends Spacing {}

export class Border {
    width: ValueUnit;
    style: string;
    color: string;

    constructor(width: string, style: string = 'solid', color: string = 'black') {
        const match = width.match(/^(\d+)(px|%|em|rem)$/);
        this.width = match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit();
        this.style = style;
        this.color = color;
    }

    toString() {
        return `${this.width.value}${this.width.unit} ${this.style} ${this.color}`;
    }
}

export class BackgroundColor {
    color?: string;

    constructor(color: string) {
        this.color = color;
    }

    toString() {
        return this.color;
    }
}

export class FontSize {
    size: ValueUnit;

    constructor(size: string) {
        const match = size.match(/^(\d+)(px|%|em|rem)$/);
        this.size = match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit(16, 'px'); // Default to 16px
    }

    toString() {
        return `${this.size.value}${this.size.unit}`;
    }
}

export class Width {
    value: ValueUnit;

    constructor(value: string) {
        const match = value.match(/^(\d+)(px|%|em|rem)$/);
        this.value = match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit(100, '%'); // Default to 100%
    }

    toString() {
        return `${this.value.value}${this.value.unit}`;
    }
}

export class Height {
    value: ValueUnit;

    constructor(value: string) {
        const match = value.match(/^(\d+)(px|%|em|rem)$/);
        this.value = match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit(100, 'px'); // Default to 100px
    }

    toString() {
        return `${this.value.value}${this.value.unit}`;
    }
}

export class Color {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    toString() {
        return this.color;
    }
}

export class FontFamily {
    family: string;

    constructor(family: string) {
        this.family = family;
    }

    toString() {
        return this.family;
    }
}

export class LineHeight {
    height: ValueUnit;

    constructor(height: string) {
        const match = height.match(/^(\d+)(\w+)$/);
        this.height = match ? new ValueUnit(parseFloat(match[1]), match[2] as Unit) : new ValueUnit(1.5, 'px'); // Default to 1.5
    }

    toString() {
        return `${this.height.value}${this.height.unit}`;
    }
}

export class TextAlign {
    alignment: string;

    constructor(alignment: string) {
        this.alignment = alignment;
    }

    toString() {
        return this.alignment;
    }
}

export class Display {
    displayType: string;

    constructor(displayType: string) {
        this.displayType = displayType;
    }

    toString() {
        return this.displayType;
    }
}