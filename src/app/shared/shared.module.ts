import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [FooterComponent, NavBarComponent],
  imports: [CommonModule],
  exports: [FooterComponent, NavBarComponent],
})
export class SharedModule {}
