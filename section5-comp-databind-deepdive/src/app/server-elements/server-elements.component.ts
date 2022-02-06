import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-elements.component.html',
  styleUrls: ['./server-elements.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true })
  contentParagraph: ElementRef;

  constructor() {
    console.log('ServerElementComponent: constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ServerElementComponent ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ServerElementComponent ngOnInit called');
    console.log('TextContent: ', this.header.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log('ServerElementComponent ngDoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('ServerElementComponent ngAfterContentInit called');
    console.log(
      'ngAfterContentInit TextContent: ',
      this.contentParagraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log('ServerElementComponent ngAfterContentChecked called');
    console.log('textContent Content Paragraph: ');
  }

  ngAfterViewInit(): void {
    console.log('ServerElementComponent ngAfterViewInit called');
    console.log('TextContent: ', this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ServerElementComponent ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
    console.log('ServerElementComponent ngOnDestroy called');
  }
}
