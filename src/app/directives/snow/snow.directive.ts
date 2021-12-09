import {Directive, ElementRef, OnInit, ViewContainerRef} from '@angular/core';

// Snow from https://codepen.io/radum/pen/xICAB

class Snowflake {
  public x = 0;
  public y = 0;
  public vy = 0;
  public vx = 0;
  public r = 0;
  public o = 0;

  public reset(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }
}

const COUNT = 300;

@Directive({
  selector: '[appSnow]'
})
export class SnowDirective implements OnInit {
  // @ts-ignore
  private canvas: HTMLCanvasElement;
  private width = this.el.nativeElement.clientWidth;
  private height = this.el.nativeElement.clientHeight;
  private active = false;
  private snowflakes: Snowflake[] = [];

  get ctx() {
    return this.canvas.getContext('2d');
  }

  constructor(public el: ElementRef, private view: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.pointerEvents = 'none';

    for (let i = 0; i < COUNT; i++) {
      const snowflake = new Snowflake();
      snowflake.reset(this.width, this.height);
      this.snowflakes.push(snowflake);
    }

    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this), false);
    this.el.nativeElement.appendChild(this.canvas);
  }

  private onResize() {
    this.width = this.el.nativeElement.clientWidth;
    this.height = this.el.nativeElement.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    if (this.ctx)
      this.ctx.fillStyle = '#FFF';

    const wasActive = this.active;
    this.active = this.width > 100;

    if (!wasActive && this.active) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

  private update() {
    if (this.ctx)
      this.ctx.clearRect(0, 0, this.width, this.height);

    if (!this.active) {
      return;
    }

    for (let i = 0; i < COUNT; i++) {
      const snowflake = this.snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      if (this.ctx) {
        this.ctx.globalAlpha = snowflake.o;
        this.ctx.beginPath();
        this.ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fill();
      }
      if (snowflake.y > this.height) {
        snowflake.reset(this.width, this.height);
      }
    }

    window.requestAnimationFrame(this.update.bind(this));
  }
}
