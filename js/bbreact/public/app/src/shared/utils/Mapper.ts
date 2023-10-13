export abstract class Mapper<TFrom, TTo> {
	abstract from(input: TFrom): TTo;
	abstract into(input: TTo): TFrom;

	static from<TFrom, TTo>(this: new () => Mapper<TFrom, TTo>, input: TFrom): TTo {
		const instance = new this();
		return instance.from(input);
	}

	static into<TFrom, TTo>(this: new () => Mapper<TFrom, TTo>, input: TTo): TFrom {
		const instance = new this();
		return instance.into(input);
	}
}
