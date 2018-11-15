import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperWrapComponent } from './image-cropper-wrap.component';

describe('ImageCropperWrapComponent', () => {
  let component: ImageCropperWrapComponent;
  let fixture: ComponentFixture<ImageCropperWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
