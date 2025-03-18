
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5277/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(completed?: boolean): Observable<Task[]> {
    const url = completed !== undefined ?` ${this.apiUrl}?completed=${completed}` : this.apiUrl;
    return this.http.get<Task[]>(url).pipe(
      catchError(error => {
        console.error('Error al obtener tareas:', error);
        return of([]);
      })
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>( `${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Convertimos completed a isCompleted para que coincida con .NET
    const formattedTask = { 
      ...updatedTask, 
      isCompleted: updatedTask.isCompleted, 
      completed: undefined // Eliminamos la propiedad innecesaria
    };
  
    return this.http.put<Task>( `${this.apiUrl}/${id}`, formattedTask, { headers }).pipe(
      catchError(error => {
        console.error('Error al actualizar tarea:', error);
        return of();
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
``