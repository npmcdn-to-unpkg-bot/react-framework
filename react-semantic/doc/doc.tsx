import * as React from 'react';

export interface docHeader{
  title?:string;
  subTitle?:React.ReactNode;
  panel?:React.ReactNode;
}

export interface docRoot extends docHeader {
  components:Array<docComponent>;
}

export interface docComponent extends docHeader {
  segments:Array<docSegment>;
}

export interface docSegment extends docHeader {
  blocks:Array<docExample>;
}

export interface docExample extends docHeader {
  example?:React.ReactNode;
  code: string;
}
