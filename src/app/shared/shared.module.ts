import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BlogDestinationCardComponent } from './components/blog-destination-card/blog-destination-card.component';

@NgModule({
  declarations: [FooterComponent, NavBarComponent, BlogDestinationCardComponent],
  imports: [CommonModule],
  exports: [FooterComponent, NavBarComponent, BlogDestinationCardComponent],
})
export class SharedModule { }
