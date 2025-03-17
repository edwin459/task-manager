import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: TaskListComponent }, // Página principal (lista de tareas)
  { path: 'new', component: TaskFormComponent }, // Página para agregar tareas
  { path: 'edit/:id', component: TaskEditComponent }
];

