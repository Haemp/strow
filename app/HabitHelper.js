const typeToColor = new Map();
typeToColor.set(undefined, 'gray');
typeToColor.set(1, 'orange');
typeToColor.set(2, 'blue');
typeToColor.set(3, 'pink');
typeToColor.set(4, 'yellow');
typeToColor.set(5, 'green');
typeToColor.set(6, 'teal');
typeToColor.set(7, 'purple');
typeToColor.set(8, 'red');

const colorToHex = new Map();

colorToHex.set('gray', '#d2d2d2');
colorToHex.set('orange', '#f6bf49');
colorToHex.set('blue', '#6d84e5')
colorToHex.set('pink', '#e285b7')
colorToHex.set('yellow', '#f8e89d')
colorToHex.set('green', '#90ce74')
colorToHex.set('teal', '#82c7d8')
colorToHex.set('purple', '#a571d4')
colorToHex.set('red', '#ef8886')


export default class HabitHelper{
    static getColorNameForType(type){
        return typeToColor.get(type);
    }

    static getColorHex(color){
        return colorToHex.get(color)
    }
}