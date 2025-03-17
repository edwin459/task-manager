import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      completed: [false]
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return; // Evita enviar datos inválidos
    }

    const newTask: Task = this.taskForm.value;
    this.taskService.createTask(newTask).subscribe(task => {
      if (task) { // Verificar que la tarea no sea null
        this.taskAdded.emit(task);
      } else {
        console.error('❌ Error: la tarea creada es null.');
      }
      this.taskForm.reset({ completed: false }); // Reiniciar el formulario
    });
  }
}