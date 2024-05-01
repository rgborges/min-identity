import { create } from "domain";

export interface IResult {
      type: string;
      result: string;
      data?: Object;
      errors?: string[];
}

export class result {
      ok(): Dummy {
            return new Dummy({ type: "Ok", result: "success" });
      }
      fail(err: string[]) {
            return new Dummy({type: "Faild", result: "faild", errors: err});
      }

}
class TT {
      test(): void {
            const r = new result().fail(["there are to many data"]);
      }
}

class Dummy {
      result: IResult;
      constructor(result: IResult) {
            this.result = result;
      }
      with(data: Object): IResult {
            this.result.data = data;
            return this.result;
      }
      toResult() : IResult {
            return this.result;
      }
}
