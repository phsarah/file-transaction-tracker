import CustomError from "./customError";

type InternalObject = {
    [key: string]: unknown;
};

export default class Utilities {

    public static defined(values: any): boolean {
        if (values && Object.prototype.toString.call(values) === '[object Date]' && !isNaN(values)) {
            return true;
        }

        if (values === '') {
            return false;
        }

        if (typeof values === 'undefined') {
            return false;
        }

        if (values === null) {
            return false;
        }

        if (typeof values === 'object' && Object.keys(values).length === 0) {
            return false;
        }

        return true;
    }

    public static groupBy<T>(array: T[], key: string) {
        return array.reduce((callback: any, item: any) => ({
            ...callback,
            [item[key]]: [...(callback[item[key]] ?? []), item],
        }),
            {})
    }


    public static validateParams(array: Array<string>, obj: InternalObject): Promise<boolean> {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < array.length; i++) {
                if (
                    !obj.hasOwnProperty(array[i]) ||
                    obj[array[i]] === null ||
                    obj[array[i]] === undefined ||
                    obj[array[i]] === ''
                ) {
                    return reject(
                        new CustomError(
                            `${__dirname}${__filename}`,
                            'validateParams',
                            `validate your params, ${array[i]} is missing`,
                            422,
                        ),
                    );
                }
            }
            return resolve(true);
        });
    }
}
