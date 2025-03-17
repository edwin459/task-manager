import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      completed: [false]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.taskId.set(id);

      this.taskService.getTaskById(id).subscribe(task => {
        if (task) {
          this.taskForm.patchValue(task);
        } else {
          console.error('❌ No se encontró la tarea.');
          this.router.navigate(['/']);
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.taskId(); // ✅ Se guarda en una variable para evitar errores

    if (!id || this.taskForm.invalid) {
      console.error('❌ Error: ID inválido o formulario inválido.');
      return;
    }

    this.taskService.updateTask(id, this.taskForm.value).subscribe(response => {
      console.log('✅ Tarea actualizada correctamente:', response);
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}