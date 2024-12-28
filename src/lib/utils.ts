import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function convertToASCII(inputString: string){
  //removing the non ascii characters: if theres any non ascii char , then replace it with empty string
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g,"")
  return asciiString;
}