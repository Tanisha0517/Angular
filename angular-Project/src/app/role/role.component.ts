import { Component } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent {

  endpoint: any = 'http://localhost:8080/Role/save';

  form: any = {
    data: {},
    errorMessage: '',
    successMessage: '',
    inputerror: {}
  };

  constructor(private httpService: HttpserviceService) { }

  save() {

    this.form.errorMessage = '';
    this.form.successMessage = '';
    this.form.inputerror = {};

    this.httpService.post(this.endpoint, this.form.data, (response: any) => {

      console.log('response:', response);

      if (response.success == false && response.result.inputerror) {
        this.form.inputerror = response.result.inputerror;
      }

      if (response.success == false && response.result.message) {
        this.form.errorMessage = response.result.message;
      }

      if (response.success == true) {
        this.form.successMessage = response.result.message;
        this.form.data = {};
      }

    });

  }

}