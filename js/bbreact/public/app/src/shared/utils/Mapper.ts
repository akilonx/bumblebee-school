export abstract class Mapper<From, To> {
	public abstract mapFrom(input: From): To;

	static from<From, To>(this: new () => Mapper<From, To>, data: From): To {
		const instance = new this();
		return instance.mapFrom(data);
	}
}
