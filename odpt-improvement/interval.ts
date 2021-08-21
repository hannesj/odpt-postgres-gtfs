
const FORMAT = /^([0-3][0-9]):([0-5][0-9]):([0-5][0-9])$/;

export class Interval{
  private readonly seconds: number;

  private constructor(hours: number, minutes: number, seconds: number) {
    this.seconds = ((hours * 60) + minutes) * 60 + seconds
  }

  static parse(input: string): Interval {
    const parts = FORMAT.exec(input);
    if (parts === null) { throw new Error(`Unable to parse ${input}}`)}
    return new Interval(Number(parts[1]), Number(parts[2]), Number(parts[3]))
  }

  static fromSeconds(input: number): Interval {
    return new Interval(0, 0, input)
  }

  add(input: Interval): Interval {
    return new Interval(0, 0, this.seconds + input.seconds)
  }

  addSeconds(input: number): Interval {
    return new Interval(0, 0, this.seconds + input)
  }

  subtract(input: Interval): Interval {
    return new Interval(0, 0, this.seconds - input.seconds)
  }

  subtractSeconds(input: number): Interval {
    return new Interval(0, 0, this.seconds - input)
  }

  valueOf(): number {
    return this.seconds;
  }

  inspect() {
    return this.toString();
  }

  [Symbol.for("Deno.customInspect")]() {
    return this.toString();
  }

  toString(): string {
    return this.toJSON()
  }

  toJSON(): string {
    const hours = Math.floor(this.seconds / (60 * 60));
    const minutes = Math.floor((this.seconds - hours * 60 * 60) / 60);
    const seconds = Math.floor(this.seconds - hours * 60 * 60 - minutes * 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }
}