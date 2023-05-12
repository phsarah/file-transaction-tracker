class Mock {}

export default class Faker {

  public static create(className: any) {
    jest.mock(className.__filename);

    const newPrototype = {} as any;
    
    Object.getOwnPropertyNames(className.prototype).forEach(name => {
      if (name !== 'constructor') {
        newPrototype[name] = jest.fn();
      }
    });

    const newMock = new Mock();
    Object.setPrototypeOf(newMock, newPrototype);
    return newMock as any;
  }

  static get request(): any {
    return jest.fn();
  }

  static get next(): any {
    return jest.fn();
  }

  static get response(): any {
    return {
      statusCode: null,
      locals: {},

      status(value: number) {
        this.statusCode = value;
        return this;
      },

      json(data: any) {
        return data;
      },
    };
  }
}