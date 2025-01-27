import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API =  "http://localhost:3000/pensamentos";

  constructor(private http: HttpClient) {}

  listar(pagina: number, filtro: string, favoritos: boolean): Observable <Pensamento[]> {
    const itensPorPagina = 6;

    let parametros = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    if(filtro?.trim().length > 2){
      parametros = parametros.set("q", filtro)
    }

    if(favoritos){
      parametros = parametros.set("favorito", true);
    }

    return this.http.get<Pensamento[]>(this.API, {params: parametros})
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url)
  }
}
