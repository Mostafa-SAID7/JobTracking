import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateDto, CreateTemplateDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = 'http://localhost:5001/api/templates';

  constructor(private http: HttpClient) { }

  createTemplate(template: CreateTemplateDto): Observable<TemplateDto> {
    return this.http.post<TemplateDto>(this.apiUrl, template);
  }

  getTemplate(id: number): Observable<TemplateDto> {
    return this.http.get<TemplateDto>(`${this.apiUrl}/${id}`);
  }

  getAllTemplates(): Observable<TemplateDto[]> {
    return this.http.get<TemplateDto[]>(this.apiUrl);
  }

  updateTemplate(id: number, template: CreateTemplateDto): Observable<TemplateDto> {
    return this.http.put<TemplateDto>(`${this.apiUrl}/${id}`, template);
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
