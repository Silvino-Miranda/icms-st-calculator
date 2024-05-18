// src/app/core/data/repositories/icms.repository.impl.ts
import { Injectable } from '@angular/core';
import { IcmsRepository } from '../../domain/repositories/icms.repository';

@Injectable({
  providedIn: 'root'
})
export class IcmsRepositoryImpl implements IcmsRepository {
  obterAliquotaIcmsOrigem(): number {
    return 12; // Exemplo: 12%
  }

  obterMva(): number {
    return 50; // Exemplo: 50%
  }

  obterAliquotaIcmsDestino(): number {
    return 18; // Exemplo: 18%
  }

  haSubstituicaoTributaria(): boolean {
    return true; // Exemplo: true (há ST)
  }
}
