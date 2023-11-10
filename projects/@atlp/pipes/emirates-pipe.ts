import { Component, Pipe } from '@angular/core';

@Pipe({
  name: 'eidmaskpipe',
})
export class EmiratesPipe {
  transform(input) {
    if (input) {
      let trimmed = input.replace(/\s+/g, '');

      trimmed = trimmed.replace(/-/g, '');

      let numbers = [];

      numbers.push(trimmed.substr(0, 3));

      if (trimmed.substr(3, 4) !== '') numbers.push(trimmed.substr(3, 4));

      if (trimmed.substr(7, 7) != '') numbers.push(trimmed.substr(7, 7));

      if (trimmed.substr(14, 1) != '') numbers.push(trimmed.substr(14, 1));

      let finalEID = numbers.join('-');
      return finalEID;
    } else return input;
  }
}
