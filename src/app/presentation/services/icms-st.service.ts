// src/app/presentation/services/icms-st.service.ts
import { Injectable } from '@angular/core';
import { CalculateIcmsStUsecase } from '../../core/domain/usecases/calculate-icms-st.usecase';
import { Product } from '../../core/domain/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class IcmsStService {
  constructor(private calculateIcmsStUsecase: CalculateIcmsStUsecase) {}

  calcularValorIcmsStARecolher(product: Product): number {
    return this.calculateIcmsStUsecase.executar(product);
  }
}
