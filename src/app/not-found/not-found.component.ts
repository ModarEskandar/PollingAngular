import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `<div class="d-flex align-items-center justify-content-center">
    <img src="../assets/not-found.gif" alt="not-found" />
  </div>`,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
