import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobResponse, JobDto, OcrPreviewDto, SendEmailRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5001/api/v2/jobs';

  constructor(private http: HttpClient) { }

  createJob(text?: string, image?: File): Observable<JobResponse> {
    const formData = new FormData();
    if (text) {
      formData.append('text', text);
    }
    if (image) {
      formData.append('image', image);
    }
    return this.http.post<JobResponse>(this.apiUrl, formData);
  }

  getJob(id: number): Observable<JobResponse> {
    return this.http.get<JobResponse>(`${this.apiUrl}/${id}`);
  }

  getAllJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(this.apiUrl);
  }

  getJobsByCategory(category: string): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(`${this.apiUrl}/category/${category}`);
  }

  getJobsByChannel(channel: string): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(`${this.apiUrl}/channel/${channel}`);
  }

  getOcrPreview(id: number): Observable<OcrPreviewDto> {
    return this.http.get<OcrPreviewDto>(`${this.apiUrl}/${id}/ocr-preview`);
  }

  sendEmail(id: number, request: SendEmailRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/send-email`, request);
  }
}
