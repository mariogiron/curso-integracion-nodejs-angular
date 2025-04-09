import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentsService } from '../../services/documents.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form!: FormGroup;
  documentsServices = inject(DocumentsService)
  fb = inject(FormBuilder);
  @Output() saveDocumentEmitter: EventEmitter<void> = new EventEmitter()
  //primera forma para acceder desde el ts a elementos del dom
  @ViewChild('filePdf') filePdf!: ElementRef;

  ngOnInit() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      pdf: [null, Validators.required],
      image: [null, Validators.required]
    })
  }

  onFileSelected(event: any, field: 'pdf' | 'image') {
    const file = event.target.files[0];
    if (file) {
      //añadir al formulario el campo nombre del archivo y el archivo.
      this.form.get(field)?.setValue(file)
    }
  }

  async upload() {

    if (this.form.invalid) {
      toast.error('Formulario no valido')
      return;
    }

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('pdf', this.form.get('pdf')?.value);
    formData.append('image', this.form.get('image')?.value);

    const response = await this.documentsServices.uploadDocument(formData)
    if (response) {
      toast.success('Documentos guardados correctamente');
      this.form.reset();
      // existe un problema en javascript que no se vacian los campos de tipo input file excepto cuando se borrar el archivo.

      //segunda opcion para acceder a elemento del desde ts.
      let inputImg: HTMLInputElement | null = document.querySelector('#image')
      if (inputImg) {
        inputImg.value = ""
      }

      this.filePdf.nativeElement.value = ""
      //cuando tenga el success comunique al padre que ha guardado correctamente el documento. Vamos enviar un aviso de que hemos guardado en la base de datos
      this.saveDocumentEmitter.emit();
    }

  }

}
