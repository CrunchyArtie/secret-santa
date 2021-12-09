export function UpperCase() {
    return function (target: Object, propertyKey: string) {
        let value: string;
        const getter = function () {
            return value;
        };
        const setter = function (newVal: string) {
            value = newVal.toUpperCase();
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}
