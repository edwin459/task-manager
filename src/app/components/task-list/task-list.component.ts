import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = 'all';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.filter === 'completed').subscribe(data => {
      this.tasks = this.filter === 'pending' ? data.filter(t => !t.isCompleted) : data;
    });
  }
  toggleComplete(task: Task): void {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    console.log('Enviando tarea actualizada:', updatedTask); // Debugging

    if (task.id) {
      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: (response) => {
          console.log('Tarea actualizada:', response);
          task.isCompleted = !task.isCompleted;
          alert( `✅ Tarea "${task.title}" marcada como ${task.isCompleted ? 'completada' : 'pendiente'}`);
        },
        error: (err) => {
          console.error('Error al actualizar tarea:', err);
          alert('❌ Error al actualizar la tarea.');
        }
      });
    }
  }

 
  deleteTask(task: Task): void {
    if (task.id && confirm( `¿seguro que quieres eliminar la Tarea"${task.title}"`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          alert('🗑️ Tarea eliminada exitosamente.');
        },
        error: (err) => {
          console.error('Error al eliminar tarea:', err);
          alert('❌ Error al eliminar la tarea.');
        }
      });
    }
  }

 

  onTaskAdded(newTask: Task): void {
    this.tasks.push(newTask);
    alert('🆕 Nueva tarea añadida correctamente.');
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.loadTasks();
  }
}