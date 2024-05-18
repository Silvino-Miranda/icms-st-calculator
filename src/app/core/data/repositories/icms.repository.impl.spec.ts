// // icms.repository.impl.spec.ts
// import { TestBed } from '@angular/core/testing';
// import { IcmsRepositoryImpl } from './icms.repository.impl';

// describe('IcmsRepositoryImpl', () => {
//   let service: IcmsRepositoryImpl;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [IcmsRepositoryImpl]
//     });

//     service = TestBed.inject(IcmsRepositoryImpl);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return correct ICMS origin rate', () => {
//     expect(service.obterAliquotaIcmsOrigem()).toEqual(0.12);
//   });

//   it('should return correct MVA', () => {
//     expect(service.obterMva()).toEqual(50);
//   });

//   it('should return correct ICMS destination rate', () => {
//     expect(service.obterAliquotaIcmsDestino()).toEqual(0.18);
//   });

//   it('should return correct substitution tax status', () => {
//     expect(service.haSubstituicaoTributaria()).toEqual(true);
//   });
// });
