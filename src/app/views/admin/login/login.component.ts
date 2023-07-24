import { subscribedContainerMixin } from './../../../shared/subscribedContainer.mixin';
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent extends subscribedContainerMixin() implements OnInit {
  public loginForm: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) {
    super();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  public login():void{
    this.authService.login(this.loginForm.value).pipe(takeUntil(this.destroyed$)).subscribe((res: any) =>{
      if(res.access && res.refresh){
        this.authService.setAccessToken(res.access);
        this.authService.setRefreshToken(res.refresh);
        this.router.navigateByUrl('admin/dashboard');
      }
    })
  }
}
