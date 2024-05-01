import { create } from "domain";

export interface IResult {
      type: string;
      result: string;
      data?: Object;
      errors?: string[];
}

export interface IOkResult {
     data?: Object  
}

export interface IErrorResult {
      error?: string[];
      data?: Object;
}

export class createResult {
      ok(okResult: IOkResult): IResult  {
            return { type: "OkResult", result: "Success", data: okResult.data };
      }
      fail(errorResult: IErrorResult) : IResult {
            return { type: "ErrorResult", result: "Error", errors: errorResult.error, data: errorResult.data};
      }

}
class TT {
      test(): void {
           const t = new createResult().fail({
              data: { message: 'this'},
              error: ['Validation error 1', 'validation error 2']
           }) 
      }
}
export enum ResultTypes {
      OkResult = "OkResult"
}