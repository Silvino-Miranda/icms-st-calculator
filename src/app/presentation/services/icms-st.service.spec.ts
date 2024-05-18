// icms-st.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { IcmsStService } from './icms-st.service';
import { CalculateIcmsStUsecase } from '../../core/domain/usecases/calculate-icms-st.usecase';
import { Product } from '../../core/domain/models/product.model';

describe('IcmsStService', () => {
  let service: IcmsStService;
  let mockCalculateIcmsStUsecase: jasmine.SpyObj<CalculateIcmsStUsecase>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CalculateIcmsStUsecase', ['executar']);

    TestBed.configureTestingModule({
      providers: [
        IcmsStService,
        { provide: CalculateIcmsStUsecase, useValue: spy }
      ]
    });

    service = TestBed.inject(IcmsStService);
    mockCalculateIcmsStUsecase = TestBed.inject(CalculateIcmsStUsecase) as jasmine.SpyObj<CalculateIcmsStUsecase>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate ICMS ST to collect correctly', () => {
    const product: Product = {
      id: 0,
      name: 'Product Test',
      valorOperacao: 100,
      aliquotaIpi: 10,
      frete: 5,
      seguro: 5,
      despesasAcessorias: 5,
      aliquotaOrigem: 12,
      mva: 50,
      aliquotaDestino: 18,
      desconto: 0
    };

    mockCalculateIcmsStUsecase.executar.and.returnValue(20.7);

    const result = service.calcularValorIcmsStARecolher(product);
    expect(result).toBeCloseTo(20.7, 2);

    expect(mockCalculateIcmsStUsecase.executar).toHaveBeenCalledWith(product);
  });
});
