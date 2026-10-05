import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface ApiResponse<T> {
  data: T
  meta: { timestamp: string }
}

export interface JDAnalyzeRequest {
  title: string
  company?: string
  description: string
}

export interface JDAnalyzeResult {
  jd_id: string
  title: string
}

export interface CurrentJD {
  id: string
  title: string
  company?: string
  description: string
}

@Injectable({ providedIn: 'root' })
export class JdService {
  private http = inject(HttpClient)
  private readonly apiBase = '/api/v1/jd'

  analyzeJd(request: JDAnalyzeRequest): Observable<JDAnalyzeResult> {
    return this.http
      .post<ApiResponse<JDAnalyzeResult>>(`${this.apiBase}/analyze`, request)
      .pipe(map(res => res.data))
  }

  getCurrentJd(): Observable<CurrentJD | null> {
    return this.http
      .get<ApiResponse<CurrentJD | null>>(`${this.apiBase}/current`)
      .pipe(map(res => res.data))
  }

  resetProfile(): Observable<{ message: string }> {
    return this.http
      .post<ApiResponse<{ message: string }>>(`${this.apiBase}/reset`, {})
      .pipe(map(res => res.data))
  }
}
