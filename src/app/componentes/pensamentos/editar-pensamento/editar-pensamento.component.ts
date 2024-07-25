import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(Number(id)).subscribe((pensamento) => {
      console.log(pensamento)
      this.pensamento = this.formBuilder.group({
        conteudo: [pensamento.conteudo, [Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])]],
        autoria: [pensamento.autoria, [Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])]],
        modelo: [pensamento.modelo, []],
        favorito: [false]
      })
    })
  }

  editarPensamento() {
    if(this.pensamento.value.id && this.pensamento.valid){
      this.service.editar(this.pensamento.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }


  habilitarBotao(): string{
    if(this.pensamento.valid) {
      return "botao";
    } else{
      return "botao__desabilitado"
    }
  }

}
